import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '../../base/icons/Icon';
import { IconName } from 'es-components-shared-types';
import withWindowSize, { WindowSizeProps } from '../../util/withWindowSize';
import { callRefs } from '../../util/callRef';

const InnerWrapper = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  white-space: nowrap;
`;

const OuterWrapper = styled.div<{
  hasOverflow?: boolean;
  isDragging?: boolean;
}>`
  position: relative;
  overflow: hidden;
  cursor: ${({ hasOverflow, isDragging }) => {
    let cursor = hasOverflow ? 'grab' : 'default';
    cursor = isDragging ? 'grabbing' : cursor;
    return cursor;
  }};
  overflow-x: auto;

  ${InnerWrapper} {
    ${({ hasOverflow }) =>
      hasOverflow
        ? css`
            justify-content: flex-start;
          `
        : css`
            justify-content: space-around;
          `}
  }
`;

const ArrowOuterContainer = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  left: 0;
  overflow: visible;
  width: 100%;
  height: 0;
`;

const ArrowContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
  justify-content: space-between;
  background-color: transparent;
  pointer-events: none;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 1px 1px ${props => props.theme.colors.boxShadowDark};
  color: ${props => props.theme.colors.gray9};
  transition:
    border-color linear 0.15s,
    box-shadow linear 0.15s;
`;

export const ScrollIconBaseComponent = styled.button.attrs({ type: 'button' })`
  display: block;
  padding-right: 0.5em;
  padding-left: 0.5em;
  border: 0;
  appearance: none;
  background-color: transparent;
  font-size: ${({
    theme: {
      font: { baseFontSize }
    }
  }) => baseFontSize};

  &:focus,
  &:focus-within {
    outline: none;
    ${ArrowIconContainer} {
      box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
    }
  }
`;

const IconBase = styled(ScrollIconBaseComponent);

const ScrollIconBase = (IconBase as Partial<typeof styled.button>).withConfig
  ? IconBase.withConfig({
      shouldForwardProp: prop => !['visible'].includes(prop)
    })``
  : IconBase``;

type ScrollIconProps = Omit<JSXElementProps<'button'>, 'type'> & {
  iconName: IconName;
  visible: boolean;
};

const ScrollIconInner = ({ onClick, iconName, ...props }: ScrollIconProps) => (
  <ScrollIconBase onClick={onClick} {...props}>
    <ArrowIconContainer>
      <Icon name={iconName} />
    </ArrowIconContainer>
  </ScrollIconBase>
);

const ScrollIcon = styled(ScrollIconInner)`
  z-index: 1;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  outline: 0;
  pointer-events: all;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

type HorizontalScrollWrapperProps = JSXElementProps<'div'> &
  WindowSizeProps & {
    slideAmount?: number;
  };

const HorizontalScrollWrapper = React.forwardRef<
  HTMLDivElement,
  HorizontalScrollWrapperProps
