import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
import { colors, sizes, screenSize } from '../../theme';
import genId from '../../util/generateAlphaName';

import BaseModal from 'react-overlays/lib/Modal';
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
  cursor: pointer;
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

  @media (min-width: ${screenSize.tablet}) {
    margin: 30px auto;
    width: ${modalSize.medium};
  }
`;

const ModalDialogSmall = ModalDialogMedium.extend`
  @media (min-width: ${screenSize.phone}) {
    margin: 30px auto;
    width: ${modalSize.small};
  }
`;

const ModalDialogLarge = ModalDialogMedium.extend`
  @media (min-width: ${screenSize.desktop}) {
    width: ${modalSize.large};
  }
`;

const ModalContent = styled.div`
  background-clip: padding-box;
  background-color: ${colors.white};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${sizes.baseFontSize}px;
  outline: 0;
  position: relative;
`;

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      style: {},
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
      onEnter,
      onExit,
      onHide,
      show,
      size
    } = this.props;

    const backdropStyle = {
      backgroundColor: colors.black,
      bottom: 0,
      cursor: 'pointer',
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
        backdropTransitionTimeout={200}
        dialogTransitionTimeout={200}
        onEnter={onEnter}
        onExit={onExit}
        onHide={onHide}
        show={show}
        transition={animation ? Fade : undefined}
      >
        <ModalDialog size={size} aria-labelledby={this.state.ariaId}>
          <ModalContent className="ModalContent">{children}</ModalContent>
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
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Modal.defaultProps = {
  animation: true,
  backdrop: true,
  onEnter: noop,
  onExit: noop,
  onHide: noop,
  show: false,
  size: 'medium'
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

export default Modal;
