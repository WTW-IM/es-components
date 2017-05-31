import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import events from 'dom-helpers/events';
import ownerDocument from 'dom-helpers/ownerDocument';
import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';
import { noop } from 'lodash';
import { colors, sizes } from '../../theme';
import Fade from '../../util/Fade';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';

function getModalWidth(size) {
  switch (size) {
    case 'small':
      return 300;
    case 'large':
      return 900;
    default:
      return 600;
  }
}

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

const ModalDialog = styled.div`
  margin: 30px auto;
  position: relative;
  width: ${props => getModalWidth(props.size)}px;
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
      style: {}
    };
  }

  getChildContext() {
    return {
      modal: {
        onHide: this.props.onHide
      }
    };
  }

  componentWillUnmount() {
    this.handleExited();
  }

  handleEntering = () => {
    this.props.onEntering();

    events.on(window, 'resize', this.handleWindowResize);
    this.updateStyle();
  };

  handleExited = () => {
    this.props.onExited();

    events.off(window, 'resize', this.handleWindowResize);
  };

  handleWindowResize = () => {
    this.updateStyle();
  };

  handleDialogClick = evnt => {
    if (evnt.target !== evnt.currentTarget) {
      return;
    }

    this.props.onHide();
  };

  updateStyle() {
    if (!canUseDOM) {
      return;
    }

    const dialogNode = this.modal.getDialogElement();
    const dialogHeight = dialogNode.scrollHeight;

    const document = ownerDocument(dialogNode);
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
    onHide: PropTypes.func
  })
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
