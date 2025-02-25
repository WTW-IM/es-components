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

interface StyledButtonProps {
  $colors: OutlineButtonColors;
  $buttonSize: ButtonSizeBlock;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  overflow: hidden;
  border: 2px solid ${props => props.$colors.textColor};
  background-color: ${props => props.$colors.bgColor};
  color: ${props => props.$colors.textColor};

  &:focus {
    box-shadow: 0 0 0 0.2rem ${props => props.$colors.focusBoxShadowColor};
    outline: none;
  }

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      border-color: ${props => props.$colors.hoverBorderColor};
      background-color: ${props => props.$colors.hoverBgColor};
      color: ${props => props.$colors.hoverTextColor};
    }
  }

  &:active,
  &.pressed {
    background-color: ${props => props.$colors.textColor};
    color: ${props => props.$colors.hoverTextColor};
  }

  &.pressed {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25);
  }

  &:active:focus,
  &.pressed:focus {
    box-shadow:
      inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem ${props => props.$colors.focusBoxShadowColor};
  }

  &[disabled],
  &[data-waiting],
  &[data-waiting]:active,
  &[data-waiting].pressed,
  &[data-waiting].pressed {
    border-color: #e6e6e6;
    background-color: #e6e6e6;
    color: #ccc;
    cursor: not-allowed;

    &:hover,
    &:active,
    &.pressed {
      border-color: #e6e6e6;
      background-color: #e6e6e6;
      color: #ccc;

      &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.$colors.focusBoxShadowColor};
      }
    }

    > * {
      pointer-events: none;
    }
  }
`;

type OutlineButtonProps = ButtonProps & {
  as?: string | React.ComponentType<unknown>;
};

const OutlineButton = React.forwardRef<HTMLButtonElement, OutlineButtonProps>(
  function OutlineButton(props, ref) {
    const {
      children,
      styleType = 'default',
      size = 'default',
      as,
      ...other
    } = props;
    const theme = useTheme()!;
    const buttonSize = theme?.buttonStyles.outlineButton.size[size];
    const variant = theme?.buttonStyles.outlineButton.variant[styleType];
    const isInheritedStyle = styleType === 'inherited';

    let buttonColors: OutlineButtonColors = {
      textColor: 'inherited',
      bgColor: 'inherited',
      hoverTextColor: 'inherited',
      hoverBgColor: 'inherited',
      hoverBorderColor: 'inherited',
      focusBoxShadowColor: theme?.colors.gray4
    };

    if (!isInheritedStyle) {
      const focusBoxShadowColor = tinycolor.mix(
        variant?.bgColor as ColorInput,
        theme?.colors.black,
        14
      );
      focusBoxShadowColor.setAlpha(0.5);

      buttonColors = {
        textColor: variant?.bgColor as CSS.Property.Color,
        bgColor: theme?.colors.white,
        hoverTextColor: variant?.hoverColor || theme?.colors.white,
        hoverBgColor: variant?.hoverBgColor || variant?.bgColor,
        hoverBorderColor: variant?.hoverColor || variant?.bgColor,
        focusBoxShadowColor: focusBoxShadowColor.toRgbString()
      };
    }

    return (
      <StyledButton
        forwardedAs={as}
        ref={ref}
        $buttonSize={buttonSize}
        $colors={buttonColors}
        {...other}
      >
        {children}
      </StyledButton>
    );
  }
);

export const propTypes = {
  ...Button.propTypes,
  /** Select the color style of the button, types come from theme buttonStyles.outlineButton */
  styleType: Button.propTypes!.styleType
};

OutlineButton.propTypes = propTypes;

export default OutlineButton;
