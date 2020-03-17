import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
import { Modal as BaseModal } from 'react-overlays';

import useUniqueId from '../../util/useUniqueId';
import DropIn from '../../util/DropIn';
import Fade from '../../util/Fade';
import { ModalContext } from './ModalContext';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';
import RootCloseWrapper from '../../util/RootCloseWrapper';

const modalSize = {
  small: '300px',
  medium: '600px',
  large: '900px'
};

const modalStyle = {
  bottom: 0,
  left: 0,
  outline: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 1040
};

const Backdrop = styled.div`
  background-color: ${props => props.theme.colors.black};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1030;
`;

const ModalDialogMedium = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin: 20vh auto;
    width: ${modalSize.medium};
  }
`;

const ModalDialogSmall = styled(ModalDialogMedium)`
  @media (min-width: ${props => props.theme.screenSize.phone}) {
    margin: 20vh auto;
    width: ${modalSize.small};
  }
`;

const ModalDialogLarge = styled(ModalDialogMedium)`
  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    width: ${modalSize.large};
  }
`;

const ModalContent = styled.div`
  background-clip: padding-box;
  background-color: ${props => props.theme.colors.white};
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${props => props.theme.font.baseFontSize};
  outline: 0;
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

const BackdropFade = props => <Fade opacity={0.5} {...props} />;

const DialogDropIn = props => <DropIn {...props} />;

function getModalBySize(size) {
  switch (size) {
    case 'small':
      return ModalDialogSmall;
    case 'large':
      return ModalDialogLarge;
    default:
      return ModalDialogMedium;
  }
}

function Modal(props) {
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
    ...other
  } = props;

  const ModalDialog = getModalBySize(size);
  const ariaId = useUniqueId(other.id);

  return (
    <ModalContext.Provider value={{ onHide, ariaId }}>
      <BaseModal
        aria-labelledby={ariaId}
        backdrop={backdrop}
        renderBackdrop={backdropProps => <Backdrop {...backdropProps} />}
        backdropTransition={animation ? BackdropFade : undefined}
        keyboard={escapeExits}
        onEnter={onEnter}
        onExit={onExit}
        onHide={onHide}
        show={show}
        style={modalStyle}
        transition={animation ? DialogDropIn : undefined}
      >
        <ModalDialog size={size} {...other}>
          <RootCloseWrapper
            onRootClose={onHide}
            disabled={backdrop === 'static'}
          >
            <ModalContent>{children}</ModalContent>
          </RootCloseWrapper>
        </ModalDialog>
      </BaseModal>
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  /** Open and close the Modal with transitions. */
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
  size: PropTypes.oneOf(['small', 'medium', 'large'])
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

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
