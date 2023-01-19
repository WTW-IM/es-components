import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { noop, debounce } from 'lodash';
import ReactModal from 'react-modal';
import tinycolor from 'tinycolor2';

import useUniqueId from '../../util/useUniqueId';
import callRef from '../../util/callRef';
import { useDisableBodyScroll } from '../../util/useDisableBodyScroll';
import { useRootNodeLocator } from '../../util/useRootNode';
import { ModalContext } from './ModalContext';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';

const modalSize = {
  small: '300px',
  medium: '600px',
  large: '900px'
};

const animationTimeMs = 300;

const getModalMargin = (windowHeight, modalHeight) => {
  const fullMargin = windowHeight - modalHeight;
  const thirdTopMargin = fullMargin / 3;
  return Math.max(thirdTopMargin, 50);
};

const ModalStyles = createGlobalStyle`
  .${({ theme }) => theme.portalClassName} {
    .background-overlay {
      bottom: 0;
      background-color: ${props => {
        const color = tinycolor(props.theme.colors.gray9);
        color.setAlpha(0);
        return color.toRgbString();
      }};

      left: 0;
      max-height: 100%;
      overflow-y: auto;
      position: fixed;
      right: 0;
      top: 0;
      transition: background-color ${() => animationTimeMs / 2}ms linear;
      z-index: 1030;
      -webkit-overflow-scrolling: touch;

      &.ReactModal__Overlay--after-open {
        ${props => {
          if (!props.showBackdrop) return '';

          const color = tinycolor(props.theme.colors.gray9);
          color.setAlpha(0.5);
          return `background-color: ${color.toRgbString()};`;
        }}

        &.ReactModal__Overlay--before-close {
          background-color: ${props => {
            const color = tinycolor(props.theme.colors.gray9);
            color.setAlpha(0);
            return color.toRgbString();
          }};
        }
      }
    }

    .modal-content {
      background-clip: padding-box;
      background-color: ${props => props.theme.colors.white};
      border-radius: 3px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
      font-size: ${props => props.theme.font.baseFontSize};
      margin: 0.5rem;
      outline: 0;
      opacity: 0;
      position: absolute;
      left: 0;
      transform: translateY(0);
      transition:
        transform ${() => animationTimeMs}ms ease-out ${() =>
  animationTimeMs / 4}ms,
        opacity ${() => animationTimeMs}ms ease-out ${() =>
  animationTimeMs / 4}ms;
      ${props =>
        props.showAnimation
          ? `
            transform: translateY(-50px);
          `
          : ''};

      &.ReactModal__Content--after-open {
        opacity: 1;
        ${props =>
          props.showAnimation
            ? `
              transform: translateY(0);
            `
            : ''};

        &.ReactModal__Content--before-close {
          opacity: 0;
          ${props =>
            props.showAnimation
              ? `
                transform: translateY(-50px);
              `
              : ''};
        }
      }

      &.small {
        @media (min-width: ${props => props.theme.screenSize.phone}) {
          position: relative;
          margin: ${({ theme }) =>
            getModalMargin(theme.windowHeight, theme.modalHeight)}px auto;
          width: ${modalSize.small};
        }
      }

      &.medium {
        @media (min-width: ${props => props.theme.screenSize.tablet}) {
          position: relative;
          margin: ${({ theme }) =>
            getModalMargin(theme.windowHeight, theme.modalHeight)}px auto;
          width: ${modalSize.medium};
        }
      }

      &.large {
        @media (min-width: ${props => props.theme.screenSize.desktop}) {
          position: relative;
          margin: ${({ theme }) =>
            getModalMargin(theme.windowHeight, theme.modalHeight)}px auto;
          width: ${modalSize.large};
        }
      }
    }
  }
`;

function Modal({
  animation,
  backdrop,
  children,
  escapeExits,
  onEnter,
  onExit,
  onHide,
  show,
  size,
  parentSelector,
  className,
  overlayRef,
  contentRef,
  ...other
}) {
  const ariaId = useUniqueId(other.id);
  const portalClassName = `ReactModalPortal-${useUniqueId()}`;
  const [rootNode, RootNodeLocator] = useRootNodeLocator(document.body);
  const [modalHeight, setModalHeight] = useState(300);
  const [shouldShow, setShouldShow] = useState(show);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const modalRef = useRef(null);
  const innerContentRef = useRef(null);

  const setContentRef = useCallback(contentElement => {
    callRef(contentRef, contentElement);
    innerContentRef.current = contentElement;
  });

  const modalHeightRef = useCallback(modalElement => {
    callRef(overlayRef, modalElement);
    let newHeight = 0;
    if (modalElement) {
      modalRef.current = modalElement;
      newHeight = modalElement.offsetHeight;
    }
    if (innerContentRef.current) {
      const contRefHeight = innerContentRef.current.offsetHeight;
      if (contRefHeight < newHeight) newHeight = contRefHeight;
    }
    setModalHeight(newHeight);
  });

  const modalParentSelector =
    parentSelector || useCallback(() => rootNode, [rootNode]);

  useEffect(() => {
    if (!animation || show) {
      setShouldShow(show);
      return noop;
    }

    let mounted = true;
    setTimeout(() => {
      if (!mounted) return;

      setShouldShow(false);
    }, animationTimeMs);

    return () => {
      mounted = false;
    };
  }, [show, animation]);

  useEffect(() => {
    const setHeight = debounce(() => setWindowHeight(window.innerHeight), 100);
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  useEffect(() => {
    if (modalRef.current && modalRef.current.scroll) {
      modalRef.current.scroll(0, 0);
    }
  }, [modalRef.current]);

  useDisableBodyScroll(show);

  const shouldCloseOnOverlayClick = backdrop !== 'static' && backdrop;

  return (
    <ThemeProvider theme={{ modalHeight, windowHeight, portalClassName }}>
      <RootNodeLocator />
      {shouldShow ? (
        <ModalStyles showAnimation={animation} showBackdrop={backdrop} />
      ) : null}
      <ModalContext.Provider value={{ onHide, ariaId }}>
        <ReactModal
          portalClassName={portalClassName}
          className={`${className} ${size} modal-content`}
          overlayClassName="background-overlay"
          closeTimeoutMS={animation ? animationTimeMs : null}
          isOpen={show}
          aria={{
            labelledby: ariaId
          }}
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
          onRequestClose={onHide}
          onAfterOpen={onEnter}
          onAfterClose={onExit}
          shouldCloseOnEsc={escapeExits}
          parentSelector={modalParentSelector}
          contentRef={setContentRef}
          overlayRef={modalHeightRef}
          {...other}
        >
          {children}
        </ReactModal>
      </ModalContext.Provider>
    </ThemeProvider>
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Selects the parent */
  parentSelector: PropTypes.func,
  className: PropTypes.string,
  overlayRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  contentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
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
  children: undefined,
  parentSelector: null,
  className: null,
  overlayRef: null,
  contentRef: null
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
