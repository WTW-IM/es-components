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

const FadeTransition = props => (
  <Fade duration={300} opacity={1} withWrapper {...props} />
);

const PopoverTrigger = props => {
  const {
    children,
    onHideOverlay,
    popoverContent,
    popoverPlacement,
    popoverTarget,
    popoverTitle,
    showPopover,
    showCloseButton
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
        transition={FadeTransition}
      >
        <Popover
          arrowPlacement={arrowPlacement}
          dismissPopover={onHideOverlay}
          showCloseButton={showCloseButton}
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
  showCloseButton: PropTypes.bool
};

PopoverTrigger.defaultProps = {
  popoverPlacement: 'top',
  showPopover: false,
  showCloseButton: false
};

export default PopoverTrigger;
