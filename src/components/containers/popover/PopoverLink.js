import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled from 'styled-components';

import Button from '../../controls/buttons/Button';
import PopoverTrigger from './PopoverTrigger';

const PopoverButton = styled(Button)`
  border-bottom: ${props => (props.suppressUnderline ? 'none' : '1px dotted')};
  text-decoration: none;
`;

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
      suppressUnderline,
      containsFormElement
    } = this.props;

    const { isOpen } = this.state;

    return (
      <PopoverTrigger
        popoverTitle={popoverTitle}
        popoverContent={popoverContent}
        popoverTarget={this.popoverTarget}
        shouldDisplayPopover={isOpen}
        onHideOverlay={this.hidePopover}
        containsFormElement={containsFormElement}
        popoverPlacement={popoverPlacement}
      >
        <span
          ref={span => {
            this.popoverTarget = span;
          }}
        >
          <PopoverButton
            data-trigger="focus"
            styleType="link"
            handleOnClick={this.togglePopover}
            ref={span => {
              this.popoverTarget = span;
            }}
            suppressUnderline={suppressUnderline}
          >
            {children}
          </PopoverButton>
        </span>
      </PopoverTrigger>
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
  onPopoverHidden: PropTypes.func,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool
};

PopoverLink.defaultProps = {
  popoverPlacement: 'top',
  containsFormElement: false,
  onPopoverHidden: noop,
  suppressUnderline: false
};

export default PopoverLink;
