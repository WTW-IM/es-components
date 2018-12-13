import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { noop } from 'lodash';
import BaseModal from 'react-overlays/lib/Modal';

import genId from '../../util/generateAlphaName';
import Fade from '../../util/Fade';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';

const modalSize = {
  small: '300px',
  medium: '600px',
  large: '900px'
};

const DialogWrapper = styled(BaseModal)`
  height: 100%;
  left: 0;
  position: fixed;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 1040;
`;

const ModalDialogMedium = styled.div`
  cursor: default;
  display: inline-block;
  top: 2em;
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin: 30px auto;
    width: ${modalSize.medium};
  }
`;

const ModalDialogSmall = styled(ModalDialogMedium)`
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.phone}) {
    margin: 30px auto;
    width: ${modalSize.small};
  }
`;

const ModalDialogLarge = styled(ModalDialogMedium)`
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    width: ${modalSize.large};
  }
`;

const ModalContent = styled.div`
  background-clip: padding-box;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  font-size: ${props => props.theme.sizes.baseFontSize};
  outline: 0;
  position: relative;
`;

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ariaId: genId()
    };
  }

  getChildContext() {
    return {
      modal: {
        onHide: this.props.onHide,
        ariaId: this.state.ariaId
      }
    };
  }

  render() {
    const {
      animation,
      backdrop,
      children,
      escapeExits,
      onEnter,
      onExit,
      onHide,
      show,
      size,
      theme
    } = this.props;

    const backdropStyle = {
      backgroundColor: theme.colors.black,
      bottom: 0,
      cursor: backdrop === 'static' ? 'auto' : 'pointer',
      left: 0,
      opacity: 0.5,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 'auto'
    };

    let ModalDialog;
    switch (size) {
      case 'small':
        ModalDialog = ModalDialogSmall;
        break;
      case 'large':
        ModalDialog = ModalDialogLarge;
        break;
      default:
        ModalDialog = ModalDialogMedium;
        break;
    }

    return (
      <DialogWrapper
        backdrop={backdrop}
        backdropStyle={backdropStyle}
        keyboard={escapeExits}
        onEnter={onEnter}
        onExit={onExit}
        onHide={onHide}
        show={show}
        transition={animation ? Fade : undefined}
        className="es-modal"
      >
        <ModalDialog
          size={size}
          aria-labelledby={this.state.ariaId}
          className="es-modal__dialog"
        >
          <ModalContent className="es-modal__content">{children}</ModalContent>
        </ModalDialog>
      </DialogWrapper>
    );
  }
}

Modal.propTypes = {
  /** Open and close the Modal with a fade animation. */
  animation: PropTypes.bool,
  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: PropTypes.oneOf(['static', true, false]),
  /**
   * Usually contains a Modal.Title, Modal.Body, and Modal.Footer
   * but can contain any content
   */
  children: PropTypes.any,
  /** Set whether the Escape key exits the modal */
  escapeExits: PropTypes.bool,
  /** Callback fired when the Modal transitions in */
  onEnter: PropTypes.func,
  /** Callback fired when the modal transitions out */
  onExit: PropTypes.func,
  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: PropTypes.func,
  /** When `true` The modal will show itself. */
  show: PropTypes.bool,
  /** Sets the size of the modal */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

Modal.defaultProps = {
  animation: true,
  backdrop: true,
  escapeExits: true,
  onEnter: noop,
  onExit: noop,
  onHide: noop,
  show: false,
  size: 'medium',
  children: undefined
};

Modal.childContextTypes = {
  modal: PropTypes.shape({
    onHide: PropTypes.func,
    ariaId: PropTypes.string
  })
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default withTheme(Modal);
