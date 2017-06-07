import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { noop } from 'lodash';
import { colors, sizes, screenSize } from '../../theme';
import genId from '../../util/generateAlphaName';

import BaseModal from 'react-overlays/lib/Modal';
import Fade from '../../util/Fade';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';

import events from 'dom-helpers/events';
import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';

const modalSize = {
  small: '300px',
  medium: '600px',
  large: '900px'
};

const DialogWrapper = styled.div`
  bottom: 0;
  left: 0;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-Index: 1050;
`;

const ModalDialogMedium = styled.div`
  margin: 10px;
  position: relative;
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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

  componentWillUnmount() {
    this.handleExited();
  }

  handleEntering = () => {
    this.props.onEntering();

    events.on(window, 'resize', this.handleWindowResize);
    this.adjustForScrollbar();
  };

  handleExited = () => {
    this.props.onExited();

    events.off(window, 'resize', this.handleWindowResize);
  };

  handleWindowResize = () => {
    this.adjustForScrollbar();
  };

  handleDialogClick = evnt => {
    if (evnt.target !== evnt.currentTarget) {
      return;
    }

    this.props.onHide();
  };

  adjustForScrollbar() {
    if (!canUseDOM) {
      return;
    }

    const dialogNode = this.modal.getDialogElement();
    const dialogHeight = dialogNode.scrollHeight;

    const bodyIsOverflowing = isOverflowing(
      ReactDOM.findDOMNode(document.body)
    );
    const modalIsOverflowing =
      dialogHeight > document.documentElement.clientHeight;

    this.setState({
      style: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing
          ? getScrollbarSize()
          : undefined,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing
          ? getScrollbarSize()
          : undefined
      }
    });
  }

  render() {
    const { animation, backdrop, children, onHide, show, size } = this.props;
    const inClassName = show && 'in';
    const backdropStyle = {
      backgroundColor: colors.black,
      bottom: 0,
      left: 0,
      opacity: 0.5,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 1040
    };

    let ModalDialog;
    switch (this.props.size) {
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
      <BaseModal
        backdrop={backdrop}
        backdropStyle={backdropStyle}
        backdropTransitionTimeout={150}
        dialogTransitionTimeout={300}
        onEntering={this.handleEntering}
        onExited={this.handleExited}
        onHide={onHide}
        ref={modal => {
          this.modal = modal;
        }}
        show={show}
        transition={animation ? Fade : undefined}
      >
        <DialogWrapper
          aria-labelledby={this.state.ariaId}
          className={inClassName}
          onClick={backdrop === true ? this.handleDialogClick : null}
          role="dialog"
          style={{ ...this.state.style }}
          tabIndex="-1"
        >
          <ModalDialog size={size}>
            <ModalContent>
              {children}
            </ModalContent>
          </ModalDialog>
        </DialogWrapper>
      </BaseModal>
    );
  }
}

Modal.propTypes = {
  /** Open and close the Modal with a slide and fade animation. */
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
  /** Callback fired as the Modal begins to transition in */
  onEntering: PropTypes.func,
  /** Callback fired after the Modal finishes transitioning out */
  onExited: PropTypes.func,
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
  onEntering: noop,
  onExited: noop,
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
