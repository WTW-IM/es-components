import React from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-overlays/lib/Overlay';
import { noop } from 'lodash';
import Button from '../../controls/buttons/Button';
import Popover from './Popover';
import FocusTrap from 'focus-trap-react';

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

class PopoverLink extends React.Component {
  static propTypes = {
    linkContent: PropTypes.node.isRequired,
    popoverTitle: PropTypes.string,
    /** The content displayed in the popover body */
    popoverContent: PropTypes.node.isRequired,
    /** The placement of the popover in relation to the link */
    popoverPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    containsFormElement: PropTypes.bool,
    /** Function to run when the popover is hidden */
    onPopoverHidden: PropTypes.func
  }

  static defaultProps = {
    popoverPlacement: 'top',
    containsFormElement: false,
    onPopoverHidden: noop
  }

  constructor(props) {
    super(props);

    this.state = { isOpen: false };

    this.hidePopover = this.hidePopover.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
  }

  togglePopover() {
    this.setState(previousState => ({ isOpen: !previousState.isOpen }));
  }

  hidePopover() {
    this.setState({ isOpen: false });
    this.props.onPopoverHidden();
  }

  render() {
    const {
      linkContent,
      popoverTitle,
      popoverContent,
      popoverPlacement,
      containsFormElement
    } = this.props;

    const { isOpen } = this.state;
    const arrowPlacement = getArrowPlacement(popoverPlacement);
    const shouldCloseOnAnyClick = !containsFormElement;
    const focusTrapOptions = {
      clickOutsideDeactivates: !containsFormElement,
      onDeactivate: () => this.hidePopover()
    };

    return (
      <span>
        <span ref={(span) => { this.popoverTarget = span; }}>
          <Button data-trigger="focus"
            styleType="link"
            handleOnClick={this.togglePopover}
          >
            {linkContent}
          </Button>
        </span>

        <Overlay
          show={isOpen}
          placement={popoverPlacement}
          target={this.popoverTarget}
          rootClose={shouldCloseOnAnyClick}
          onHide={this.hidePopover}
        >
          <Popover title={popoverTitle} arrowPlacement={arrowPlacement} containsFormElement={containsFormElement}>
            <FocusTrap active={containsFormElement} focusTrapOptions={focusTrapOptions}>
              {popoverContent}
            </FocusTrap>
          </Popover>
        </Overlay>
      </span>
    );
  }
}

export default PopoverLink;
