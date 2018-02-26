import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import tinycolor from 'tinycolor2';

import defaultTheme from '../../theme/defaultTheme';
import { buttonSizeStyles } from './button-sizes';
import {
  defaultButtonVariants,
  alternateButtonVariants,
  buttonStyleTypes
} from './button-variants';
import Icon from '../../base/icons/Icon';

function getBlockPropertyValues(isBlock) {
  if (isBlock) {
    return {
      display: 'block',
      width: '100%'
    };
  }
  return {
    display: 'initial',
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
  margin: 0 0 4px 0;
  padding: ${props => props.buttonSize.padding};
  text-align: center;
  width: ${props => getBlockPropertyValues(props.block).width};

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;

    > * {
      pointer-events: none;
    }
  }

  &:active {
    margin-bottom: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 0 transparent;
  }
`;

const DefaultButton = styled(ButtonBase)`
  background-color: ${props => props.buttonVariant.backgroundColor};
  border-color: ${props => props.buttonVariant.borderColor};
  box-shadow: 0 4px 0 0 ${props => props.buttonVariant.boxShadowColor};
  color: ${props => props.buttonVariant.foregroundColor};

  &[disabled]:hover {
    background-color: ${props => props.buttonVariant.backgroundColor};
  }

  &:hover {
    background-color: ${props => props.buttonVariant.hoverBackgroundColor};
  }
`;

const AlternateButton = styled(ButtonBase)`
  background-color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.buttonVariant.borderColor};
  border-radius: 0;
  color: ${props => props.buttonVariant.foregroundColor};

  &:hover {
    background-color: ${props => props.buttonVariant.hoverBackgroundColor};
    color: ${props => props.buttonVariant.hoverForegroundColor};
  }
`;

const AlternateChildrenContainer = styled.div`
  display: flex;
  font-weight: bold;
`;

const AlternateButtonIcon = styled(Icon)`
  align-self: center;
  font-weight: bold;
  margin-left: 5px;
`;

const LinkButton = styled(ButtonBase)`
  background-color: transparent;
  box-shadow: none;
  color: ${props => props.theme.colors.accent};
  padding: 0;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  &[disabled]:hover {
    color: ${props => props.theme.colors.accent};
    text-decoration: underline;
  }

  &:active {
    margin: 0 0 4px 0;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    color: ${props =>
      tinycolor(props.theme.colors.accent)
        .darken(15)
        .toRgbString()};
  }

  &:hover,
  &:focus,
  &:active {
    border-color: transperent;
  }
`;

const StyledLinkButton = styled(LinkButton)`
  color: ${props => props.buttonVariant.backgroundColor};
  font-size: inherit;

  &:hover,
  &:focus {
    color: ${props =>
      tinycolor(props.buttonVariant.backgroundColor)
        .darken(15)
        .toRgbString()};
  }
`;

function Button({
  handleOnClick,
  children,
  buttonClasses,
  styleType = 'default',
  styledLink = false,
  size = 'default',
  block = false,
  alternative = false,
  theme,
  ...buttonProps
}) {
  const buttonSize = buttonSizeStyles[size];
  const isLinkButton = styleType === 'link' || styledLink;
  const sharedProps = {
    block,
    buttonSize,
    onClick: handleOnClick,
    className: buttonClasses,
    ...buttonProps
  };

  if (alternative) {
    const buttonVariant = alternateButtonVariants(theme.colors, styleType);
    return (
      <ThemeProvider theme={theme}>
        <AlternateButton buttonVariant={buttonVariant} {...sharedProps}>
          <AlternateChildrenContainer>
            {children}
            <AlternateButtonIcon name="arrow-right" lightweight />
          </AlternateChildrenContainer>
        </AlternateButton>
      </ThemeProvider>
    );
  } else if (isLinkButton) {
    const buttonVariant = defaultButtonVariants(theme.colors, styleType);
    const link = styledLink ? (
      <StyledLinkButton buttonVariant={buttonVariant} {...sharedProps}>
        {children}
      </StyledLinkButton>
    ) : (
      <LinkButton {...sharedProps}>{children}</LinkButton>
    );
    return <ThemeProvider theme={theme}>{link}</ThemeProvider>;
  }

  const buttonVariant = defaultButtonVariants(theme.colors, styleType);
  return (
    <ThemeProvider theme={theme}>
      <DefaultButton buttonVariant={buttonVariant} {...sharedProps}>
        {children}
      </DefaultButton>
    </ThemeProvider>
  );
}

const buttonSizes = ['lg', 'default', 'sm', 'xs'];

Button.propTypes = {
  /** Function to execute when button is clicked */
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /** Any additional classes to apply to the button */
  buttonClasses: PropTypes.string,
  /** Chooses the color theme of the button */
  styleType: PropTypes.oneOf(buttonStyleTypes),
  /** Determines if the button should be rendered as a link with different colors */
  styledLink: PropTypes.bool,
  size: PropTypes.oneOf(buttonSizes),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool,
  /** Render with the alternative styling */
  alternative: PropTypes.bool,
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
