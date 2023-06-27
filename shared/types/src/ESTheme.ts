import * as CSS from 'csstype';
export { iconNames } from './IconNames';
export type { IconName } from './IconNames';

import { IconName } from './IconNames';

export const buttonSizePropNames = ['lg', 'sm', 'xs', 'default'] as const;
export type ButtonSizePropNames = (typeof buttonSizePropNames)[number];

export interface ButtonSize {
  borderRadius: CSS.Property.BorderRadius;
  fontSize: CSS.Property.FontSize;
  fontWeight?: CSS.Property.FontWeight;
  lineHeight: CSS.Property.LineHeight;
  paddingTop: CSS.Property.PaddingTop;
  paddingSides: CSS.Property.PaddingLeft;
  paddingBottom: CSS.Property.PaddingBottom;
  textTransform?: CSS.Property.TextTransform;
}

export type ButtonSizes = {
  [key in ButtonSizePropNames]: ButtonSize;
};

export const buttonVariantStyleTypes = [
  'primary',
  'default',
  'darkDefault',
  'success',
  'danger',
  'warning',
  'info',
  'information',
  'magenta',
  'violet',
] as const;
export type ButtonVariantStyleType = (typeof buttonVariantStyleTypes)[number];

export const validationStyleTypes = [
  'success',
  'info',
  'warning',
  'danger',
  'advisor',
  'default',
] as const;
export type ValidationStyleType = (typeof validationStyleTypes)[number];

export interface ButtonVariant {
  bgColor?: CSS.Property.BackgroundColor;
  textColor?: CSS.Property.Color;
  hoverBgColor?: CSS.Property.BackgroundColor;
  hoverColor?: CSS.Property.Color;
}

export interface BGColorButtonVariant extends ButtonVariant {
  bgColor: NonNullable<CSS.Property.BackgroundColor>;
}

export interface TextColorButtonVariant extends ButtonVariant {
  textColor: NonNullable<CSS.Property.BackgroundColor>;
}

export type ButtonVariants<T extends ButtonVariant> = {
  [key in ButtonVariantStyleType]: T;
} & {
  inherited: T;
};

export type ButtonStyles<T extends ButtonVariant> = {
  variant: ButtonVariants<T>;
} & (T extends BGColorButtonVariant
  ? { size: ButtonSizes }
  : { size?: ButtonSizes });

export interface NotificationStyleBlock {
  bgColor: CSS.Property.BackgroundColor;
  textColor: CSS.Property.Color;
  borderColor?: CSS.Property.BorderColor;
  borderStyle?: CSS.Property.BorderStyle;
  borderWidth?: CSS.Property.BorderWidth;
}

export const notificationStyleTypes = ['base', 'light', 'messageOnly'] as const;
export type NotificationStyleType = (typeof notificationStyleTypes)[number];

export type NotificationStyle = {
  [key in NotificationStyleType]: NotificationStyleBlock;
};

export type NotificationStyles = {
  [key in ValidationStyleType]: NotificationStyle;
};

const colorNames = [
  'white',
  'gray0',
  'gray1',
  'gray2',
  'gray3',
  'gray4',
  'gray5',
  'gray6',
  'gray7',
  'gray8',
  'gray9',
  'black',
  'blue25',
  'blue50',
  'blue100',
  'blue300',
  'blue500',
  'blue700',
  'blue900',
  'green50',
  'green100',
  'green300',
  'green500',
  'green700',
  'green900',
  'magenta50',
  'magenta100',
  'magenta300',
  'magenta500',
  'magenta700',
  'magenta900',
  'violet50',
  'violet100',
  'violet300',
  'violet500',
  'violet700',
  'violet900',
  'yellow50',
  'yellow100',
  'yellow300',
  'yellow500',
  'yellow700',
  'yellow900',
  'primary',
  'primaryHover',
  'primaryLight',
  'success',
  'successHover',
  'successLight',
  'info',
  'infoHover',
  'infoLight',
  'warning',
  'warningHover',
  'warningLight',
  'danger',
  'dangerHover',
  'dangerLight',
  'advisor',
  'advisorLight',
  'boxShadowLight',
  'boxShadowDark',
  'inputFocus',
] as const;

export type ColorName = (typeof colorNames)[number];

export type Colors = {
  [key in ColorName]: CSS.Property.Color;
};

export const screenSizeNames = [
  'retina',
  'phone',
  'tablet',
  'desktop',
  'widescreen',
] as const;

export type ScreenSizeName = (typeof screenSizeNames)[number];

export default interface ESTheme {
  [key: string]: any;

  colors: Colors;

  font: {
    [key: string]: string | number | object | undefined;
    baseFontSize: CSS.Property.FontSize;
    baseLineHeight: CSS.Property.LineHeight;
    headingDesktop: object;
    headingMobile: object;

    labelFontSize?: CSS.Property.FontSize;
    labelFontWeight?: CSS.Property.FontWeight;
  };

  screenSize: {
    [key in ScreenSizeName]: CSS.Property.Width;
  };

  validationIconName: {
    [key in ValidationStyleType]: IconName;
  };
  notificationStyles: NotificationStyles;

  buttonStyles: {
    button: ButtonStyles<BGColorButtonVariant>;
    outlineButton: ButtonStyles<BGColorButtonVariant>;
    linkButton: ButtonStyles<TextColorButtonVariant>;
  };
}
