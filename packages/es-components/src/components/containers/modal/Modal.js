import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { noop, debounce } from 'lodash';
import ReactModal from 'react-modal';
import tinycolor from 'tinycolor2';

import useUniqueId from '../../util/useUniqueId';
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
  return Math.max(thirdTopMargin, 0);
};

const ModalStyles = createGlobalStyle`
  body.modal-open {
    overflow: hidden;

    .background-overlay {
      bottom: 0;
      left: 0;
      position: fixed;
      right: 0;
      top: 0;
      background-color: ${props => {
        const color = tinycolor(props.theme.colors.black);
        color.setAlpha(0);
        return color.toRgbString();
      }};
      transition: background-color ${() => animationTimeMs}ms linear;
      z-index: 1030;

      &.ReactModal__Overlay--after-open {
        ${props => {
          if (!props.showBackdrop) return '';

          const color = tinycolor(props.theme.colors.black);
          color.setAlpha(0.5);
          return `background-color: ${color.toRgbString()};`;
        }}

        &.ReactModal__Overlay--before-close {
          background-color: ${props => {
            const color = tinycolor(props.theme.colors.black);
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
      outline: 0;
      opacity: 0;
      overflow: scroll;
      position: relative;
      transition:
        top ${() => animationTimeMs}ms ease-out,
        opacity ${() => animationTimeMs}ms linear;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      max-height: 100%;
      ${props =>
        props.showAnimation
          ? `
            top: -100%;
          `
          : ''};

      &.ReactModal__Content--after-open {
        ${props =>
          props.showAnimation
            ? `
              opacity: 1;
              top: 0;
            `
            : ''};

        &.ReactModal__Content--before-close {
          ${props =>
            props.showAnimation
              ? `
                opacity: 0;
                top: -100%
              `
              : ''};
        }
      }

      &.small {
        @media (min-width: ${props => props.theme.screenSize.phone}) {
          margin: ${({ theme }) =>
            getModalMargin(theme.windowHeight, theme.modalHeight)}px auto;
          width: ${modalSize.small};
        }
      }

      &.medium {
        @media (min-width: ${props => props.theme.screenSize.tablet}) {
          margin: ${({ theme }) =>
            getModalMargin(theme.windowHeight, theme.modalHeight)}px auto;
          width: ${modalSize.medium};
        }
      }

      &.large {
        @media (min-width: ${props => props.theme.screenSize.desktop}) {
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
  contentRef,
  ...other
}) {
  const ariaId = useUniqueId(other.id);
  const [rootNode, RootNodeLocator] = useRootNodeLocator(document.body);
  const [headerHeight, setHeaderHeight] = useState(60);
  const [modalHeight, setModalHeight] = useState(300);
  const [shouldShow, setShouldShow] = useState(show);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const modalHeightRef = useCallback(modalElement => {
    if (contentRef) {
      if (typeof contentRef === 'function') {
        contentRef(modalElement);
      } else {
        // eslint-disable-next-line no-param-reassign
        contentRef.current = modalElement;
      }
    }

    setModalHeight(modalElement?.offsetHeight || 0);
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

  const shouldCloseOnOverlayClick = backdrop !== 'static' && backdrop;

  return (
    <ThemeProvider
      theme={{ headerHeight, setHeaderHeight, modalHeight, windowHeight }}
    >
      <RootNodeLocator />
      {shouldShow ? (
        <ModalStyles showAnimation={animation} showBackdrop={backdrop} />
      ) : null}
      <ModalContext.Provider value={{ onHide, ariaId }}>
        <ReactModal
          bodyOpenClassName="modal-open"
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
          contentRef={modalHeightRef}
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
  contentRef: null
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
