/* eslint no-confusing-arrow: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import Button from './Button';

function ToggleButton(props) {
  const [isPressed, setIsPressed] = useState(props.isPressed);

  function toggleButton(event) {
    setIsPressed(!isPressed);
    props.handleOnClick(event);
  }

  const {
    buttonClasses,
    styleType,
    isLinkButton,
    size,
    block,
    isOutline,
    theme,
    ...buttonProps
  } = props;

  const defaultButton = {
    bgColor: theme.colors.defaultColor,
    textColor: theme.colors.defaultBtnText,
    hoverBgColor: theme.colors.defaultHover,
    hoverTextColor: theme.colors.defaultBtnText,
    activeBgColor: theme.colors.defaultHover,
    activeTextColor: theme.colors.defaultBtnText,
    boxShadowColor: theme.colors.defaultHover,
    borderColor: theme.colors.defaultColor
  };
  const defaultOutline = {
    bgColor: theme.colors.white,
    textColor: theme.colors.defaultColor,
    hoverBgColor: theme.colors.defaultColor,
    hoverTextColor: theme.colors.white,
    activeBgColor: theme.colors.defaultHover,
    activeTextColor: theme.colors.white,
    borderColor: theme.colors.defaultColor
  };

  let variant;
  if (isOutline) {
    variant = theme.buttonStyles.buttonsOutline[styleType] || defaultOutline;
  } else {
    variant = theme.buttonStyles.buttonsNormal[styleType] || defaultButton;
  }

  return (
    <StyledToggleButton
      {...buttonProps}
      handleOnClick={toggleButton}
      buttonClasses={buttonClasses}
      styleType={styleType}
      isLinkButton={isLinkButton}
      size={size}
      block={block}
      isOutline={isOutline}
      isPressed={isPressed}
      variant={variant}
    >
      {props.children}
    </StyledToggleButton>
  );
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
  /** @deprecated ToggleButton will accept standard className prop */
  buttonClasses: PropTypes.string,
  styleType: PropTypes.string,
  isLinkButton: PropTypes.bool,
  size: PropTypes.oneOf(buttonSizes),
  block: PropTypes.bool,
  isOutline: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired,
  isPressed: PropTypes.bool
};

ToggleButton.defaultProps = {
  styleType: 'default',
  buttonClasses: undefined,
  isLinkButton: false,
  size: 'default',
  block: false,
  isOutline: false,
  isPressed: false
};

export default withTheme(ToggleButton);
