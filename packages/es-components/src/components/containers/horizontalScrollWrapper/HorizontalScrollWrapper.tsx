import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatMessage from 'format-message';
import Icon from '../../base/icons/Icon';
import { IconName, iconNames } from 'es-components-shared-types';
import withWindowSize from '../../util/withWindowSize';

const OuterWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const InnerWrapper = styled.div`
  alignitems: center;
  display: flex;
  height: 100%;
  position: relative;
  white-space: nowrap;
  z-index: 0;
`;

const ArrowContainer = styled.div`
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

type IconProps = JSXElementProps<'div'> & {
  iconName: IconName;
};

const ScrollIcon = styled(({ onClick, iconName, ...props }: IconProps) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={generateOnArrowKeyDownHandler(onClick)}
    {...props}
  >
    <ArrowContainer>
      <Icon name={iconName} />
    </ArrowContainer>
  </div>
))`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  outline: 0;
  position: absolute;
  top: 0;
  z-index: 1;
`;

ScrollIcon.propTypes = {
  iconName: PropTypes.oneOf(iconNames).isRequired
};

const ArrowLeft = styled(props => (
  <ScrollIcon iconName="chevron-left" {...props} />
))`
  left: 0;
  text-align: left;
`;

const ArrowRight = styled(props => (
  <ScrollIcon iconName="chevron-right" {...props} />
))`
  right: 0;
  text-align: right;
`;

ArrowRight.propTypes = {
  onClick: PropTypes.func.isRequired
};
ArrowLeft.propTypes = ArrowRight.propTypes;

type HorizontalScrollWrapperProps = JSXElementProps<'div'> & {
  slideAmount: number;
};

type TouchOrMouseEvent =
  | React.MouseEvent<HTMLElement>
  | React.TouchEvent<HTMLElement>;

const isMouseEvent = (
  event: TouchOrMouseEvent
): event is React.MouseEvent<HTMLElement> =>
  event.type === 'mousedown' || event.type == 'mousemove';

const isTouchEvent = (
  event: TouchOrMouseEvent
): event is React.TouchEvent<HTMLElement> =>
  event.type === 'touchstart' || event.type == 'touchmove';

type MaybeHasProp<T, S extends keyof T> = Omit<T, S> & Partial<Pick<T, S>>;
type WithUnnamedProp<T, PName extends string, PType> = T & {
  [K in PName]: PType;
};

function HorizontalScrollWrapper({
  children,
  slideAmount,
  ...otherProps
}: HorizontalScrollWrapperProps) {
  const [rootWidth, setRootWidth] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [cursorXPosition, setCursorXPosition] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resetPosition = useCallback(() => {
    setXPosition(oldXPosition => {
      const absoluteXPosition = Math.abs(oldXPosition);
      const widthXPosition = rootWidth + absoluteXPosition;
      if (widthXPosition <= menuWidth) return oldXPosition;
      const distance = Math.abs(menuWidth - widthXPosition);
      return oldXPosition + distance;
    });
  }, [rootWidth, menuWidth]);

  useEffect(() => {
    setHasOverflow(rootWidth <= menuWidth);
  }, [rootWidth, menuWidth]);

  useEffect(() => {
    resetPosition();
  }, [resetPosition]);

  useEffect(() => {
    window.addEventListener('resize', resetPosition);

    return () => window.removeEventListener('resize', resetPosition);
  }, [resetPosition]);

  const handleDownEvent = (downEvent: TouchOrMouseEvent) => {
    if (!hasOverflow) return;

    let cursorX = 0;
    if (isMouseEvent(downEvent)) {
      cursorX = downEvent.pageX - xPosition;
    } else if (isTouchEvent(downEvent)) {
      const touchEvent = downEvent.changedTouches[0];
      cursorX = touchEvent.pageX - xPosition;
    }

    setCursorXPosition(cursorX);
    setIsDragging(true);
  };

  const handleMoveEvent = (moveEvent: TouchOrMouseEvent) => {
    if (!hasOverflow || !isDragging) return;

    let distance = 0;

    if (isMouseEvent(moveEvent)) {
      moveEvent.preventDefault();
      distance = moveEvent.pageX - cursorXPosition;
    } else if (isTouchEvent(moveEvent)) {
      const touchEvent = moveEvent.changedTouches[0];
      distance = touchEvent.pageX - cursorXPosition;
    }

    let newXPosition = (xPosition + distance) * 0.5;
    if (newXPosition > 0) {
      newXPosition = 0;
    }
    if (-newXPosition > menuWidth - rootWidth) {
      newXPosition = -(menuWidth - rootWidth);
    }

    setXPosition(newXPosition);
  };

  const handleUpEvent = () => {
    if (!hasOverflow || !isDragging) return;

    setIsDragging(false);
  };

  const handleLeftClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    let newXPosition = xPosition + slideAmount;
    if (newXPosition > 0) {
      newXPosition = 0;
    }

    setXPosition(newXPosition);
  };
  const handleRightClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    let newXPosition = xPosition - slideAmount;
    if (-newXPosition > menuWidth - rootWidth) {
      newXPosition = -(menuWidth - rootWidth);
    }

    setXPosition(newXPosition);
  };

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLElement>) => {
    const code = event.key.toLowerCase();
    if (code !== 'tab') return;

    const element = document.activeElement?.parentElement;
    if (!element) return;

    const style = (window as MaybeHasProp<Window, 'getComputedStyle'>)
      .getComputedStyle
      ? getComputedStyle(element, null)
      : (
          element as WithUnnamedProp<
            HTMLElement,
            'currentStyle',
            CSSStyleDeclaration
          >
        ).currentStyle;
    const marginLeft = parseInt(style.marginLeft, 10) || 0;
    const marginRight = parseInt(style.marginRight, 10) || 0;
    const tabSlide = element.offsetWidth + marginLeft + marginRight;

    if (event.shiftKey) {
      let newXPosition = xPosition + tabSlide;
      if (newXPosition > 0) {
        newXPosition = 0;
      }
      setXPosition(newXPosition);
    } else {
      let newXPosition = xPosition - tabSlide;
      if (-newXPosition > menuWidth - rootWidth) {
        newXPosition = -(menuWidth - rootWidth);
      }
      setXPosition(newXPosition);
    }
  };

  return (
    <OuterWrapper
      ref={root => setRootWidth(root?.clientWidth || 0)}
      {...otherProps}
    >
      <InnerWrapper
        ref={menu => setMenuWidth(menu?.scrollWidth || 0)}
        role="presentation"
        onMouseDown={handleDownEvent}
        onMouseMove={handleMoveEvent}
        onMouseUp={handleUpEvent}
        onMouseLeave={handleUpEvent}
        onTouchStart={handleDownEvent}
        onTouchMove={handleMoveEvent}
        onTouchEnd={handleUpEvent}
        onKeyUp={handleKeyEvent}
        style={{
          transform: `translate3d(${xPosition}px, 0, 0)`,
          transition: `${isDragging ? '' : 'transform 0.3s ease-in-out'}`
        }}
      >
        {children}
      </InnerWrapper>
      {hasOverflow && xPosition < 0 && (
        <ArrowLeft
          onClick={handleLeftClick}
          aria-label={formatMessage(`See previous`)}
        />
      )}
      {hasOverflow && -xPosition < menuWidth - rootWidth && (
        <ArrowRight
          onClick={handleRightClick}
          aria-label={formatMessage(`See next`)}
        />
      )}
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
