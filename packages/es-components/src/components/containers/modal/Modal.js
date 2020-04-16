import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { noop } from 'lodash';
import ReactModal from 'react-modal';
import tinycolor from 'tinycolor2';

import useUniqueId from '../../util/useUniqueId';
import { ModalContext } from './ModalContext';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';

const modalSize = {
  small: '300px',
  medium: '600px',
  large: '900px'
};

const ModalStyles = createGlobalStyle`
  .background-overlay {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1030;
    transition: background-color 150ms linear;
  }

  .background-overlay--after-open {
      background-color: ${props => {
        if (props.showBackdrop) {
          const color = tinycolor(props.theme.colors.black);
          color.setAlpha(0.5);
          return color.toRgbString();
        }
        return 'transparent';
      }} !important;
  }

  .modal-content {
    background-clip: padding-box;
    background-color: ${props => props.theme.colors.white};
    border-radius: 3px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
    font-size: ${props => props.theme.sizes.baseFontSize};
    outline: 0;
    position: relative;
    width: 100%;
    ${props =>
      props.showAnimation
        ? `
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 300ms ease-out, opacity 300ms linear;
    -webkit-overflow-scrolling: touch;
    `
        : ''};
  }

  .modal-content--after-open {
    ${props =>
      props.showAnimation
        ? `
      opacity: 1;
      transform: translateY(0);
    `
        : ''};
  }

  .modal-content--before-close {
    ${props =>
      props.showAnimation
        ? `
        opacity: 0;
      transform: translateY(-100%);
    `
        : ''};
  }

  .small {
    @media (min-width: ${props => props.theme.screenSize.phone}) {
      margin: 20vh auto;
      width: ${modalSize.small};
    }
  }

  .medium {
    @media (min-width: ${props => props.theme.screenSize.tablet}) {
      margin: 20vh auto;
      width: ${modalSize.medium};
    }
  }

  .large {
    @media (min-width: ${props => props.theme.screenSize.desktop}) {
      margin: 20vh auto;
      width: ${modalSize.large};
    }
  }
`;

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

  const ariaId = useUniqueId(other.id);

  const shouldCloseOnOverlayClick = backdrop !== 'static' && backdrop;

  return (
    <>
      <ModalStyles showAnimation={animation} showBackdrop={backdrop} />
      <ModalContext.Provider value={{ onHide, ariaId }}>
        <ReactModal
          className={{
            base: `modal-content  ${size}`,
            afterOpen: 'modal-content--after-open',
            beforeClose: 'modal-content--before-close'
          }}
          overlayClassName={{
            base: 'background-overlay',
            afterOpen: 'background-overlay--after-open',
            beforeClose: 'background-overlay--before-close'
          }}
          closeTimeoutMS={animation ? 150 : null}
          isOpen={show}
          aria={{
            labelledby: ariaId
          }}
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
          onRequestClose={onHide}
          onAfterOpen={onEnter}
          onAfterClose={onExit}
          shouldCloseOnEsc={escapeExits}
          {...other}
        >
          {children}
        </ReactModal>
      </ModalContext.Provider>
    </>
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
   * Usually contains a Modal.Header, Modal.Body, and Modal.Footer
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
