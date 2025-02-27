import * as CSS from 'csstype';
import { IconName } from './IconNames';

export const buttonSizes = ['lg', 'sm', 'xs', 'default'] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonSizeBlock {
  borderRadius: CSS.Property.BorderRadius;
  fontSize: CSS.Property.FontSize;
  fontWeight?: CSS.Property.FontWeight;
  lineHeight: CSS.Property.LineHeight;
  paddingTop: CSS.Property.PaddingTop;
  paddingSides: CSS.Property.PaddingLeft;
  paddingBottom: CSS.Property.PaddingBottom;
  textTransform?: CSS.Property.TextTransform;
}

export type ButtonSizeBlocks = {
  [key in ButtonSize]: ButtonSizeBlock;
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
  'violet'
] as const;
export type ButtonVariantStyleType = (typeof buttonVariantStyleTypes)[number];

export const validationStyleTypes = [
  'success',
  'info',
  'warning',
  'danger',
  'advisor',
  'default'
] as const;
export type ValidationStyleType = (typeof validationStyleTypes)[number];

export interface ValidationAddOn {
  textColor: CSS.Property.Color;
  backgroundColor: CSS.Property.BackgroundColor;
  borderColor?: CSS.Property.BorderColor;
}

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
  ? { size: ButtonSizeBlocks }
  : { size?: ButtonSizeBlocks });

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

export type ColorName =
  | 'white'
  | 'gray0'
  | 'gray1'
  | 'gray2'
  | 'gray3'
  | 'gray4'
  | 'gray5'
  | 'gray6'
  | 'gray7'
  | 'gray8'
  | 'gray9'
  | 'black'
  | 'blue25'
  | 'blue50'
  | 'blue100'
  | 'blue300'
  | 'blue500'
  | 'blue700'
  | 'blue900'
  | 'green50'
  | 'green100'
  | 'green300'
  | 'green500'
  | 'green700'
  | 'green900'
  | 'magenta50'
  | 'magenta100'
  | 'magenta300'
  | 'magenta500'
  | 'magenta700'
  | 'magenta900'
  | 'violet50'
  | 'violet100'
  | 'violet300'
  | 'violet500'
  | 'violet700'
  | 'violet900'
  | 'yellow50'
  | 'yellow100'
  | 'yellow300'
  | 'yellow500'
  | 'yellow700'
  | 'yellow900'
  | 'primary'
  | 'primaryHover'
  | 'primaryLight'
  | 'success'
  | 'successHover'
  | 'successLight'
  | 'info'
  | 'infoHover'
  | 'infoLight'
  | 'warning'
  | 'warningHover'
  | 'warningLight'
  | 'danger'
  | 'dangerHover'
  | 'dangerLight'
  | 'advisor'
  | 'advisorLight'
  | 'boxShadowLight'
  | 'boxShadowDark'
  | 'inputFocus'
  | 'disabled';

export type Colors = {
  [key in ColorName]: CSS.Property.Color;
};

export const screenSizeNames = [
  'retina',
  'phone',
  'tablet',
  'desktop',
  'widescreen'
] as const;

export type ScreenSizeName = (typeof screenSizeNames)[number];

export type FormStyle = 'default' | 'flat';

export type ValidationInputColor = {
  backgroundColor: CSS.Property.BackgroundColor;
  backgroundColorFlat: CSS.Property.BackgroundColor;
  borderColor: CSS.Property.BorderColor;
  boxShadow: CSS.Property.BoxShadow;
  focusBorderColor: CSS.Property.BorderColor;
  focusBoxShadow: CSS.Property.BoxShadow;
  focusBoxShadowFlat: CSS.Property.BoxShadow;
  addOn: ValidationAddOn;
};

export type DatepickerColors = {
  dpBackground: CSS.Property.BackgroundColor;
  navArrow: CSS.Property.BorderColor;
  navArrowHover: CSS.Property.BorderColor;
  selected: CSS.Property.BackgroundColor;
  hover: CSS.Property.BackgroundColor;
  keyboard: CSS.Property.BackgroundColor;
  inRange: CSS.Property.BackgroundColor;
  highlight: CSS.Property.BackgroundColor;
  highlightHover: CSS.Property.BackgroundColor;
};

export const headingLevel = [1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = (typeof headingLevel)[number];

export type BannerBlock = {
  bgColor: CSS.Property.BackgroundColor;
  textColor: CSS.Property.Color;
};

export type PromptBlock = {
  bgColor: CSS.Property.BackgroundColor;
  bannerBgColor: CSS.Property.BackgroundColor;
  bannerTextColor: CSS.Property.Color;
  textColor: CSS.Property.Color;
  iconColor: CSS.Property.Color;
  iconName: IconName;
};

export const promptStyles = ['readAloud', 'doNotReadAloud'] as const;
export type PromptStyle = (typeof promptStyles)[number];

export default interface ESTheme {
  themeName: string;
  colors: Colors;
  brandColors: {
    primary1: CSS.Property.Color;
    primary2: CSS.Property.Color;
    primary3: CSS.Property.Color;
    secondary1: CSS.Property.Color;
    secondary2: CSS.Property.Color;
  };

  font: {
    [key: string]: string | number | object | undefined;
    baseFontSize: CSS.Property.FontSize;
    baseFontFace: CSS.Property.FontFamily;
    baseLineHeight: CSS.Property.LineHeight;
    headingDesktop: Record<HeadingLevel, string>;
    headingMobile: Record<HeadingLevel, string>;

    labelFontSize?: CSS.Property.FontSize;
    labelFontWeight?: CSS.Property.FontWeight;
  };

  screenSize: {
    [key in ScreenSizeName]: CSS.Property.Width;
  };

  spacing: {
    defaultMargin: CSS.Property.Padding;
  };

  validationIconName: {
    [key in ValidationStyleType]: IconName;
  };

  validationTextColor: {
    [key in ValidationStyleType]: CSS.Property.Color;
  };

  validationInputColor: {
    [key in ValidationStyleType]: ValidationInputColor;
  };

  notificationStyles: NotificationStyles;

  buttonStyles: {
    button: ButtonStyles<BGColorButtonVariant>;
    outlineButton: ButtonStyles<BGColorButtonVariant>;
    linkButton: ButtonStyles<TextColorButtonVariant>;
  };

  inputStyles: {
    borderRadius: CSS.Property.BorderRadius;
    defaultFormStyle: FormStyle;
    dropdownArrow: CSS.Property.BackgroundImage;
    inputHeight: CSS.Property.Height;
    dropdownLineHeight: CSS.Property.LineHeight;
  };

  bannerStyles: {
    [key in ValidationStyleType]: BannerBlock;
  };

  promptStyles: {
    [key in PromptStyle]: PromptBlock;
  };

  datepickerColors: DatepickerColors;
}
