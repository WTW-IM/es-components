import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import formatMessage from 'format-message';
import Icon from '../../base/icons/Icon';
import { IconName } from 'es-components-shared-types';
import withWindowSize from '../../util/withWindowSize';

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  height: 100%;
  position: relative;
  white-space: nowrap;
  z-index: 0;
`;

const OuterWrapper = styled.div<{
  hasOverflow?: boolean;
  isDragging?: boolean;
}>`
  overflow: hidden;
  overflow-x: auto;
  position: relative;
  cursor: ${({ hasOverflow, isDragging }) => {
    let cursor = hasOverflow ? 'grab' : 'default';
    cursor = isDragging ? 'grabbing' : cursor;
    return cursor;
  }};

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
  width: 100%;
  height: 0;
  overflow: visible;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
`;

const ArrowContainer = styled.div`
  pointer-events: none;
  background-color: transparent;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const ArrowIconContainer = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;
  box-shadow: 0 1px 1px ${props => props.theme.colors.boxShadowDark};
  color: ${props => props.theme.colors.gray9};
  display: flex;
  padding: 0.5em;
`;

function generateOnArrowKeyDownHandler<
  T extends Maybe<(...args: any[]) => void> // eslint-disable-line @typescript-eslint/no-explicit-any
>(onKeyDown: T): React.KeyboardEventHandler<HTMLElement> {
  return (event: React.KeyboardEvent<HTMLElement>) => {
    const code = event.code.toLowerCase();
    if (code === 'enter' || code === 'space') {
      (
        onKeyDown ||
        (() => {
          // noop
        })
      )();
    }
  };
}

type ScrollIconProps = JSXElementProps<'div'> & {
  iconName: IconName;
  visible: boolean;
};

const ScrollIconBase = (styled.div as Partial<typeof styled.div>).withConfig
  ? styled.div.withConfig({
      shouldForwardProp: (prop, defaultValidatorFn) =>
        !['visible'].includes(prop) && defaultValidatorFn(prop)
    })``
  : styled.div``;

const ScrollIconInner = ({ onClick, iconName, ...props }: ScrollIconProps) => (
  <ScrollIconBase
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={generateOnArrowKeyDownHandler(onClick)}
    {...props}
  >
    <ArrowIconContainer>
      <Icon name={iconName} />
    </ArrowIconContainer>
  </ScrollIconBase>
);

const ScrollIcon = styled(ScrollIconInner)`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  outline: 0;
  z-index: 1;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  pointer-events: all;
`;

type HorizontalScrollWrapperProps = JSXElementProps<'div'> & {
  slideAmount: number;
};

function HorizontalScrollWrapper({
  children,
  slideAmount,
  ...otherProps
}: HorizontalScrollWrapperProps) {
  const [containerRef, setContainerRef] = useState<Maybe<HTMLElement>>(null);
  const [innerRef, setInnerRef] = useState<Maybe<HTMLElement>>(null);
  const [rootHeight, setRootHeight] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

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

  useEffect(() => {
    resetPosition();
  }, [resetPosition]);

  useEffect(() => {
    window.addEventListener('resize', resetPosition);

    return () => window.removeEventListener('resize', resetPosition);
  }, [resetPosition]);

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
      ref={setContainerRef}
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
              aria-label={formatMessage(`See previous`)}
              visible={scrollLeft > 0}
            />
            <ScrollIcon
              iconName="chevron-right"
              onClick={handleRightClick}
              aria-label={formatMessage(`See next`)}
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
}

HorizontalScrollWrapper.propTypes = {
  /** @ignore */
  children: PropTypes.node,
  /** Set the number of pixels the contents will move when clicking left/right arrows */
  slideAmount: PropTypes.number
};

HorizontalScrollWrapper.defaultProps = {
  children: null,
  slideAmount: 300
};

export default withWindowSize(HorizontalScrollWrapper);
