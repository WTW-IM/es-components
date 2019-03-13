import React, { useState, useEffect, useRef, Children } from 'react';
import PropTypes from 'prop-types';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import styled from 'styled-components';

import Button from './Button';
import LinkButton from './LinkButton';
import useUniqueId from '../../util/useUniqueId';

const Caret = styled.span`
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px dashed;
  display: inline-block;
  height: 0;
  margin-left: 5px;
  vertical-align: middle;
  width: 0;
`;

const ButtonPanel = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray3};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  margin-top: 3px;
  position: relative;
  z-index: 999;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    position: absolute;
  }
`;

const ButtonPanelChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonLink = styled(LinkButton)`
  color: black;
  margin-bottom: 0px;
  text-align: left;
  text-decoration: none;
  padding: 10px 20px;

  &:active,
  &:focus,
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const TAB_KEY_CODE = 9;
const UP_ARROW_CODE = 38;
const DOWN_ARROW_CODE = 40;

function getFocusables(node) {
  const focusableElements = node.querySelectorAll('button');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  return {
    focusableElements,
    firstFocusable,
    lastFocusable
  };
}

function isCurrentlyActive(node) {
  return document.activeElement === node;
}

function focusTrap(node) {
  const { firstFocusable, lastFocusable } = getFocusables(node);

  function handleTabFocus(event) {
    if (event.key === 'Tab' || event.keyCode === TAB_KEY_CODE) {
      if (event.shiftKey) {
        if (isCurrentlyActive(firstFocusable)) {
          lastFocusable.focus();
          event.preventDefault();
        }
      } else if (isCurrentlyActive(lastFocusable)) {
        firstFocusable.focus();
        event.preventDefault();
      }
    }
  }

  node.addEventListener('keydown', handleTabFocus);

  return function removeKeydownListener() {
    node.removeEventListener('keydown', handleTabFocus);
  };
}

function arrowMovement(node) {
  const { focusableElements, firstFocusable, lastFocusable } = getFocusables(
    node
  );
  const focusables = [...focusableElements];

  function handleArrowMovementKeys(event) {
    if (event.keyCode === UP_ARROW_CODE) {
      if (isCurrentlyActive(firstFocusable)) {
        lastFocusable.focus();
        event.preventDefault();
      } else {
        const index = focusables.indexOf(document.activeElement);
        focusables[index - 1].focus();
        event.preventDefault();
      }
    }
    if (event.keyCode === DOWN_ARROW_CODE) {
      if (isCurrentlyActive(lastFocusable)) {
        firstFocusable.focus();
        event.preventDefault();
      } else {
        const index = focusables.indexOf(document.activeElement);
        focusableElements[index + 1].focus();
        event.preventDefault();
      }
    }
  }

  node.addEventListener('keydown', handleArrowMovementKeys);

  return function removeArrowMovementListener() {
    node.removeEventListener('keydown', handleArrowMovementKeys);
  };
}

function DropdownButton(props) {
  const [buttonValue, setButtonValue] = useState(props.buttonValue);
  const [isOpen, setIsOpen] = useState(false);

  const initialRender = useRef(true);
  const buttonDropdown = useRef();
  const triggerButton = useRef();
  const panelId = useUniqueId();

  useEffect(
    () => {
      const removeFocusTrapListener = focusTrap(buttonDropdown.current);
      const removeArrowMovementListener = arrowMovement(buttonDropdown.current);

      return function removeListeners() {
        removeFocusTrapListener();
        removeArrowMovementListener();
      };
    },
    [isOpen]
  );

  useEffect(
    () => {
      if (!initialRender.current) {
        triggerButton.current.focus();
      }
      initialRender.current = false;
    },
    [isOpen]
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  function closeDropdown() {
    if (isOpen) {
      setIsOpen(false);
    }
  }

  function handleDropdownItemClick(buttonProps) {
    const { shouldCloseOnButtonClick, shouldUpdateButtonValue } = props;

    return event => {
      if (shouldUpdateButtonValue) {
        setButtonValue(buttonProps.children);
      }
      if (shouldCloseOnButtonClick) {
        closeDropdown();
      }

      buttonProps.onClick(event, buttonProps.name);
    };
  }

  const {
    rootClose,
    children,
    manualButtonValue,
    styleType,
    ...otherProps
  } = props;

  return (
    <RootCloseWrapper onRootClose={closeDropdown} disabled={!rootClose}>
      <div
        ref={buttonDropdown}
        role="combobox"
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Button
          {...otherProps}
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-pressed={isOpen}
          ref={triggerButton}
          styleType={styleType}
        >
          {manualButtonValue || buttonValue}
          <Caret />
        </Button>
        <ButtonPanel isOpen={isOpen} id={panelId}>
          <ButtonPanelChildrenContainer>
            {Children.map(children, child => {
              const onClickHandler = handleDropdownItemClick(child.props);
              const newProps = {
                onClick: onClickHandler,
                role: 'option'
              };
              return React.cloneElement(child, newProps);
            })}
          </ButtonPanelChildrenContainer>
        </ButtonPanel>
      </div>
    </RootCloseWrapper>
  );
}

DropdownButton.Button = StyledButtonLink;

DropdownButton.propTypes = {
  /** Content shown in the button */
  buttonValue: PropTypes.any,
  /**
   * Defines what value should be displayed on the button.
   * Overrides the stored state value, and renders shouldUpdateButtonValue
   * useless
   */
  manualButtonValue: PropTypes.node,
  children: PropTypes.any.isRequired,
  /**
   * Defines if the buttons value should update to the last pressed,
   * childs value.
   */
  shouldUpdateButtonValue: PropTypes.bool,
  /** Defines if the dropdown should close when any child button is clicked */
  shouldCloseOnButtonClick: PropTypes.bool,
  /**
   * Defines whether the dropdown will close when any other element on the page is clicked.
   * Uses RootCloseWrapper from React-Overlay
   */
  rootClose: PropTypes.bool,
  /** Select the color style of the button, types come from theme */
  styleType: PropTypes.string
};

DropdownButton.defaultProps = {
  buttonValue: undefined,
  manualButtonValue: undefined,
  shouldUpdateButtonValue: false,
  shouldCloseOnButtonClick: false,
  styleType: 'default',
  rootClose: false
};

export default DropdownButton;
