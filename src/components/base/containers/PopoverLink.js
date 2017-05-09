import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import { noop } from 'lodash';
import Button from '../../controls/buttons/Button';
import Popover from './Popover';
import FocusTrap from 'focus-trap-react';
import Fade from '../../util/Fade';
import { injectGlobal } from 'styled-components';

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

/*
  monkey-patching the FocusTrap component
  fixes a timing issue with the popover
*/
FocusTrap.prototype.componentDidMount = function componentDidMount() {
  const specifiedFocusTrapOptions = this.props.focusTrapOptions;
  const tailoredFocusTrapOptions = {
    returnFocusOnDeactivate: false
  };
  for (const optionName in specifiedFocusTrapOptions) {
    if (!specifiedFocusTrapOptions.hasOwnProperty(optionName)) continue;
    if (optionName === 'returnFocusOnDeactivate') continue;
    tailoredFocusTrapOptions[optionName] =
      specifiedFocusTrapOptions[optionName];
  }
  this.focusTrap = this.props._createFocusTrap(
    this.node,
    tailoredFocusTrapOptions
  );
  if (this.props.active) {
    setTimeout(() => {
      this.focusTrap.activate();
    }, 0);
  }
  if (this.props.paused) {
    this.focusTrap.pause();
  }
};

const FadeTransition = props => (
  <Fade
    transitionClassOut="popover-transition-out"
    transitionClassIn="popover-transition-in"
    {...props}
  />
);

class PopoverLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  togglePopover = () => {
    if (this.state.isOpen) {
      this.hidePopover();
    } else {
      this.setState({ isOpen: true });
    }
  };

  hidePopover = () => {
    /*
      The focus trap calls this twice for some reason, even if the onHide call
      is removed from the Overlay. Checking so onPopoverHidden isn't called twice.
    */
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.props.onPopoverHidden();
    }
  };

  render() {
    const {
      children,
      popoverTitle,
      popoverContent,
      popoverPlacement,
      containsFormElement
    } = this.props;

    const { isOpen } = this.state;
    const arrowPlacement = getArrowPlacement(popoverPlacement);
    const focusTrapOptions = {
      onDeactivate: this.hidePopover
    };

    return (
      <span>
        <span
          ref={span => {
            this.popoverTarget = span;
          }}
        >
          <Button
            data-trigger="focus"
            styleType="link"
            handleOnClick={this.togglePopover}
          >
            {children}
          </Button>
        </span>

        <Overlay
          show={isOpen}
          placement={popoverPlacement}
          target={this.popoverTarget}
          rootClose={!containsFormElement}
          onHide={this.hidePopover}
          transition={FadeTransition}
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
}

PopoverLink.propTypes = {
  /** The link content which activates the popover */
  children: PropTypes.node.isRequired,
  /** The text displayed in the popover title section */
  popoverTitle: PropTypes.string,
  /** The content displayed in the popover body */
  popoverContent: PropTypes.node.isRequired,
  /** The placement of the popover in relation to the link */
  popoverPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  containsFormElement: PropTypes.bool,
  /** Function to run when the popover is hidden */
  onPopoverHidden: PropTypes.func
};

PopoverLink.defaultProps = {
  popoverPlacement: 'top',
  containsFormElement: false,
  onPopoverHidden: noop
};

export default PopoverLink;
