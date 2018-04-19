/* eslint-disable no-confusing-arrow */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import { findDOMNode } from 'react-dom';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';

import Popup from './Popup';

const Container = styled.div`
  display: inline-block;
`;

const TriggerButton = styled(Button)`
  border-bottom: ${props => (props.suppressUnderline ? 'none' : '1px dotted')};
  padding-bottom: ${props => (props.isLinkButton ? '3px' : '')};
  text-decoration: none;

  color: blue;
`;

const TriggerButtonLabel = styled.span`
  font-size: 0;
  height: 1px;
  overflow: hidden;
  display: block;
`;

const PopoverContainer = styled.div`
  max-width: 275px;
  background: ${props => props.theme.colors.white};
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.white};
  background-color: ${props =>
    props.hasTitle ? props.theme.colors.popoverHeader : 'none'};
`;

const TitleBar = styled.h3`
  font-size: 18px;
  padding: 8px 14px;
  margin: 0;
`;

const PopoverBody = styled.div`
  padding: ${props =>
    props.hasAltCloseWithNoTitle ? '0 14px 8px' : '8px 14px'};
  text-align: right;
`;

const PopoverContent = styled.div`
  text-align: left;
  margin-bottom: ${props => (props.showCloseButton ? '8px' : '0')};
`;

const AlternateCloseButton = styled(Button)`
  color: ${props =>
    props.hasTitle ? props.theme.colors.white : props.theme.colors.grayDark};
  margin: 0;
  margin-left: auto;
  padding: 0 8px;
  background: transparent;
  border: none;
  box-shadow: none;

  &:hover {
    background: transparent;
  }
`;

class PopoverTest extends React.Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    this.header = findDOMNode(this.headerRef);
    this.content = findDOMNode(this.contentRef);
    this.closeBtn = findDOMNode(this.closeBtnRef);
    this.triggerBtn = findDOMNode(this.triggerBtnRef);
  }

  toggleShow = () => {
    const { isOpen } = this.state;

    setTimeout(() => {
      const focusableContent = this.content.querySelector('a, button');
      if (focusableContent) {
        focusableContent.focus();
      } else {
        this.header.focus();
      }
    }, 200);

    if (this.closeBtn) {
      this.triggerBtn.focus();
    }

    this.setState({ isOpen: !isOpen });
  };

  hidePopover = () => {
    if (this.state.isOpen) {
      setTimeout(() => {
        this.triggerBtn.focus();
      }, 150);
    }
    this.setState({ isOpen: false });
  };

  render() {
    const {
      name,
      title,
      content,
      placement,
      children,
      arrowSize,
      hasCloseButton,
      hasAltCloseButton,
      suppressUnderline,
      isLinkButton,
      ariaLabel,
      theme
    } = this.props;

    const hasTitle = title !== undefined;
    const hasAltCloseWithNoTitle = !hasTitle && hasAltCloseButton;
    const showCloseButton = hasCloseButton && !hasAltCloseButton;

    const triggerButton = (
      <TriggerButton
        isLinkButton={isLinkButton}
        handleOnClick={this.toggleShow}
        suppressUnderline={suppressUnderline}
        ref={btn => {
          this.triggerBtnRef = btn;
        }}
        aria-expanded={this.state.isOpen}
      >
        {children}
        <TriggerButtonLabel>{ariaLabel}</TriggerButtonLabel>
      </TriggerButton>
    );

    const closeButton = (
      <Button
        handleOnClick={this.toggleShow}
        ref={btn => {
          this.closeBtnRef = btn;
        }}
      >
        Close
      </Button>
    );

    const altCloseButton = (
      <AlternateCloseButton
        aria-label="Close"
        hasTitle={hasTitle}
        handleOnClick={this.toggleShow}
        ref={btn => {
          this.closeBtnRef = btn;
        }}
      >
        <Icon name="remove" />
      </AlternateCloseButton>
    );

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Popup
            name={name}
            trigger={triggerButton}
            placement={placement}
            transitionIn={this.state.isOpen}
            onHide={this.hidePopover}
            arrowSize={arrowSize}
            hasTitle={hasTitle}
            theme={theme}
          >
            <PopoverContainer
              role="dialog"
              ref={elem => {
                this.contentRef = elem;
              }}
              tabIndex={-1}
            >
              <PopoverHeader
                hasTitle={hasTitle}
                ref={elem => {
                  this.headerRef = elem;
                }}
                tabIndex={-1}
              >
                {hasTitle ? <TitleBar>{title}</TitleBar> : ''}
                {hasAltCloseButton ? altCloseButton : ''}
              </PopoverHeader>

              <PopoverBody hasAltCloseWithNoTitle={hasAltCloseWithNoTitle}>
                <PopoverContent showCloseButton={showCloseButton}>
                  {content}
                </PopoverContent>
                {showCloseButton ? closeButton : ''}
              </PopoverBody>
            </PopoverContainer>
          </Popup>
        </Container>
      </ThemeProvider>
    );
  }
}

PopoverTest.propTypes = {
  /** The name of the popover. Used for differentiating popovers */
  name: PropTypes.string,
  /** The link content which activates the popover */
  children: PropTypes.node.isRequired,
  /** The text displayed in the popover title section */
  title: PropTypes.string,
  /** The content displayed in the popover body */
  content: PropTypes.node,
  /** The placement of the popover in relation to the link */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Prevents popover from closing when clicked outside of it */
  keepOpen: PropTypes.bool,
  /** The size of the arrow on the popover box */
  arrowSize: PropTypes.oneOf(['sm', 'lg', 'none', 'default']),
  /** Prevents the popover from changing position when the window is resized/scrolled */
  disablePopoverFlipping: PropTypes.bool,
  /** Display a close button in the bottom right of the popover body */
  hasCloseButton: PropTypes.bool,
  /** Display a close ('x') button */
  hasAltCloseButton: PropTypes.bool,
  /** Function to toggle display of popover */
  onToggle: PropTypes.func,
  /** Displays or hides the popover */
  showPopover: PropTypes.bool,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool,
  /** The button style of the popover link */
  buttonStyle: PropTypes.string,
  /** Sets the link to use a text rather than a button style **/
  isLinkButton: PropTypes.bool,
  /** Sets the aria-label attribute to allow for textless buttons **/
  ariaLabel: PropTypes.string,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

PopoverTest.defaultProps = {
  popoverPlacement: 'bottom',
  hasCloseButton: true,
  isLinkButton: true,
  theme: viaTheme
};

export default PopoverTest;
