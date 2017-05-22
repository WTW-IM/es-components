import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import { injectGlobal } from 'styled-components';

import Popover from './Popover';
import PopoverFadeTransition from './PopoverFadeTransition';
import FocusTrap from '../../util/FocusTrap';

/* eslint-disable no-unused-expressions */
injectGlobal`
  .popover-transition-out {
    opacity: 0;
    transition: opacity 200ms linear;
  }

  .popover-transition-in {
    opacity: 1;
  }
`;
/* eslint-enable no-unused-expressions */

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

function PopoverTrigger({
  popoverTitle,
  popoverContent,
  popoverTarget,
  shouldDisplayPopover = false,
  popoverPlacement = 'top',
  containsFormElement = false,
  onHideOverlay,
  children
}) {
  const focusTrapOptions = {
    onDeactivate: onHideOverlay
  };

  const arrowPlacement = getArrowPlacement(popoverPlacement);

  return (
    <span>
      {children}

      <Overlay
        show={shouldDisplayPopover}
        placement={popoverPlacement}
        target={popoverTarget}
        transition={PopoverFadeTransition}
        onHide={onHideOverlay}
        rootClose={!containsFormElement}
      >
        <Popover
          title={popoverTitle}
          arrowPlacement={arrowPlacement}
          containsFormElement={containsFormElement}
        >
          <FocusTrap
            active={containsFormElement}
            focusTrapOptions={focusTrapOptions}
          >
            {popoverContent}
          </FocusTrap>
        </Popover>
      </Overlay>
    </span>
  );
}

PopoverTrigger.propTypes = {
  popoverTitle: PropTypes.string,
  popoverContent: PropTypes.node.isRequired,
  popoverTarget: PropTypes.object,
  shouldDisplayPopover: PropTypes.bool,
  popoverPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  containsFormElement: PropTypes.bool,
  onHideOverlay: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default PopoverTrigger;
