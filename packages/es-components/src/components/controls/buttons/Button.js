import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import viaTheme from 'es-components-via-theme';

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
  vertical-align: middle;
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
  margin-bottom: 4px;
  margin-top: 0;

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
    box-shadow: none;
  }

  &[disabled]:hover {
    color: ${props => props.variant.bgColor};
    text-decoration: underline;
  }
`;

export function Button({
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

  const defaultNormal = {
    bgColor: theme.colors.defaultColor,
    textColor: theme.colors.defaultBtnText,
    hoverBgColor: theme.colors.defaultHover,
    hoverTextColor: theme.colors.defaultBtnText,
    activeBgColor: theme.colors.defaultHover,
    activeTextColor: theme.colors.defaultBtnText,
    boxShadowColor: theme.colors.defaultHover
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

  let variant = theme.buttonStyles.buttonsNormal[styleType] || defaultNormal;
  let button = (
    <DefaultButton variant={variant} {...sharedProps}>
      {children}
    </DefaultButton>
  );

  if (isOutline) {
    variant = theme.buttonStyles.buttonsOutline[styleType] || defaultOutline;
    button = (
      <OutlineButton variant={variant} {...sharedProps}>
        {children}
      </OutlineButton>
    );
  } else if (isLinkButton) {
    variant = theme.buttonStyles.buttonsNormal[styleType] || defaultNormal;
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
  /** Select the color style of the button, types come from theme */
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
  theme: PropTypes.object,
  /** The name of the button to be sent with the form. */
  name: PropTypes.string
};

Button.defaultProps = {
  theme: viaTheme
};

export default withTheme(Button);
