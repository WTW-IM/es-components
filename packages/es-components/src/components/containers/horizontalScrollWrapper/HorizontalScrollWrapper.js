import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  transition: transform 0.3s ease-in-out;
  white-space: nowrap;
  z-index: 0;
`;

const ScrollIcon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  outline: 0;
  position: absolute;
  top: 0;
  z-index: 1;
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
  if (code === 'Enter' || code === 'Space') {
    onKeyDown();
  }
};

const ArrowLeft = ({ onClick }) => (
  <ScrollIcon
    role="button"
    tabIndex={0}
    style={{ left: '0', textAlign: 'left' }}
    onClick={onClick}
    onKeyDown={generateOnArrowKeyDownHandler(onClick)}
  >
    <ArrowContainer>
      <Icon name="chevron-left" />
    </ArrowContainer>
  </ScrollIcon>
);

ArrowLeft.propTypes = {
  onClick: PropTypes.func.isRequired
};

const ArrowRight = ({ onClick }) => (
  <ScrollIcon
    role="button"
    tabIndex={0}
    style={{ right: '0', textAlign: 'right' }}
    onClick={onClick}
    onKeyDown={generateOnArrowKeyDownHandler(onClick)}
  >
    <ArrowContainer>
      <Icon name="chevron-right" />
    </ArrowContainer>
  </ScrollIcon>
);

ArrowRight.propTypes = {
  onClick: PropTypes.func.isRequired
};

function HorizontalScrollWrapper({ windowWidth, children, slideAmount }) {
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

  return (
    <OuterWrapper ref={rootRef}>
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
        style={{
          transform: `translate3d(${xPosition}px, 0, 0)`
        }}
      >
        {children}
      </InnerWrapper>
      {hasOverflow && xPosition < 0 && <ArrowLeft onClick={handleLeftClick} />}
      {hasOverflow && -xPosition < menuWidth - rootWidth && (
        <ArrowRight onClick={handleRightClick} />
      )}
    </OuterWrapper>
  );
}

HorizontalScrollWrapper.propTypes = {
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
