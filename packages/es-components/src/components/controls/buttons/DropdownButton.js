import React, { Children } from 'react';
import PropTypes from 'prop-types';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import styled from 'styled-components';
import Button from './Button';
import generateAlphaName from '../../util/generateAlphaName';

const Caret = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 5px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
`;

const ButtonPanel = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 2;
  margin-top: 3px;
  position: relative;
  border: 1px solid ${props => props.theme.colors.gray3};
  background-color: ${props => props.theme.colors.white};

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    position: absolute;
  }
`;

const ButtonPanelChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonLink = styled(Button)`
  padding: 10px 20px;
  color: black;
  text-decoration: none;
  text-align: left;
  margin-bottom: 0px;
  &:hover {
    background-color: ${props => props.theme.colors.gray2};
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

  return () => {
    node.removeEventListener('keydown', handleTabFocus);
  }
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

  return () => {
    node.removeEventListener('keydown', handleArrowMovementKeys);
  }
}

export class DropdownButton extends React.Component {
  constructor(props) {
    super();

    this.state = {
      buttonValue: props.buttonValue,
      isOpen: false
    };
  }

  componentDidMount() {
    this.removeFocusTrapListener = focusTrap(this.buttonDropdown);
    this.removeArrowMovementListener = arrowMovement(this.buttonDropdown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen !== this.state.isOpen) {
      this.triggerButton.focus();
    }
  }

  componentWillUnmount() {
    this.removeFocusTrapListener();
    this.removeArrowMovementListener();
  }

  setTriggerButton = ref => {
    this.triggerButton = ref;
  };

  setButtonDropdownRef = ref => {
    this.buttonDropdown = ref;
  };

  toggleDropdown = () => {
    this.setState(previousState => ({ isOpen: !previousState.isOpen }));
  };

  closeDropdown = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  handleDropdownItemClick = buttonProps => {
    const { shouldCloseOnButtonClick, shouldUpdateButtonValue } = this.props;

    return event => {
      if (shouldUpdateButtonValue) {
        this.setState({ buttonValue: buttonProps.children });
      }
      if (shouldCloseOnButtonClick) {
        this.closeDropdown();
      }

      buttonProps.handleOnClick(event, buttonProps.name);
    };
  };

  render() {
    const { rootClose, children, className, manualButtonValue } = this.props;
    const panelId = generateAlphaName();
    return (
      <RootCloseWrapper onRootClose={this.closeDropdown} disabled={!rootClose}>
        <div
          ref={this.setButtonDropdownRef}
          className={className}
          role="combobox"
          aria-controls={panelId}
          aria-expanded={this.state.isOpen}
          aria-haspopup="listbox"
        >
          <Button
            handleOnClick={this.toggleDropdown}
            aria-haspopup="true"
            aria-pressed={this.state.isOpen}
            innerRef={this.setTriggerButton}
          >
            {manualButtonValue || this.state.buttonValue}
            <Caret />
          </Button>
          <ButtonPanel isOpen={this.state.isOpen} id={panelId}>
            <ButtonPanelChildrenContainer>
              {Children.map(children, child => {
                const onClickHandler = this.handleDropdownItemClick(
                  child.props
                );
                const newProps = {
                  handleOnClick: onClickHandler,
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
   * Defines weather the dropdown will close when any other element on the page is clicked.
   * Uses RootCloseWrapper from React-Overlay
   */
  rootClose: PropTypes.bool,
  /** The classes to be applied to the div surrounding the button */
  className: PropTypes.string
};

DropdownButton.defaultProps = {
  buttonValue: null,
  manualButtonValue: null,
  shouldUpdateButtonValue: false,
  shouldCloseOnButtonClick: false,
  rootClose: false,
  className: null
};

export default DropdownButton;
