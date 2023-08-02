import React, { useCallback, useState, useEffect, useRef } from 'react';
import * as CSS from 'csstype';
import PropTypes from 'prop-types';
import {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider,
  ThemeProviderComponent
} from 'styled-components';
import ReactModal from 'react-modal';
import tinycolor from 'tinycolor2';

import useUniqueId from '../../util/useUniqueId';
import callRef from '../../util/callRef';
import { useDisableBodyScroll } from '../../util/useDisableBodyScroll';
import { useRootNodeLocator, RootNode } from '../../util/useRootNode';
import { ModalContext } from './ModalContext';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';
import useTopZIndex from '../../../hooks/useTopZIndex';
import { useWindowSize } from '../../util/withWindowSize';
import noop from '../../util/noop';

export type ModalTheme = DefaultTheme & {
  modalHeight: number;
  windowHeight: number;
  portalClassName: string;
};

type HTMLRef = React.ForwardedRef<HTMLElement> | undefined;
type BackdropValue = boolean | 'static';

const modalSize = {
  small: '300px',
  medium: '600px',
  large: '900px'
} as const;

export type ModalSize = keyof typeof modalSize;

export type ModalProps = Override<
  Omit<ReactModal.Props, 'isOpen'>,
  {
    show?: boolean;
    size?: ModalSize;
    parentSelector?: () => RootNode;
    className?: string;
    animation?: boolean;
    backdrop?: BackdropValue;
    children?: React.ReactNode;
    escapeExits?: boolean;
    onEnter?: () => void;
    onExit?: () => void;
    onHide?: () => void;
    overlayRef?: HTMLRef;
    contentRef?: HTMLRef;
  }
>;

const animationTimeMs = 300 as number;

const getModalMargin = (windowHeight: number, modalHeight: number) => {
  const fullMargin = windowHeight - modalHeight;
  const thirdTopMargin = fullMargin / 3;
  return Math.max(thirdTopMargin, 50);
};

const getAlphaColor = (color: CSS.Property.Color, alpha: number) => {
  const colorObj = tinycolor(color);
  colorObj.setAlpha(alpha);
  return colorObj.toRgbString();
};

const ModalStyles = createGlobalStyle<{
  showBackdrop: boolean;
  showAnimation?: boolean;
  theme: ModalTheme;
  topIndex: number;
}>`
${({
  theme: {
    portalClassName,
    colors,
    font,
    screenSize,
    windowHeight,
    modalHeight
  },
  showBackdrop,
  topIndex,
  showAnimation
}) => css`
  .${portalClassName} {
    .background-overlay {
      bottom: 0;
      background-color: ${getAlphaColor(colors.gray9, 0)};

      left: 0;
      max-height: 100%;
      overflow-y: auto;
      position: fixed;
      right: 0;
      top: 0;
      transition: background-color ${animationTimeMs / 2}ms linear;
      z-index: ${topIndex};
      -webkit-overflow-scrolling: touch;

      &.ReactModal__Overlay--after-open {
        background-color: ${() => {
          if (!showBackdrop) return '';

          return getAlphaColor(colors.gray9, 0.5);
        }};

        &.ReactModal__Overlay--before-close {
          background-color: ${getAlphaColor(colors.gray9, 0)};
        }
      }
    }

    .modal-content {
      background-clip: padding-box;
      background-color: ${colors.white};
      border-radius: 3px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma,
        sans-serif;
      font-size: ${font.baseFontSize};
      margin: 0.5rem;
      outline: 0;
      opacity: 0;
      position: absolute;
      left: 0;
      transform: translateY(0);
      transition: transform ${animationTimeMs}ms ease-out
          ${animationTimeMs / 4}ms,
        opacity ${animationTimeMs}ms ease-out ${animationTimeMs / 4}ms;
      ${showAnimation
        ? `
            transform: translateY(-50px);
          `
        : ''};

      &.ReactModal__Content--after-open {
        opacity: 1;
        ${showAnimation
          ? `
              transform: translateY(0);
            `
          : ''};

        &.ReactModal__Content--before-close {
          opacity: 0;
          ${showAnimation
            ? `
                transform: translateY(-50px);
              `
            : ''};
        }
      }

      &.small {
        @media (min-width: ${screenSize.phone}) {
          position: relative;
          margin: ${getModalMargin(windowHeight, modalHeight)}px auto;
          width: ${modalSize.small};
        }
      }

      &.medium {
        @media (min-width: ${screenSize.tablet}) {
          position: relative;
          margin: ${getModalMargin(windowHeight, modalHeight)}px auto;
          width: ${modalSize.medium};
        }
      }

      &.large {
        @media (min-width: ${screenSize.desktop}) {
          position: relative;
          margin: ${getModalMargin(windowHeight, modalHeight)}px auto;
          width: ${modalSize.large};
        }
      }
    }
  }
