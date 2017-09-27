import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';

import Popover from './Popover';
import Fade from '../../util/Fade';

function getArrowPlacement(popoverPlacement) {
  switch (popoverPlacement) {
    case 'top':
    case 'bottom':
      return popoverPlacement;
    case 'right':
      return 'left';
    case 'left':
      return 'right';
    default:
      return popoverPlacement;
  }
}

const PopoverTrigger = props => {
  const {
    children,
    onHideOverlay,
    popoverContent,
    popoverPlacement,
    popoverTarget,
    popoverTitle,
    showPopover,
    suppressCloseButton
  } = props;

  const arrowPlacement = getArrowPlacement(popoverPlacement);

  return (
    <span>
      {children}
      <Overlay
        onHide={onHideOverlay}
        placement={popoverPlacement}
        rootClose
        show={showPopover}
        target={popoverTarget}
        transition={Fade}
      >
        <Popover
          arrowPlacement={arrowPlacement}
          dismissPopover={onHideOverlay}
          suppressCloseButton={suppressCloseButton}
          title={popoverTitle}
        >
          {popoverContent}
        </Popover>
      </Overlay>
    </span>
  );
};

PopoverTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  onHideOverlay: PropTypes.func,
  popoverContent: PropTypes.node.isRequired,
  popoverPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  popoverTarget: PropTypes.object,
  popoverTitle: PropTypes.string,
  showPopover: PropTypes.bool,
  suppressCloseButton: PropTypes.bool
};

PopoverTrigger.defaultProps = {
  popoverPlacement: 'top',
  showPopover: false,
  suppressCloseButton: false
};

export default PopoverTrigger;
