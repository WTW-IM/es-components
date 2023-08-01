import React from 'react';
import PropTypes from 'prop-types';
import styled, { DefaultTheme } from 'styled-components';
import tinycolor from 'tinycolor2';
import { useTheme } from '../../util/useTheme';
import { darken, getTextColor } from '../../util/colors';
import ButtonBase, {
  propTypes as buttonBasePropTypes,
  defaultProps as buttonBaseDefaultProps,
  ButtonBaseProps
} from './ButtonBase';
import type * as CSS from 'csstype';
import {
  ButtonVariant,
  ButtonSize,
  ButtonSizeBlock,
  buttonVariantStyleTypes,
  buttonSizes
} from 'es-components-shared-types';

type BorderRadii = {
  [key in
    | 'topLeft'
    | 'topRight'
    | 'bottomRight'
    | 'bottomLeft']: CSS.Property.BorderRadius;
};

const StyledButton = styled(ButtonBase)<{
  colors: ButtonColors;
  borderRadii: BorderRadii;
  mobileBlock: boolean;
  block: boolean;
  buttonSize: ButtonSizeBlock;
}>`
  background-color: ${props => props.colors.bgColor};
  border: 2px solid transparent;
  border-color: ${props => props.colors.bgColor};
  border-bottom-left-radius: ${props => props.borderRadii.bottomLeft};
  border-bottom-right-radius: ${props => props.borderRadii.bottomRight};
  border-top-left-radius: ${props => props.borderRadii.topLeft};
  border-top-right-radius: ${props => props.borderRadii.topRight};
  box-sizing: border-box;
  color: ${props => props.colors.textColor};
  cursor: pointer;
  display: ${props => (props.mobileBlock ? 'block' : 'inline-block')};
  font-family: inherit;
  font-size: ${props => props.buttonSize.fontSize};
  font-weight: ${props => props.buttonSize.fontWeight || 'normal'};
  line-height: ${props =>
    props.buttonSize.lineHeight
      ? props.buttonSize.lineHeight
      : props.theme.font.baseLineHeight};
  min-width: 100px;
  padding-bottom: ${props => props.buttonSize.paddingBottom};
  padding-left: ${props => props.buttonSize.paddingSides};
  padding-right: ${props => props.buttonSize.paddingSides};
  padding-top: ${props => props.buttonSize.paddingTop};
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${props =>
    props.buttonSize.textTransform ? props.buttonSize.textTransform : 'none'};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: ${props => (props.mobileBlock ? '100%' : 'auto')};

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    display: ${props => (props.block ? 'block' : 'inline-block')};
    width: ${props => (props.block ? '100%' : 'auto')};
  }

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      color: ${props => props.colors.hoverTextColor};
      background-color: ${props => props.colors.hoverBgColor};
      border-color: ${props => props.colors.hoverBorderColor};
      text-decoration: none;
    }
  }

  &:focus {
    color: ${props => props.colors.hoverTextColor};
    background-color: ${props => props.colors.hoverBgColor};
    border: 2px solid;
    border-color: ${props => props.colors.hoverBorderColor};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
    outline: none;
  }

  &:active,
  &.pressed {
    color: ${props => props.colors.activeTextColor};
    background-color: ${props => props.colors.activeBgColor};
    border-color: ${props => props.colors.activeBorderColor};
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25);
  }

  &:active:focus,
  &.pressed:focus {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
  }

  &[disabled],
  &[data-waiting] {
    color: ${({ theme }) => theme.colors.gray6};
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.gray3};
    border-color: ${({ theme }) => theme.colors.gray3};

    &:hover,
    &:active &.pressed {
      background-color: ${({ theme }) => theme.colors.gray3};
      border-color: ${({ theme }) => theme.colors.gray3};
      color: ${({ theme }) => theme.colors.gray6};

      &:focus {
        box-shadow: 0 0 0 0.2rem ${props => props.colors.focusBoxShadowColor};
      }
    }

    > * {
      pointer-events: none;
    }
  }
`;

const buttonColorProps = [
  'bgColor',
  'textColor',
  'borderColor',
  'hoverBgColor',
  'focusBoxShadowColor',
  'activeBgColor',
  'activeTextColor',
  'activeBorderColor',
  'hoverTextColor',
  'hoverBorderColor'
] as const;
export type ButtonColorProps = (typeof buttonColorProps)[number];

export type ButtonColors = {
  [key in ButtonColorProps]: CSS.Property.Color;
};

type GuaranteedButtonVariant = Omit<ButtonVariant, 'bgColor'> & {
  bgColor: NonNullable<CSS.Property.BackgroundColor>;
};

