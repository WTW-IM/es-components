import { RequireAtLeastOne } from './generics';

export interface Colors {
  white: string;
  gray0: string;
  gray1: string;
  gray2: string;
  gray3: string;
  gray4: string;
  gray5: string;
  gray6: string;
  gray7: string;
  gray8: string;
  gray9: string;
  black: string;
  blue25: string;
  blue50: string;
  blue100: string;
  blue300: string;
  blue500: string;
  blue700: string;
  blue900: string;
  green50: string;
  green100: string;
  green300: string;
  green500: string;
  green700: string;
  green900: string;
  magenta50: string;
  magenta100: string;
  magenta300: string;
  magenta500: string;
  magenta700: string;
  magenta900: string;
  violet50: string;
  violet100: string;
  violet300: string;
  violet500: string;
  violet700: string;
  violet900: string;
  yellow50: string;
  yellow100: string;
  yellow300: string;
  yellow500: string;
  yellow700: string;
  yellow900: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  success: string;
  successHover: string;
  successLight: string;
  info: string;
  infoHover: string;
  infoLight: string;
  warning: string;
  warningHover: string;
  warningLight: string;
  danger: string;
  dangerHover: string;
  dangerLight: string;
  advisor: string;
  advisorLight: string;
  boxShadowLight: string;
  boxShadowDark: string;
  inputFocus: string;
}

export interface Spacing {
  defaultMargin: string;
}

export interface BrandColors {
  primary1: string;
  primary2: string;
  primary3: string;
  secondary1: string;
  secondary2: string;
}

export interface DatepickerColors {
  dpBackground: string;
  navArrow: string;
  navArrowHover: string;
  selected: string;
  hover: string;
  keyboard: string;
  inRange: string;
  highlight: string;
  highlightHover: string;
}

export interface PromptStyle {
  bgColor: string;
  bannerBgColor: string;
  bannerTextColor: string;
  textColor: string;
  iconColor: string;
  iconName: string;
}

export interface PromptStyles {
  readAloud: PromptStyle;
  doNotReadAloud: PromptStyle;
}

export interface NotificationTextAndBg {
  bgColor: string;
  textColor: string;
}

export interface NotificationStyle {
  base: NotificationTextAndBg;
  light: NotificationTextAndBg;
  messageOnly: NotificationTextAndBg;
}

export interface NotificationStyles {
  success: NotificationStyle;
  info: NotificationStyle;
  warning: NotificationStyle;
  danger: NotificationStyle;
  advisor: NotificationStyle;
}

export interface ButtonVariant {
  bgColor?: string;
  textColor?: string;
}

export interface ButtonSize {
  borderRadius: string;
  fontSize: string;
  fontWeight?: string;
  lineHeight: string;
  paddingTop: string;
  paddingSides: string;
  paddingBottom: string;
  textTransform?: string;
}

export interface ButtonVariants<K extends keyof ButtonVariant> {
  primary: RequireAtLeastOne<ButtonVariant, K>;
  default: RequireAtLeastOne<ButtonVariant, K>;
  darkDefault?: RequireAtLeastOne<ButtonVariant, K>;
  success: RequireAtLeastOne<ButtonVariant, K>;
  info?: RequireAtLeastOne<ButtonVariant, K>;
  warning: RequireAtLeastOne<ButtonVariant, K>;
  danger: RequireAtLeastOne<ButtonVariant, K>;
  magenta?: RequireAtLeastOne<ButtonVariant, K>;
  violet?: RequireAtLeastOne<ButtonVariant, K>;
  information?: RequireAtLeastOne<ButtonVariant, K>;
  inherited: {}
}

export interface ButtonSizes {
  lg: ButtonSize;
  default: ButtonSize;
  sm: ButtonSize;
  xs: ButtonSize;
}

export interface ButtonStyle<K extends keyof ButtonVariant> {
  variant: ButtonVariants<K>,
  size: ButtonSizes;
}

export interface ButtonStyles {
  button: ButtonStyle<'bgColor'>;
  outlineButton: ButtonStyle<'bgColor'>;
  linkButton: { variant: ButtonVariants<'textColor'>; };
}

export interface ValidationIconNames {
  success: string;
  info: string;
  warning: string;
  danger: string;
  advisor: string;
}

export interface ValidationTextColor {
  success: string;
  warning: string;
  danger: string;
}

export interface ValidationInputColor {
  borderColor: string;
  boxShadow: string;
  focusBorderColor: string;
  focusBoxShadow: string;
}

export interface ValidationInputColors {
  success: ValidationInputColor;
  warning: ValidationInputColor;
  danger: ValidationInputColor;
  default: ValidationInputColor;
}

export interface Heading {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}

export interface Font {
  baseFontSize: string;
  baseLineHeight: number;
  baseFontFace?: string;
  headingDesktop: Heading;
  headingMobile: Heading;
}

export interface ScreenSize {
  retina: string;
  phone: string;
  tablet: string;
  desktop: string;
  widescreen: string;
}

export interface Theme {
  colors: Colors;
  spacing?: Spacing;
  brandColors: BrandColors;
  datepickerColors: DatepickerColors;
  promptStyles: PromptStyles;
  notificationStyles: NotificationStyles;
  buttonStyles: ButtonStyles;
  validationIconName: ValidationIconNames;
  validationTextColor: ValidationTextColor;
  validationInputColor: ValidationInputColors;
  font: Font;
  screenSize: ScreenSize;
}
