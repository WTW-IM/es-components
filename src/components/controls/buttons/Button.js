import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import { buttonSizeStyles } from './button-sizes';
import { defaultButtonVariants, alternateButtonVariants } from './button-variants';

import { colors } from '../../theme';

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
  }

  &:active {
    margin-bottom: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 0 transparent;
  }
`;

const DefaultButton = styled(ButtonBase)`
  background-color: ${props => props.buttonVariant.backgroundColor.toRgbString()};
  border-color: ${props => props.buttonVariant.borderColor};
  box-shadow: 0 4px 0 0 ${props => props.buttonVariant.boxShadowColor};
  color: ${props => props.buttonVariant.foregroundColor};

  &[disabled]:hover {
    background-color: ${props => props.buttonVariant.backgroundColor.toRgbString()};
  }

  &:hover {
    background-color: ${props => props.buttonVariant.hoverBackgroundColor};
  }
`;

const AlternateButton = styled(ButtonBase)`
  background-color: ${colors.white};
  border: 2px solid ${props => props.buttonVariant.borderColor.toRgbString()};
  border-radius: 0;
  color: ${props => props.buttonVariant.foregroundColor.toRgbString()};

  &:hover {
    background-color: ${props => props.buttonVariant.hoverBackgroundColor.toRgbString()};
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
  color: ${colors.accent};
  padding: 0;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  &[disabled]:hover {
    color: ${colors.accent};
    text-decoration: underline;
  }

  &:active {
    margin: 0 0 4px 0;
    box-shadow: none;
  }

  &:hover, &:focus {
    color: ${tinycolor(colors.primary).darken(15).toRgbString()};
  }

  &:hover, &:focus, &:active {
    border-color: transperent;
  }
`;

function Button({
  handleOnClick,
  children,
  buttonClasses,
  styleType = 'default',
  size = 'default',
  block = false,
  alternative = false,
    ...buttonProps
}) {
  const buttonSize = buttonSizeStyles[size];
  const isLinkButton = styleType === 'link';
  const sharedProps = {
    block,
    buttonSize,
    onClick: handleOnClick,
    className: buttonClasses,
    ...buttonProps
  };

  if (alternative) {
    const buttonVariant = alternateButtonVariants[styleType];
    return (
      <AlternateButton buttonVariant={buttonVariant} {...sharedProps}>
        <AlternateChildrenContainer>
          {children}
          <AlternateButtonIcon name="arrow-right" lightweight />
        </AlternateChildrenContainer>
      </AlternateButton>
    );
  } else if (isLinkButton) {
    return (
      <LinkButton {...sharedProps}>
        {children}
      </LinkButton>
    );
  }

  const buttonVariant = defaultButtonVariants[styleType];
  return (
    <DefaultButton buttonVariant={buttonVariant} {...sharedProps}>
      {children}
    </DefaultButton>
  );
}

const buttonStyleTypes = [
  'default',
  'primary',
  'accent',
  'success',
  'info',
  'warning',
  'danger',
  'link'
];

const buttonSizes = [
  'lg',
  'default',
  'sm',
  'xs'
];

Button.propTypes = {
  /** Function to execute when button is clicked */
  handleOnClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /** Any additional classes to apply to the button */
  buttonClasses: PropTypes.string,
  styleType: PropTypes.oneOf(buttonStyleTypes),
  size: PropTypes.oneOf(buttonSizes),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool,
  /** Render with the alternative styling */
  alternative: PropTypes.bool
};

export default Button;
