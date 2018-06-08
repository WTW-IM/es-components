/* eslint-disable no-confusing-arrow */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { findDOMNode } from 'react-dom';
import viaTheme from 'es-components-via-theme';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';
import Popup from './Popup';

const Container = styled.div`
  display: inline-block;
`;

const TriggerButton = styled(Button)`
  border-bottom: ${props =>
    props.isLinkButton ? props.buttonBorderStyle : ''};
  margin-bottom: ${props => (props.isLinkButton ? '2px' : '')};
  text-decoration: none;

  &:hover {
    border-bottom: ${props =>
      props.isLinkButton && !props.suppressUnderline ? '1px solid' : ''};
  }
`;

const TriggerButtonLabel = styled.span`
  font-size: 0;
  height: 1px;
  overflow: hidden;
  display: block;
`;

const PopoverContainer = styled.div`
  min-width: 270px;
  max-width: 400px;
  background: ${props => props.theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.white};
  background-color: ${props =>
    props.hasTitle ? props.theme.colors.popoverHeader : 'none'};
  outline: none;
  line-height: ${props => props.theme.sizes.baseLineHeight};
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
  color: ${props => props.theme.colors.gray8};
  line-height: ${props => props.theme.sizes.baseLineHeight};
  font-size: 18px;
  font-weight: normal;
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

const CloseHelpText = styled.span`
  height: 1px;
  width: 1px;
  color: transparent;
`;

class Popover extends React.Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    this.header = findDOMNode(this.headerRef);
    this.popoverContent = findDOMNode(this.contentRef);
    this.closeBtn = findDOMNode(this.closeBtnRef);
    this.triggerBtn = findDOMNode(this.triggerBtnRef);
    this.popper = findDOMNode(this.popperRef);
  }
  componentDidUpdate() {
    if (this.state.isOpen) {
      window.addEventListener('scroll', this.hidePopOnScroll);
    } else {
      window.removeEventListener('scroll', this.hidePopOnScroll);
    }
  }

  toggleShow = () => {
    setTimeout(() => {
      const focusableContent = this.popoverContent.querySelector('a, button');
      if (focusableContent) {
        focusableContent.focus();
      } else {
        this.header.focus();
      }
    }, 200);

    if (this.closeBtn) {
      this.triggerBtn.focus();
    }

    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  hidePopover = event => {
    if (this.state.isOpen) {
      if (event.type !== 'click') {
        this.triggerBtn.focus();
      }
      this.setState({ isOpen: false });
    }
  };

  hidePopOnScroll = () => {
    setInterval(() => {
      const bounds = this.popper.getBoundingClientRect();
      const inViewport =
        bounds.top >= 90 &&
        bounds.left >= 0 &&
        bounds.right <=
          (window.innerWidth || document.documentElement.clientWidth) &&
        bounds.bottom <=
          (window.innerHeight || document.documentElement.clientHeight);

      if (!inViewport && this.state.isOpen) {
        this.triggerBtn.focus();
        this.setState({ isOpen: false });
      }
    }, 100);
  };

  render() {
    const {
      name,
      title,
      content,
      children,
      placement,
      arrowSize,
      ariaLabel,
      buttonStyle,
      isOutline,
      isLinkButton,
      suppressUnderline,
      hasCloseButton,
      hasAltCloseButton,
      disableRootClose,
      disableFlipping,
      theme
    } = this.props;

    const hasTitle = title !== undefined;
    const hasAltCloseWithNoTitle = !hasTitle && hasAltCloseButton;
    const showCloseButton = hasCloseButton && !hasAltCloseButton;
    const buttonBorderStyle = suppressUnderline ? 'none' : '1px dashed';

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

    const triggerButton = (
      <TriggerButton
        handleOnClick={this.toggleShow}
        styleType={buttonStyle}
        isOutline={isOutline}
        isLinkButton={isLinkButton}
        suppressUnderline={suppressUnderline}
        buttonBorderStyle={buttonBorderStyle}
        ref={btn => {
          this.triggerBtnRef = btn;
        }}
        aria-expanded={this.state.isOpen}
      >
        <span aria-hidden={!!ariaLabel}>{children}</span>
        <TriggerButtonLabel>{ariaLabel}</TriggerButtonLabel>
      </TriggerButton>
    );

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Popup
            name={name}
            trigger={triggerButton}
            placement={placement}
            arrowSize={arrowSize}
            onHide={this.hidePopover}
            transitionIn={this.state.isOpen}
            hasTitle={hasTitle}
            disableRootClose={disableRootClose}
            disableFlipping={disableFlipping}
            theme={theme}
            popperRef={elem => {
              this.popperRef = elem;
            }}
          >
            <PopoverContainer
              role="dialog"
              ref={elem => {
                this.contentRef = elem;
              }}
            >
              <PopoverHeader hasTitle={hasTitle}>
                {hasTitle && <TitleBar>{title}</TitleBar>}
                {hasAltCloseButton && altCloseButton}
                <CloseHelpText
                  tabIndex={-1}
                  ref={elem => {
                    this.headerRef = elem;
                  }}
                  aria-label="Press escape to close the Popover"
                />
              </PopoverHeader>

              <PopoverBody hasAltCloseWithNoTitle={hasAltCloseWithNoTitle}>
                <PopoverContent showCloseButton={showCloseButton}>
                  {content}
                </PopoverContent>
                {showCloseButton && closeButton}
              </PopoverBody>
            </PopoverContainer>
          </Popup>
        </Container>
      </ThemeProvider>
    );
  }
}

Popover.propTypes = {
  /** The name of the popover. Used for differentiating popovers */
  name: PropTypes.string.isRequired,
  /** The content or element which activates the popover */
  children: PropTypes.node.isRequired,
  /** The text displayed in the popover title section */
  title: PropTypes.string.isRequired,
  /** The content displayed in the popover body */
  content: PropTypes.node.isRequired,
  /** The placement of the popover in relation to the link */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** The size of the arrow on the popover box */
  arrowSize: PropTypes.oneOf(['sm', 'lg', 'none', 'default']),
  /** Prevents popover from closing when clicked outside of it */
  disableRootClose: PropTypes.bool,
  /** Display a close button in the bottom right of the popover body */
  hasCloseButton: PropTypes.bool,
  /** Display a close ('x') button in the popover title bar */
  hasAltCloseButton: PropTypes.bool,
  /** Hide underline from link. Useful for children like Icons */
  suppressUnderline: PropTypes.bool,
  /** The button style of the popover link */
  buttonStyle: PropTypes.string,
  /** Sets the link to use a text rather than a button style **/
  isLinkButton: PropTypes.bool,
  /** Sets the link to use the alternate button style **/
  isOutline: PropTypes.bool,
  /** Sets the aria-label attribute to allow for textless buttons */
  ariaLabel: PropTypes.string,
  /** Disables popovers ability to change position to stay in viewport */
  disableFlipping: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider
   */
  theme: PropTypes.object
};

Popover.defaultProps = {
  placement: 'bottom',
  buttonStyle: 'primary',
  theme: viaTheme
};

export default Popover;
