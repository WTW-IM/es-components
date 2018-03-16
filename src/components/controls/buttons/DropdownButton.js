import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Button from '../../controls/buttons/Button';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../../theme/defaultTheme';

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
  margin-top: 3px;
  position: absolute;
  border: 1px solid ${props => props.theme.colors.grayLight};
  background-color: ${props => props.theme.colors.white};
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
    background-color: ${props => props.theme.colors.grayLighter};
  }
`;

class DropdownButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      buttonValue: props.buttonValue,
      isOpen: false
    };
  }

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
    const { theme, rootClose, children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <RootCloseWrapper
          onRootClose={this.closeDropdown}
          disabled={!rootClose}
        >
          <div>
            <Button handleOnClick={this.toggleDropdown}>
              {this.state.buttonValue} <Caret />
            </Button>
            <ButtonPanel isOpen={this.state.isOpen} theme={theme}>
              <ButtonPanelChildrenContainer>
                {Children.map(children, child => {
                  const onClickHandler = this.handleDropdownItemClick(
                    child.props
                  );
                  const newProps = {
                    handleOnClick: onClickHandler
                  };
                  return React.cloneElement(child, newProps);
                })}
              </ButtonPanelChildrenContainer>
            </ButtonPanel>
          </div>
        </RootCloseWrapper>
      </ThemeProvider>
    );
  }
}

DropdownButton.Button = StyledButtonLink;

DropdownButton.propTypes = {
  /** Content shown in the button */
  buttonValue: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object,
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
  rootClose: PropTypes.bool
};

DropdownButton.defaultProps = {
  theme: defaultTheme
};

export default DropdownButton;
