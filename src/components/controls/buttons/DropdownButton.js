import React from 'react';
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
    this.handleDropdownItemClick = this.handleDropdownItemClick.bind(this);
  }

  toggleDropdown = () => {
    this.setState(previousState => ({ isOpen: !previousState.isOpen }));
  };

  closeDropdown = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  handleDropdownItemClick(button) {
    return event => {
      if (this.props.shouldUpdateButtonValue) {
        this.setState({ buttonValue: button.buttonValue });
      }

      this.props.onDropdownItemClick(button);

      if (this.props.shouldCloseOnButtonClick) {
        this.closeDropdown();
      }
    };
  }

  render() {
    const { theme, dropdownItems, rootClose } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <RootCloseWrapper
          onRootClose={this.closeDropdown}
          disabled={!rootClose}
        >
          <Button handleOnClick={this.toggleDropdown}>
            {this.state.buttonValue} <Caret />
          </Button>
          <ButtonPanel isOpen={this.state.isOpen} theme={theme}>
            <ButtonPanelChildrenContainer>
              {dropdownItems.map(button => {
                const clickFunction = this.handleDropdownItemClick(button);
                return (
                  <StyledButtonLink
                    handleOnClick={clickFunction}
                    styleType="link"
                    theme={theme}
                  >
                    {button.buttonValue}
                  </StyledButtonLink>
                );
              })}
            </ButtonPanelChildrenContainer>
          </ButtonPanel>
        </RootCloseWrapper>
      </ThemeProvider>
    );
  }
}

DropdownButton.propTypes = {
  buttonValue: PropTypes.any.isRequired,
  theme: PropTypes.object,
  shouldUpdateButtonValue: PropTypes.bool,
  shouldCloseOnButtonClick: PropTypes.bool,
  dropdownItems: PropTypes.arrayOf(PropTypes.any),
  onDropdownItemClick: PropTypes.func,
  rootClose: PropTypes.bool
};

DropdownButton.defaultProps = {
  theme: defaultTheme
};

export default DropdownButton;
