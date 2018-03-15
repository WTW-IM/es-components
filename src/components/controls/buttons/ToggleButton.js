/* eslint no-confusing-arrow: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Button from './Button';
import defaultTheme from '../../theme/defaultTheme';

class ToggleButton extends React.Component {
  state = {
    isPressed: this.props.isPressed
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPressed !== this.state.isPressed) {
      this.setState({ isPressed: nextProps.isPressed });
    }
  }

  toggleButton = event => {
    this.setState(previousState => ({ isPressed: !previousState.isPressed }));
    this.props.handleOnClick(event);
  };

  render() {
    const {
      buttonClasses,
      styleType,
      isLinkButton,
      size,
      block,
      isOutline,
      theme
    } = this.props;

    const defaultButton = {
      bgColor: theme.colors.dflt,
      textColor: theme.colors.dfltBtnTextColor,
      hoverBgColor: theme.colors.dfltHover,
      hoverTextColor: theme.colors.dfltBtnTextColor,
      activeBgColor: theme.colors.dfltHover,
      activeTextColor: theme.colors.dfltBtnTextColor,
      boxShadowColor: theme.colors.dfltHover,
      borderColor: theme.colors.dflt
    };
    const defaultOutline = {
      bgColor: theme.colors.white,
      textColor: theme.colors.dflt,
      hoverBgColor: theme.colors.dflt,
      hoverTextColor: theme.colors.white,
      activeBgColor: theme.colors.dfltHover,
      activeTextColor: theme.colors.white,
      borderColor: theme.colors.dflt
    };

    let variant;
    if (isOutline) {
      variant = theme.buttonStyles.buttonsOutline[styleType] || defaultOutline;
    } else {
      variant = theme.buttonStyles.buttonsNormal[styleType] || defaultButton;
    }

    return (
      <ThemeProvider theme={theme}>
        <StyledToggleButton
          handleOnClick={this.toggleButton}
          buttonClasses={buttonClasses}
          styleType={styleType}
          isLinkButton={isLinkButton}
          size={size}
          block={block}
          isOutline={isOutline}
          isPressed={this.state.isPressed}
          variant={variant}
        >
          {this.props.children}
        </StyledToggleButton>
      </ThemeProvider>
    );
  }
}

const StyledToggleButton = styled(Button)`
  background-color: ${props =>
    props.isPressed ? props.variant.hoverBgColor : props.variant.bgColor};
  color: ${props =>
    props.isPressed ? props.variant.activeTextColor : props.variant.textColor};
`;

const buttonSizes = ['lg', 'default', 'sm', 'xs'];

ToggleButton.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonClasses: PropTypes.string,
  styleType: PropTypes.string,
  isLinkButton: PropTypes.bool,
  size: PropTypes.oneOf(buttonSizes),
  block: PropTypes.bool,
  isOutline: PropTypes.bool,
  theme: PropTypes.object,
  isPressed: PropTypes.bool
};

ToggleButton.defaultProps = {
  styleType: 'default',
  theme: defaultTheme
};

export default ToggleButton;
