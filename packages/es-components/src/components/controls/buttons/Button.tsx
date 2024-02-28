import React from 'react';
import PropTypes from 'prop-types';
import styled, { DefaultTheme, css } from 'styled-components';
import tinycolor from 'tinycolor2';
import { useTheme } from '../../util/useTheme';
import { darken, getTextColor } from '../../util/colors';
import ButtonBase, {
  propTypes as buttonBasePropTypes,
  defaultProps as buttonBaseDefaultProps,
  ButtonBaseProps,
  UnstyledButton,
  esComponentsButtonClass
} from './ButtonBase';
import type * as CSS from 'csstype';
import {
  ButtonVariant,
  ButtonSize,
  ButtonSizeBlock,
  buttonVariantStyleTypes,
  buttonSizes
} from 'es-components-shared-types';
import { PanelButton } from '../../containers/drawer/DrawerPanel';
import { ScrollIconBaseComponent } from '../../containers/horizontalScrollWrapper/HorizontalScrollWrapper';
import { BasicProgressButton } from '../../patterns/progress-tracker/progress-tracker-subcomponents';

type BorderRadii = {
  [key in
    | 'topLeft'
    | 'topRight'
    | 'bottomRight'
    | 'bottomLeft']: CSS.Property.BorderRadius;
};

type ButtonStyleProps = {
  colors: ButtonColors;
  borderRadii: BorderRadii;
  mobileBlock: boolean;
  block: boolean;
  buttonSize: ButtonSizeBlock;
};

type ButtonStyleCssProps = {
  theme: DefaultTheme;
} & Omit<ButtonStyleProps, 'mobileBlock' | 'block'>;

const getButtonCss = ({
  theme,
  colors,
  borderRadii,
  buttonSize
}: ButtonStyleCssProps) => css`
  background-color: ${colors.bgColor};
  border: 2px solid transparent;
  border-color: ${colors.bgColor};
  border-bottom-left-radius: ${borderRadii.bottomLeft};
  border-bottom-right-radius: ${borderRadii.bottomRight};
  border-top-left-radius: ${borderRadii.topLeft};
  border-top-right-radius: ${borderRadii.topRight};
  box-sizing: border-box;
  color: ${colors.textColor};
  cursor: pointer;
  font-family: inherit;
  font-size: ${buttonSize.fontSize};
  font-weight: ${buttonSize.fontWeight || 'normal'};
  line-height: ${buttonSize.lineHeight
    ? buttonSize.lineHeight
    : theme.font.baseLineHeight};
  padding-bottom: ${buttonSize.paddingBottom};
  padding-left: ${buttonSize.paddingSides};
  padding-right: ${buttonSize.paddingSides};
  padding-top: ${buttonSize.paddingTop};
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${buttonSize.textTransform
    ? buttonSize.textTransform
    : 'none'};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      color: ${colors.hoverTextColor};
      background-color: ${colors.hoverBgColor};
      border-color: ${colors.hoverBorderColor};
      text-decoration: none;
    }
  }

  &:focus {
    color: ${colors.hoverTextColor};
    background-color: ${colors.hoverBgColor};
    border: 2px solid;
    border-color: ${colors.hoverBorderColor};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 0.2rem ${colors.focusBoxShadowColor};
    outline: none;
  }

  &:active,
  &.pressed {
    color: ${colors.activeTextColor};
    background-color: ${colors.activeBgColor};
    border-color: ${colors.activeBorderColor};
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25);
  }

  &:active:focus,
  &.pressed:focus {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.25),
      0 0 0 0.2rem ${colors.focusBoxShadowColor};
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
        box-shadow: 0 0 0 0.2rem ${colors.focusBoxShadowColor};
      }
    }

    > * {
      pointer-events: none;
    }
  }
`;

const StyledButton = styled(ButtonBase)<ButtonStyleProps>`
  ${getButtonCss}
  min-width: 100px;
  display: ${({ mobileBlock }) => (mobileBlock ? 'block' : 'inline-block')};
  width: ${({ mobileBlock }) => (mobileBlock ? '100%' : 'auto')};

  @media (min-width: ${({ theme }) => theme.screenSize.tablet}) {
    display: ${({ block }) => (block ? 'block' : 'inline-block')};
    width: ${({ block }) => (block ? '100%' : 'auto')};
  }
`;

const getBorderRadii = (buttonSize: ButtonSizeBlock): BorderRadii => ({
  topLeft: buttonSize.borderRadius,
  topRight: buttonSize.borderRadius,
  bottomRight: buttonSize.borderRadius,
  bottomLeft: buttonSize.borderRadius
});

const onlyHasOldButtons = () =>
  [...document.querySelectorAll('button')].every(
    button => !button.classList.contains(esComponentsButtonClass)
  );

export const globalButtonCss = css`
  ${!onlyHasOldButtons() &&
  css`
    form
      button:not(
        .react-datepicker__navigation,
        [name^='rsg'],
        [class^='rsg'],
        ${PanelButton},
          ${ScrollIconBaseComponent},
          ${StyledButton},
          ${BasicProgressButton},
          ${UnstyledButton},
          .${esComponentsButtonClass}
      ) {
      ${({ theme }) =>
        getButtonCss({
          theme,
          colors: getButtonColors(theme, false, 'default'),
          borderRadii: getBorderRadii(theme.buttonStyles.button.size.default),
          buttonSize: theme.buttonStyles.button.size.default
        })}
      ${({ theme }) =>
        buttonVariantStyleTypes.map(style =>
          buttonSizes.map(size => {
            const buttonSize = theme.buttonStyles.button.size[size];
            const buttonColors = getButtonColors(theme, false, style);
            const borderRadii = getBorderRadii(buttonSize);
            return css`
              &.${[style, size].join('.')} {
                ${getButtonCss({
                  theme,
                  colors: buttonColors,
                  borderRadii,
                  buttonSize
                })}
              }
            `;
          })
        )}
    }
  `}
`;

export const buttonStyleTypes = [
  ...buttonVariantStyleTypes,
  'inherited'
] as const;
export type ButtonStyleType = (typeof buttonStyleTypes)[number];

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

function getButtonVariant(
  theme: DefaultTheme,
  buttonVariant: ButtonStyleType
): GuaranteedButtonVariant {
  const variant = theme.buttonStyles.button.variant[buttonVariant] || {};
  variant.bgColor = variant.bgColor || theme.colors.gray4;
  return variant;
}

function getButtonColors<T extends boolean>(
  theme: DefaultTheme,
  isInheritedStyle: T,
  buttonVariant: ButtonStyleType = 'default'
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

  const variant = getButtonVariant(theme, buttonVariant);

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

  const buttonColors = getButtonColors(theme, isInheritedStyle, styleType);

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

export const propTypes: PropTypesOf<ButtonProps> = {
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
