import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatMessage from 'format-message';
import Icon from '../../base/icons/Icon';
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

const generateOnArrowKeyDownHandler = onKeyDown => event => {
  const code = event.code.toLowerCase();
  if (code === 'enter' || code === 'space') {
    onKeyDown();
  }
};

const ScrollIcon = styled(({ onClick, iconName, ...props }) => (
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
  iconName: PropTypes.string.isRequired
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

function HorizontalScrollWrapper({
  windowWidth,
  children,
  slideAmount,
  ...otherProps
}) {
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const [rootWidth, setRootWidth] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [cursorXPosition, setCursorXPosition] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const currentRootWidth = rootRef.current ? rootRef.current.clientWidth : 0;
    const currentMenuWidth = menuRef.current ? menuRef.current.scrollWidth : 0;

    if (currentRootWidth <= currentMenuWidth) {
      setRootWidth(currentRootWidth);
      setMenuWidth(currentMenuWidth);
      setHasOverflow(true);

      const absoluteXPosition = Math.abs(xPosition);
      if (currentRootWidth + absoluteXPosition > currentMenuWidth) {
        const distance = Math.abs(
          currentMenuWidth - currentRootWidth + xPosition
        );
        setXPosition(xPosition + distance);
      }
    } else if (hasOverflow) {
      setHasOverflow(false);
    }
  }, [windowWidth, rootRef.current, menuRef.current]);

  const handleDownEvent = downEvent => {
    if (!hasOverflow) return;

    let cursorX = 0;
    if (downEvent.type === 'mousedown') {
      cursorX = downEvent.pageX - xPosition;
    } else if (downEvent.type === 'touchstart') {
      const touchEvent = downEvent.changedTouches[0];
      cursorX = touchEvent.pageX - xPosition;
    }

    setCursorXPosition(cursorX);
    setIsDragging(true);
  };

  const handleMoveEvent = moveEvent => {
    if (!hasOverflow || !isDragging) return;

    let distance = 0;

    if (moveEvent.type === 'mousemove') {
      moveEvent.preventDefault();
      distance = moveEvent.pageX - cursorXPosition;
    } else if (moveEvent.type === 'touchmove') {
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

  const handleLeftClick = event => {
    event.stopPropagation();
    event.preventDefault();

    let newXPosition = xPosition + slideAmount;
    if (newXPosition > 0) {
      newXPosition = 0;
    }

    setXPosition(newXPosition);
  };
  const handleRightClick = event => {
    event.stopPropagation();
    event.preventDefault();

    let newXPosition = xPosition - slideAmount;
    if (-newXPosition > menuWidth - rootWidth) {
      newXPosition = -(menuWidth - rootWidth);
    }

    setXPosition(newXPosition);
  };

  const handleKeyEvent = event => {
    const code = event.key.toLowerCase();
    if (code !== 'tab') return;

    const element = document.activeElement.parentElement;
    const style = window.getComputedStyle
      ? getComputedStyle(element, null)
      : element.currentStyle;
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
    <OuterWrapper ref={rootRef} {...otherProps}>
      <InnerWrapper
        ref={menuRef}
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
  windowWidth: PropTypes.number,
  children: PropTypes.node,
  /** Set the number of pixels the contents will move when clicking left/right arrows */
  slideAmount: PropTypes.number
};

HorizontalScrollWrapper.defaultProps = {
  windowWidth: undefined,
  children: null,
  slideAmount: 300
};

export default withWindowSize(HorizontalScrollWrapper);