function getButtonColors<T extends boolean>(
  theme: DefaultTheme,
  isInheritedStyle: T,
  buttonVariant?: T extends false ? GuaranteedButtonVariant : undefined
): ButtonColors {
  const baseButtonColors: ButtonColors = {
    bgColor: 'inherited',
    textColor: 'inherited',
    borderColor: 'inherited',
    hoverBgColor: 'inherited',
    focusBoxShadowColor: theme.colors.gray4,
    activeBgColor: 'inherited',
    activeTextColor: 'inherited',
    activeBorderColor: 'inherited',
    hoverTextColor: 'inherited',
    hoverBorderColor: 'inherited'
  };

  if (isInheritedStyle) {
    return baseButtonColors;
  }

  const variant = buttonVariant as GuaranteedButtonVariant;

  const focusBoxShadowColor = tinycolor
    .mix(variant.bgColor, theme.colors.black, 14)
    .setAlpha(0.5);

  const calculatedButtonColors: ButtonColors = {
    ...baseButtonColors,
    bgColor: variant.bgColor || baseButtonColors.bgColor,
    textColor: getTextColor(variant.bgColor) as CSS.Property.Color,
    borderColor: variant.bgColor,
    hoverBgColor: darken(variant.bgColor, 7.5),
    hoverBorderColor: darken(variant.bgColor, 9.9),
    focusBoxShadowColor: focusBoxShadowColor.toRgbString()
  };

  calculatedButtonColors.activeBgColor = darken(
    calculatedButtonColors.hoverBgColor,
    2.5
  );
  calculatedButtonColors.activeTextColor = getTextColor(
    calculatedButtonColors.activeBgColor
  ) as CSS.Property.Color;
  calculatedButtonColors.activeBorderColor = darken(
    calculatedButtonColors.hoverBgColor,
    5
  );
  calculatedButtonColors.hoverTextColor = getTextColor(
    calculatedButtonColors.hoverBgColor
  ) as CSS.Property.Color;

  return calculatedButtonColors;
}

export const buttonStyleTypes = [
  ...buttonVariantStyleTypes,
  'inherited'
] as const;
export type ButtonStyleType = (typeof buttonStyleTypes)[number];
export type ButtonProps = ButtonBaseProps & {
  size?: ButtonSize;
  styleType?: ButtonStyleType;
  mobileBlock?: boolean;
  flatLeftEdge?: boolean;
  flatRightEdge?: boolean;
  block?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    styleType = 'default',
    size = 'default',
    block = false,
    mobileBlock = true,
    flatLeftEdge = false,
    flatRightEdge = false,
    ...other
  },
  ref
) {
  const theme = useTheme();
  const buttonSize = theme.buttonStyles.button.size[size];
  const variant = theme.buttonStyles.button.variant[
    styleType
  ] as GuaranteedButtonVariant;
  const isInheritedStyle = styleType === 'inherited';
  const mobileBlockSetting =
    flatLeftEdge || flatRightEdge ? false : mobileBlock;

  const defaultRadius = buttonSize.borderRadius;
  const borderRadii: BorderRadii = {
    topLeft: flatLeftEdge ? 0 : defaultRadius,
    topRight: flatRightEdge ? 0 : defaultRadius,
    bottomRight: flatRightEdge ? 0 : defaultRadius,
    bottomLeft: flatLeftEdge ? 0 : defaultRadius
  };

  const buttonColors = getButtonColors(theme, isInheritedStyle, variant);

  return (
    <StyledButton
      type="button"
      block={block}
      mobileBlock={mobileBlockSetting}
      buttonSize={buttonSize}
      colors={buttonColors}
      ref={ref}
      borderRadii={borderRadii}
      {...other}
    >
      {children}
    </StyledButton>
  );
});

export const propTypes = {
  ...buttonBasePropTypes,
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.button */
  styleType: PropTypes.oneOf<ButtonStyleType>(buttonStyleTypes),
  size: PropTypes.oneOf<ButtonSize>(buttonSizes),
  /** Make the button's width the size of it's parent container */
  block: PropTypes.bool,
  /** Override the default block mobile style */
  mobileBlock: PropTypes.bool,
  /** Styles the Button with a flat left edge */
  flatLeftEdge: PropTypes.bool,
  /** Styles the Button with a flat right edge */
  flatRightEdge: PropTypes.bool
};

export const defaultProps = {
  ...buttonBaseDefaultProps,
  styleType: 'default' as ButtonStyleType,
  block: false,
  mobileBlock: true,
  size: 'default' as ButtonSize,
  flatLeftEdge: false,
  flatRightEdge: false
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
