import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import defaultTheme from '../../theme/defaultTheme';

function getBlockPropertyValues(isBlock) {
  if (isBlock) {
    return {
      display: 'block',
      width: '100%'
    };
  }
  return {
    display: 'inline-block',
    width: 'initial'
  };
}

const ButtonBase = styled.button`
  border: none;
  border-radius: ${props => props.buttonSize.borderRadius};
  box-sizing: border-box;
  cursor: pointer;
  display: ${props => getBlockPropertyValues(props.block).display};
  font-family: inherit;
  font-size: ${props => props.buttonSize.fontSize};
  line-height: 1.4;
  padding: ${props => props.buttonSize.padding};
  text-align: center;
  white-space: nowrap;
  width: ${props => getBlockPropertyValues(props.block).width};

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }
`;

const DefaultButton = styled(ButtonBase)`
  background-color: ${props => props.variant.bgColor};
  border-color: transparent;
  box-shadow: 0 4px 0 0 ${props => props.variant.boxShadowColor};
  color: ${props => props.variant.textColor};
  margin: 0 0 4px 0;

  &[disabled]:hover {
    background-color: ${props => props.variant.bgColor};
  }

  &:hover {
    background-color: ${props => props.variant.hoverBgColor};
  }

  &:active {
    margin-bottom: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 0 transparent;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: ${props => props.variant.bgColor};
  border: 2px solid ${props => props.variant.borderColor};
  border-radius: 5px;
  color: ${props => props.variant.textColor};
  font-weight: bold;

  &:hover {
    background-color: ${props => props.variant.hoverBgColor};
    color: ${props => props.variant.hoverTextColor};
  }

  &:active {
    background-color: ${props => props.variant.activeBgColor};
    color: ${props => props.variant.activeTextColor};
  }
`;

const LinkButton = styled(ButtonBase)`
  background-color: transparent;
  box-shadow: none;
  color: ${props => props.variant.bgColor};
  font-size: inherit;
  padding: 0;
  text-decoration: underline;

  &:hover,
  &:focus,
  &:active {
    border-color: transparent;
    color: ${props => props.variant.hoverBgColor};
    text-decoration: none;
  }

  &:active {
    margin: 0 0 4px 0;
    box-shadow: none;
  }

  &[disabled]:hover {
    color: ${props => props.variant.bgColor};
    text-decoration: underline;
  }
`;

function Button({
  handleOnClick,
  children,
  buttonClasses,
  styleType = 'default',
  isLinkButton = false,
  size = 'default',
  block = false,
  isOutline = false,
  theme,
  ...buttonProps
}) {
  const buttonSize = theme.buttonSizes[size];
  const sharedProps = {
    block,
    buttonSize,
    onClick: handleOnClick,
    className: buttonClasses,
    ...buttonProps
  };

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

  let variant = theme.buttonStyles.buttonsNormal[styleType] || defaultButton;
  let button = (
    <DefaultButton variant={variant} {...sharedProps}>
      {children}
    </DefaultButton>
  );

  if (isOutline) {
    variant = theme.buttonStyles.buttonsOutline[styleType] || defaultButton;
    button = (
      <OutlineButton variant={variant} {...sharedProps}>
        {children}
      </OutlineButton>
    );
  } else if (isLinkButton) {
    variant = theme.buttonStyles.buttonsNormal[styleType] || defaultButton;
    button = (
      <LinkButton variant={variant} {...sharedProps}>
        {children}
      </LinkButton>
    );
  }

  return <ThemeProvider theme={theme}>{button}</ThemeProvider>;
}

const buttonSizes = ['lg', 'default', 'sm', 'xs'];

Button.propTypes = {
  /** Function to execute when button is clicked */
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /** Any additional classes to apply to the button */
  buttonClasses: PropTypes.string,
  /** Chooses the color variant of the button, comes from applied theme */
  styleType: PropTypes.string,
  /** Determines if the button should be rendered as a text link */
  isLinkButton: PropTypes.bool,
  size: PropTypes.oneOf(buttonSizes),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool,
  /** Render the outline button variant */
  isOutline: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

Button.defaultProps = {
  theme: defaultTheme
};

export default Button;
