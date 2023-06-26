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
  inherited: ButtonVariant;
};

export interface ButtonStyles<T extends ButtonVariant> {
  variant: ButtonVariants<T>;
  size?: ButtonSizes;
}

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

export default interface ESTheme {
  [key: string]: any;

  colors: {
    [key: string]: string;
  };

  font: {
    [key: string]: string | number | object;
    baseFontSize: CSS.Property.FontSize;
    baseLineHeight: CSS.Property.LineHeight;
    headingDesktop: object;
    headingMobile: object;
  };

  screenSize: {
    [key: string]: CSS.Property.Width;
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
