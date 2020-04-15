import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DismissButton from '../../controls/DismissButton';
import Button from '../../controls/buttons/Button';
import Popup from './Popup';
import RootCloseWrapper from '../../util/RootCloseWrapper';

const Container = styled.div`
  display: inline-block;
`;

const PopoverHeader = styled.div`
  background-color: ${props =>
    props.hasTitle ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  line-height: ${props => props.theme.font.baseLineHeight};
  outline: none;
`;

const TitleBar = styled.h3`
  flex: 1 1;
  font-size: 18px;
  margin: 0;
  padding: 8px 14px;
  text-align: left;
`;

const PopoverBody = styled.div`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.gray9};
  font-size: 18px;
  font-weight: normal;
  line-height: ${props => props.theme.font.baseLineHeight};
  padding: ${props =>
    props.hasAltCloseWithNoTitle ? '0 14px 8px' : '8px 14px'};
  text-align: right;
`;

const PopoverContent = styled.div`
  margin-bottom: ${props => (props.showCloseButton ? '8px' : '0')};
  text-align: left;
`;

const PopoverCloseButton = styled(Button)`
  display: inline-block;
  margin: 5px 0;
  width: auto;
`;

const AltCloseButton = styled(DismissButton)`
  color: ${props =>
    props.hasTitle ? props.theme.colors.white : props.theme.colors.black};

  flex: 0 1;
  margin-left: auto;
  padding: 8px;
`;

const CloseHelpText = styled.span`
  color: transparent;
  flex: none;
  height: 1px;
  outline: 0;
  width: 1px;
`;

function Popover(props) {
  const {
    name,
    title,
    content,
    placement,
    arrowSize,
    renderTrigger,
    hasCloseButton,
    hasAltCloseButton,
    disableRootClose,
    disableFlipping
  } = props;

  const hasTitle = title !== undefined;
  const hasAltCloseWithNoTitle = !hasTitle && hasAltCloseButton;
  const showCloseButton = hasCloseButton && !hasAltCloseButton;
  const isFirstRun = useRef(true);

  const triggerBtnRef = useRef(null);
  const popperRef = useRef(null);
  const contentRef = useRef(null);
  const escMsgRef = useRef(null);
  const closeBtnRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  function toggleShow(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(!isOpen);
  }

  function hidePopover(event) {
    if (isOpen) {
      if (event.type !== 'click') {
        triggerBtnRef.current.focus();
      }
      setIsOpen(false);
    }
  }

  function hidePopOnScroll() {
    setInterval(() => {
      if (popperRef.current) {
        const bounds = popperRef.current.getBoundingClientRect();
        const inViewport =
          bounds.top >= 0 && bounds.bottom <= window.innerHeight;

        if (!inViewport && isOpen) {
          setIsOpen(false);
        }
      }
    }, 100);
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        } else if (escMsgRef.current) {
          escMsgRef.current.focus();
        }
      }, 100);
    } else {
      triggerBtnRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('scroll', hidePopOnScroll);
    }
    return () => window.removeEventListener('scroll', hidePopOnScroll);
  }, [isOpen]);

  const closeButton = (
    <PopoverCloseButton onClick={toggleShow} ref={closeBtnRef}>
      Close
    </PopoverCloseButton>
  );

  const altCloseButton = (
    <AltCloseButton
      aria-label="Close"
      hasTitle={hasTitle}
      onClick={toggleShow}
      ref={closeBtnRef}
    />
  );

  return (
    <Container>
      <Popup
        name={name}
        trigger={renderTrigger({ ref: triggerBtnRef, toggleShow, isOpen })}
        position={placement}
        arrowSize={arrowSize}
        transitionIn={isOpen}
        hasTitle={hasTitle}
        disableFlipping={disableFlipping}
        popperRef={elem => {
          popperRef.current = elem;
        }}
      >
        <RootCloseWrapper onRootClose={hidePopover} disabled={disableRootClose}>
          <div role="dialog" ref={contentRef}>
            <PopoverHeader hasTitle={hasTitle}>
              {hasTitle && <TitleBar>{title}</TitleBar>}
              {hasAltCloseButton && altCloseButton}
              <CloseHelpText
                tabIndex={-1}
                ref={escMsgRef}
                aria-label="Press escape to close the Popover"
              />
            </PopoverHeader>

            <PopoverBody hasAltCloseWithNoTitle={hasAltCloseWithNoTitle}>
              <PopoverContent showCloseButton={showCloseButton}>
                {content}
              </PopoverContent>
              {showCloseButton && closeButton}
            </PopoverBody>
          </div>
        </RootCloseWrapper>
      </Popup>
    </Container>
  );
}

Popover.propTypes = {
  /** The name of the popover. Used for differentiating popovers */
  name: PropTypes.string.isRequired,
  /** The text displayed in the popover title section */
  title: PropTypes.string,
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
  /** Function returning a button component to be used as the popover trigger */
  renderTrigger: PropTypes.func.isRequired,
  /** Disables popovers ability to change position to stay in viewport */
  disableFlipping: PropTypes.bool
};

Popover.defaultProps = {
  placement: 'bottom',
  arrowSize: 'default',
  disableRootClose: false,
  hasCloseButton: false,
  hasAltCloseButton: false,
  disableFlipping: false,
  title: undefined
};

export default Popover;