`}`;

const ModalThemeProvider = ThemeProvider as unknown as ThemeProviderComponent<
  ModalTheme,
  DefaultTheme
>;

function Modal({
  animation = true,
  backdrop = true,
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
}: ModalProps) {
  const ariaId = useUniqueId(other.id as string);
  const portalClassName = `ReactModalPortal-${useUniqueId()}`;
  const [rootNode, RootNodeLocator] = useRootNodeLocator(document.body);
  const [modalHeight, setModalHeight] = useState(300);
  const [shouldShow, setShouldShow] = useState(show);
  const modalRef = useRef<HTMLElement | null>(null);
  const innerContentRef = useRef<HTMLElement | null>(null);
  const getTopIndex = useTopZIndex();
  const setContentRef = useCallback(
    (contentElement: HTMLElement) => {
      callRef(contentRef, contentElement);
      innerContentRef.current = contentElement;
    },
    [contentRef]
  );
  const { windowHeight } = useWindowSize();

  const modalHeightRef = useCallback(
    (modalElement: HTMLElement) => {
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
    },
    [overlayRef]
  );

  const rootNodeSelector = useCallback(() => rootNode, [rootNode]);
  const modalParentSelector = parentSelector || rootNodeSelector;

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
    if (modalRef.current && modalRef.current.scroll) {
      modalRef.current.scroll(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef.current]);

  useDisableBodyScroll(show);

  const shouldCloseOnOverlayClick = backdrop === 'static' ? false : backdrop;

  return (
    <ModalThemeProvider
      theme={theme => ({
        ...theme,
        modalHeight,
        windowHeight,
        portalClassName
      })}
    >
      <RootNodeLocator />
      {shouldShow ? (
        <ModalStyles
          showAnimation={animation}
          showBackdrop={Boolean(backdrop)}
          topIndex={getTopIndex()}
        />
      ) : null}
      <ModalContext.Provider value={{ onHide: onHide || noop, ariaId }}>
        <ReactModal
          portalClassName={portalClassName}
          className={`${className || ''} ${size || 'medium'} modal-content`}
          overlayClassName="background-overlay"
          closeTimeoutMS={animation ? animationTimeMs : undefined}
          aria={{
            labelledby: ariaId
          }}
          shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
          onRequestClose={onHide}
          onAfterOpen={onEnter}
          onAfterClose={onExit}
          shouldCloseOnEsc={escapeExits}
          parentSelector={modalParentSelector as () => HTMLElement}
          contentRef={setContentRef}
          overlayRef={modalHeightRef}
          {...{ ...(other || {}), isOpen: Boolean(show) }}
        >
          {children}
        </ReactModal>
      </ModalContext.Provider>
    </ModalThemeProvider>
  );
}

const badProp = (
  props: Record<string, unknown>,
  propName: string,
  componentName: string
) => {
  if (props[propName]) {
    return new Error(
      `Invalid ReactModal prop '${propName}' supplied to '${componentName}'.`
    );
  }
};

export const propTypes = {
  ...ReactModal.propTypes,
  isOpen: badProp,
  overlayClassName: badProp,
  closeTimeoutMS: badProp,
  aria: badProp,
  onRequestClose: badProp,
  onAfterOpen: badProp,
  onAfterClose: badProp,
  shouldCloseOnEsc: badProp,
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

export const defaultProps = {
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

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
