import React from 'react';
import type * as CSS from 'csstype';
import styled from 'styled-components';
import tinycolor, { ColorInput } from 'tinycolor2';
import { useTheme } from '../../util/useTheme';
import Button, { ButtonProps } from './Button';
import { ButtonSizeBlock } from 'es-components-shared-types';

type OutlineButtonColors = {
  textColor: CSS.Property.Color;
  bgColor: CSS.Property.BackgroundColor;

  hoverTextColor: CSS.Property.Color;
  hoverBgColor: CSS.Property.BackgroundColor;
  hoverBorderColor: CSS.Property.BorderColor;

  focusBoxShadowColor: CSS.Property.Color;
};

const StyledButton = styled(Button)<{
  colors: OutlineButtonColors;
  buttonSize: ButtonSizeBlock;
}>`
  background-color: ${props => props.colors.bgColor};
  border: 2px solid ${props => props.colors.textColor};
  color: ${props => props.colors.textColor};
  overflow: hidden;

  &:focus {
    box-shadow: 0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
    outline: none;
  }

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => props.colors.hoverBgColor};
      color: ${props => props.colors.hoverTextColor};
      border-color: ${props => props.colors.hoverBorderColor};
    }
  }

  &:active,
  &.pressed {
    background-color: ${props => props.colors.textColor};
    color: ${props => props.colors.hoverTextColor};
  }

  &.pressed {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25);
  }

  &:active:focus,
  &.pressed:focus {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
  }

  &[disabled],
  &[data-waiting],
  &[data-waiting]:active,
  &[data-waiting].pressed,
  &[data-waiting].pressed {
    background-color: #e6e6e6;
    border-color: #e6e6e6;
    color: #ccc;
    cursor: not-allowed;

    &:hover,
    &:active,
    &.pressed {
      background-color: #e6e6e6;
      border-color: #e6e6e6;
      color: #ccc;
      &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
      }
    }

    > * {
      pointer-events: none;
    }
  }
`;

const OutlineButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function OutlineButton(props, ref) {
    const {
      children,
      styleType = 'default',
      size = 'default',
      ...other
    } = props;
    const theme = useTheme();
    const buttonSize = theme.buttonStyles.outlineButton.size[size];
    const variant = theme.buttonStyles.outlineButton.variant[styleType];
    const isInheritedStyle = styleType === 'inherited';

    let buttonColors: OutlineButtonColors = {
      textColor: 'inherited',
      bgColor: 'inherited',
      hoverTextColor: 'inherited',
      hoverBgColor: 'inherited',
      hoverBorderColor: 'inherited',
      focusBoxShadowColor: theme.colors.gray4
    };

    if (!isInheritedStyle) {
      const focusBoxShadowColor = tinycolor.mix(
        variant.bgColor as ColorInput,
        theme.colors.black,
        14
      );
      focusBoxShadowColor.setAlpha(0.5);

      buttonColors = {
        textColor: variant.bgColor as CSS.Property.Color,
        bgColor: theme.colors.white,
        hoverTextColor: variant?.hoverColor || theme.colors.white,
        hoverBgColor:
          variant?.hoverBgColor ||
          (variant.bgColor as CSS.Property.BackgroundColor),
        hoverBorderColor:
          variant?.hoverColor || (variant?.bgColor as CSS.Property.BorderColor),
        focusBoxShadowColor: focusBoxShadowColor.toRgbString()
      };
    }

    return (
      <StyledButton
        ref={ref}
        buttonSize={buttonSize}
        colors={buttonColors}
        {...other}
      >
        {children}
      </StyledButton>
    );
  }
);

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const propTypes = {
  ...Button.propTypes,
  /** Select the color style of the button, types come from theme buttonStyles.outlineButton */
  styleType: Button.propTypes!.styleType
};
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export const defaultProps = {
  ...Button.defaultProps
};

OutlineButton.propTypes = propTypes;
OutlineButton.defaultProps = defaultProps;

export default OutlineButton;
