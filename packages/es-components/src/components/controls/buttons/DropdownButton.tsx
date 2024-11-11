/// <reference types="styled-components/cssprop" />

import 'get-root-node-polyfill/implement';
import React, {
  useState,
  useEffect,
  useRef,
  Children,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button, {
  ButtonProps,
  ButtonStyleType,
  buttonStyleTypes,
  propTypes as buttonPropTypes
} from './Button';
import LinkButton from './LinkButton';
import useUniqueId from '../../util/useUniqueId';
import RootCloseWrapper from '../../util/RootCloseWrapper';
import useTopZIndex from '../../../hooks/useTopZIndex';
import { useMergedRefs } from '../../util/callRef';

const SplitButton = styled(Button)`
  ${props =>
    props.flatLeftEdge &&
    `
    border-left: solid 1px ${props.theme.colors.gray9};
  `}

  ${props =>
    props.flatRightEdge &&
    `
    border-right: solid 1px ${props.theme.colors.gray9};
  `}

  min-width: 10px;
  padding-left: 8px;
  padding-right: 6px;

  span {
    margin-left: 0;
  }
`;

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

const ButtonPanel = styled.div<{ topIndex: number; isOpen?: boolean }>`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray3};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  margin-top: 3px;
  position: relative;
  z-index: ${({ topIndex }) => topIndex};

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
  margin-bottom: 0;
  padding: 10px 20px;
  text-align: left;
  text-decoration: none;

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
const UP_ARROW_KEY = 'ArrowUp';
const DOWN_ARROW_KEY = 'ArrowDown';

function getFocusables(node: HTMLElement) {
  const focusableElements = node.querySelectorAll('button');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  return {
    focusableElements,
    firstFocusable,
    lastFocusable
  };
}

const getRootNode = (node: HTMLElement): DocumentOrShadowRoot =>
  node.getRootNode() as unknown as DocumentOrShadowRoot;

function isCurrentlyActive(node: HTMLElement) {
  const rootNode = getRootNode(node);
  return rootNode.activeElement === node;
}

function focusTrap(node: Maybe<HTMLElement>) {
  if (!node) return () => ({});

  const { firstFocusable, lastFocusable } = getFocusables(node);

  function handleTabFocus(event: KeyboardEvent) {
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

function arrowMovement(node: Maybe<HTMLElement>) {
  if (!node) return () => ({});

  const { focusableElements, firstFocusable, lastFocusable } =
    getFocusables(node);
  const focusables = [...focusableElements];
  const rootNode = getRootNode(node);

  function handleArrowMovementKeys(event: KeyboardEvent) {
    const isUp = event.key === UP_ARROW_KEY || event.keyCode === UP_ARROW_CODE;
    const isDown =
      event.key === DOWN_ARROW_KEY || event.keyCode === DOWN_ARROW_CODE;

    if (!isUp && !isDown) return;

    const focusedIndex = focusables.indexOf(
      rootNode.activeElement as HTMLButtonElement
    );

    let newIndex = focusedIndex + (isDown ? 1 : -1);
    newIndex =
      isUp && isCurrentlyActive(firstFocusable)
        ? focusables.length - 1
        : newIndex;
    newIndex = isDown && isCurrentlyActive(lastFocusable) ? 0 : newIndex;

    focusableElements[newIndex].focus();
    event.preventDefault();
  }

  node.addEventListener('keydown', handleArrowMovementKeys);

  return function removeArrowMovementListener() {
    node.removeEventListener('keydown', handleArrowMovementKeys);
  };
}

export type DropdownButtonProps = Omit<ButtonProps, 'children'> & {
  children: NonNullable<React.ReactNode>;
  buttonValue?: React.ReactNode;
  manualButtonValue?: React.ReactNode;
  shouldUpdateButtonValue?: boolean;
  shouldCloseOnButtonClick?: boolean;
  rootClose?: boolean;
  styleType?: ButtonProps['styleType'];
  inline?: boolean;
  id?: string;
  flatLeftEdge?: boolean;
  flatRightEdge?: boolean;
};

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  function DropdownButton(
    {
      id,
      rootClose,
      children,
      buttonValue,
      manualButtonValue,
      shouldCloseOnButtonClick = false,
      shouldUpdateButtonValue = false,
      styleType = 'default',
      inline = false,
      flatLeftEdge = false,
      flatRightEdge = false,
      ...otherProps
    },
    ref
  ) {
    const ActivationButton =
      flatLeftEdge || flatRightEdge ? SplitButton : Button;

    const [buttonStateValue, setButtonStateValue] = useState(buttonValue);
    const [isOpen, setIsOpen] = useState(false);

    const initialRender = useRef(true);
    const buttonDropdown = useRef<HTMLDivElement>(null);
    const triggerButton = useRef<HTMLButtonElement>(null);
    const panelId = useUniqueId(id);
    const getTopIndex = useTopZIndex();
    const mainRef = useMergedRefs(ref, triggerButton);

    useEffect(() => {
      const removeFocusTrapListener = focusTrap(buttonDropdown.current);
      const removeArrowMovementListener = arrowMovement(buttonDropdown.current);

      return function removeListeners() {
        removeFocusTrapListener();
        removeArrowMovementListener();
      };
    }, [isOpen]);

    useEffect(() => {
      if (!initialRender.current) {
        triggerButton.current?.focus();
      }
      initialRender.current = false;
    }, [isOpen]);

    const toggleDropdown = useCallback(
      () => setIsOpen(oldIsOpen => !oldIsOpen),
      []
    );

    const closeDropdown = useCallback(() => setIsOpen(false), []);

    const handleDropdownItemClick = useCallback(
      (childProps?: unknown) =>
        (event: React.MouseEvent<HTMLButtonElement>) => {
          if (!childProps) return;

          const buttonProps = childProps as {
            children?: React.ReactNode;
            name?: string;
            onClick?: (
              event: React.MouseEvent<HTMLButtonElement>,
              name: string
            ) => void;
          };
          if (shouldUpdateButtonValue) {
            setButtonStateValue(buttonProps.children);
          }
          if (shouldCloseOnButtonClick) {
            closeDropdown();
          }

          buttonProps?.onClick?.(event, buttonProps?.name || '');
        },
      [shouldUpdateButtonValue, shouldCloseOnButtonClick, closeDropdown]
    );

    return (
      <RootCloseWrapper
        onRootClose={closeDropdown}
        disabled={!rootClose}
        css={`
          display: ${inline ? 'inline-flex' : 'block'};
          flex-direction: column;
          position: relative;
        `}
      >
        <div
          ref={buttonDropdown}
          role="combobox"
          aria-controls={panelId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <ActivationButton
            {...otherProps}
            flatLeftEdge={flatLeftEdge}
            flatRightEdge={flatRightEdge}
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-pressed={isOpen}
            className={
              isOpen
                ? `${otherProps?.className || ''} pressed`
                : otherProps.className
            }
            ref={mainRef}
            styleType={styleType}
          >
            {manualButtonValue || buttonStateValue}
            <Caret />
          </ActivationButton>
          <div css="position: relative;">
            <ButtonPanel
              isOpen={isOpen}
              id={panelId}
              topIndex={isOpen ? getTopIndex() : -1}
            >
              <ButtonPanelChildrenContainer>
                {Children.map(children, ch => {
                  if (!ch || typeof ch !== 'object') return ch;

                  const child = ch as React.ReactElement;
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
        </div>
      </RootCloseWrapper>
    );
  }
);

type DropdownButtonComponent = typeof DropdownButton & {
  Button: typeof StyledButtonLink;
};

(DropdownButton as DropdownButtonComponent).Button = StyledButtonLink;

DropdownButton.propTypes = {
  ...buttonPropTypes,
  /** Content shown in the button */
  buttonValue: PropTypes.node,
  /**
   * Defines what value should be displayed on the button.
   * Overrides the stored state value, and renders shouldUpdateButtonValue
   * useless
   */
  manualButtonValue: PropTypes.node,
  children: PropTypes.node.isRequired,
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
  styleType: PropTypes.oneOf<ButtonStyleType>(buttonStyleTypes),
  /** Display the dropdown button inline */
  inline: PropTypes.bool,
  id: PropTypes.string,
  /** Styles the Button with a flat left edge */
  flatLeftEdge: PropTypes.bool,
  /** Styles the Button with a flat right edge */
  flatRightEdge: PropTypes.bool
};

export default DropdownButton as DropdownButtonComponent;