>(function HorizontalScrollWrapper(
  { children, slideAmount = 300, windowWidth, windowHeight, ...otherProps },
  ref
) {
  const [containerRef, setContainerRef] = useState<Maybe<HTMLElement>>(null);
  const [innerRef, setInnerRef] = useState<Maybe<HTMLElement>>(null);
  const [rootHeight, setRootHeight] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollWidthObserver = useRef<Maybe<ResizeObserver>>(null);
  const mutationObserver = useRef<Maybe<MutationObserver> | null>(null);

  const onScroll = useCallback((ev: React.UIEvent<HTMLElement>) => {
    const el = ev.target as HTMLElement;
    setScrollLeft(el.scrollLeft);
  }, []);

  const resetPosition = useCallback(() => {
    if (!containerRef || !innerRef) return;

    const containerWidth = containerRef.clientWidth;
    const innerWidth = innerRef.scrollWidth;
    setRootHeight(containerRef.clientHeight);
    setHasOverflow(innerWidth > containerWidth);
    setMaxScroll(innerWidth - containerWidth);
  }, [containerRef, innerRef]);

  const callContainerRefs = useCallback<React.RefCallback<HTMLDivElement>>(
    el => {
      callRefs(el, setContainerRef, ref);
    },
    [ref]
  );

  useEffect(() => {
    resetPosition();
  }, [resetPosition, windowWidth, windowHeight]);

  useEffect(() => {
    if (!innerRef && !containerRef) return;

    scrollWidthObserver.current =
      scrollWidthObserver.current || new ResizeObserver(resetPosition);
    mutationObserver.current =
      mutationObserver.current || new MutationObserver(resetPosition);
    const activeElements = [innerRef, containerRef].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    activeElements.forEach(el => {
      scrollWidthObserver.current?.observe(el, { box: 'border-box' });
      mutationObserver.current?.observe(el, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    });

    return () => {
      activeElements.forEach(el => {
        scrollWidthObserver.current?.unobserve(el);
        mutationObserver.current?.disconnect();
      });
    };
  }, [innerRef, containerRef, resetPosition]);

  const scrollContainer = useCallback(
    (amount: number, extraOpts: ScrollToOptions = {}) => {
      if (!containerRef) return;

      let newLeft = scrollLeft + amount;
      newLeft = Math.max(0, newLeft);
      newLeft = Math.min(newLeft, maxScroll);

      containerRef.scrollTo({
        left: newLeft,
        behavior: 'smooth',
        ...extraOpts
      });
    },
    [containerRef, scrollLeft, maxScroll]
  );

  const handleClick = useCallback(
    (direction: 'left' | 'right') => {
      return (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        const moveAmount = direction === 'left' ? -slideAmount : slideAmount;
        scrollContainer(moveAmount);
      };
    },
    [slideAmount, scrollContainer]
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleLeftClick = useCallback(handleClick('left'), [handleClick]);
  const handleRightClick = useCallback(handleClick('right'), [handleClick]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleDownEvent = useCallback(() => {
    if (!hasOverflow) return;

    setIsDragging(true);
  }, [hasOverflow]);

  useEffect(function stopDragging() {
    const handleUpEvent = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUpEvent);

    return () => window.removeEventListener('mouseup', handleUpEvent);
  }, []);

  useEffect(
    function startDragging() {
      if (!isDragging) return;

      const handleMoveEvent = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();

        scrollContainer(-moveEvent.movementX, { behavior: 'auto' });
      };

      window.addEventListener('mousemove', handleMoveEvent);

      return () => window.removeEventListener('mousemove', handleMoveEvent);
    },
    [isDragging, scrollContainer]
  );

  return (
    <OuterWrapper
      ref={callContainerRefs}
      onScroll={onScroll}
      hasOverflow={hasOverflow}
      isDragging={isDragging}
      {...otherProps}
    >
      {!hasOverflow ? (
        <></>
      ) : (
        <ArrowOuterContainer>
          <ArrowContainer
            style={{
              height: rootHeight
            }}
          >
            <ScrollIcon
              iconName="chevron-left"
              onClick={handleLeftClick}
              aria-label={`See previous`}
              visible={scrollLeft > 0}
            />
            <ScrollIcon
              iconName="chevron-right"
              onClick={handleRightClick}
              aria-label={`See next`}
              visible={scrollLeft < maxScroll}
            />
          </ArrowContainer>
        </ArrowOuterContainer>
      )}
      <InnerWrapper
        ref={setInnerRef}
        role="presentation"
        onMouseDown={handleDownEvent}
      >
        {children}
      </InnerWrapper>
    </OuterWrapper>
  );
});

HorizontalScrollWrapper.propTypes = {
  /** Set the number of pixels the contents will move when clicking left/right arrows */
  slideAmount: PropTypes.number
};

HorizontalScrollWrapper.defaultProps = {
  slideAmount: 300
};

export default withWindowSize<HorizontalScrollWrapperProps, HTMLDivElement>(
  HorizontalScrollWrapper
);
