import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, sizes, screenSize } from '../../theme';
import classNames from 'classnames';
import DismissButton from '../../controls/DismissButton';

const ArrowBase = styled.div`
  border-color: transparent;
  border-style: solid;
  border-width: 11px;
  position: absolute;

  &:after {
    border-color: transparent;
    border-style: solid;
    border-width: 10px;
    content: ' ';
    position: absolute;
  }
`;

const TopPlacementArrow = styled(ArrowBase)`
  border-bottom-width: 0;
  border-top-color: rgba(0, 0, 0, 0.25);
  bottom: -11px;
  left: 50%;
  margin-left: -11px;

  &:after {
    border-bottom-width: 0;
    border-top-color: ${colors.white};
    bottom: 1px;
    margin-left: -10px;
  }
`;

const RightPlacementArrow = styled(ArrowBase)`
  border-left-color: rgba(0, 0, 0, 0.25);
  border-right-width: 0;
  margin-top: -11px;
  right: -11px;
  top: 50%;

  &:after {
    border-left-color: ${colors.white};
    border-right-width: 0;
    bottom: -10px;
    right: 1px;
  }
`;

// prettier-ignore
const BottomPlacementArrow = styled(ArrowBase)`
  border-bottom-color: rgba(0, 0, 0, 0.25);
  border-top-width: 0;
  left: 50%;
  margin-left: -11px;
  top: -11px;

  &:after {
    border-bottom-color: ${props =>
      (props.displayColor ? colors.accent : colors.white)};
    border-top-width: 0;
    margin-left: -10px;
    top: 1px;
  }
`;

const LeftPlacementArrow = styled(ArrowBase)`
  border-left-width: 0;
  border-right-color: rgba(0, 0, 0, 0.25);
  left: -11px;
  margin-top: -11px;
  top: 50%;

  &:after {
    border-left-width: 0;
    border-right-color: ${colors.white};
    bottom: -10px;
    left: 1px;
  }
`;

function getArrow(placement) {
  switch (placement) {
    case 'top':
      return TopPlacementArrow;
    case 'right':
      return RightPlacementArrow;
    case 'bottom':
      return BottomPlacementArrow;
    case 'left':
      return LeftPlacementArrow;
    default:
      return TopPlacementArrow;
  }
}

// Add or subtract 11px from the appropriate position to account for the arrow's sizing
const PopoverContent = styled.div`
  background-clip: padding-box;
  background-color: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${sizes.baseFontSize}px;
  line-height: 1.4;
  max-width: 25%;
  position: absolute;
  z-index: 10;

  @media (max-width: ${screenSize.phone}) {
    max-width: 100%;
  }

  &.top {
    left: ${props => props.positionLeft}px;
    top: ${props => props.positionTop - 11}px;
  }

  &.bottom {
    left: ${props => props.positionLeft}px;
    top: ${props => props.positionTop + 11}px;

    @media (max-width: ${screenSize.phone}) {
      left: 0;
    }
  }

  &.left {
    left: ${props => props.positionLeft + 11}px;
    top: ${props => props.positionTop}px;
  }

  &.right {
    left: ${props => props.positionLeft - 11}px;
    top: ${props => props.positionTop}px;
  }
`;

const PopoverTitle = styled.div`
  color: ${colors.white};
  padding: 8px 14px;
`;

const PopoverBodyContent = styled.div`padding: 9px 14px;`;

const DismissPopover = styled(DismissButton)`
  color: ${props => (props.hasTitle ? colors.white : colors.grayDark)};
  padding: ${props => (props.hasTitle ? '4px 14px' : '0px 14px')};
  margin-left: auto;
`;

const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${props => (props.hasTitle ? 'auto' : '7px')};
  background-color: ${props => (props.hasTitle ? colors.accent : 'none')};
`;

const Popover = props => {
  const {
    arrowPlacement,
    children,
    className,
    dismissPopover,
    positionLeft,
    positionTop,
    suppressCloseButton,
    title
  } = props;

  const Arrow = getArrow(arrowPlacement);
  const hasTitle = title !== undefined;
  const popoverClassNames = classNames(className, arrowPlacement);

  return (
    <PopoverContent
      className={popoverClassNames}
      role="tooltip"
      positionLeft={positionLeft}
      positionTop={positionTop}
      tabIndex={null}
    >
      {(hasTitle || !suppressCloseButton) && (
          <PopoverHeader hasTitle={hasTitle}>
            {hasTitle && <PopoverTitle>{title}</PopoverTitle>}
            {!suppressCloseButton && (
              <DismissPopover onClick={dismissPopover} />
            )}
          </PopoverHeader>
        )}
      <PopoverBodyContent>{children}</PopoverBodyContent>
      <Arrow displayColor={hasTitle} />
    </PopoverContent>
  );
};

Popover.propTypes = {
  arrowPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node,
  className: PropTypes.string,
  dismissPopover: PropTypes.func,
  positionLeft: PropTypes.number,
  positionTop: PropTypes.number,
  suppressCloseButton: PropTypes.bool,
  title: PropTypes.string
};

Popover.defaultProps = {
  arrowPlacement: 'top',
  suppressCloseButton: false
};

export default Popover;
