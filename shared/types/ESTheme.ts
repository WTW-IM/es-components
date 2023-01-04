import * as CSS from "csstype";

export const buttonSizePropNames = ["lg", "sm", "xs", "default"] as const;
export type ButtonSizePropNames = typeof buttonSizePropNames[number];

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
  "primary",
  "default",
  "darkDefault",
  "success",
  "danger",
  "warning",
  "info",
  "information",
  "magenta",
  "violet",
] as const;
export type ButtonVariantStyleType = typeof buttonVariantStyleTypes[number];

export interface ButtonVariant {
  bgColor?: CSS.Property.BackgroundColor;
  textColor?: CSS.Property.Color;
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

export default interface ESTheme {
  buttonStyles: {
    button: ButtonStyles<BGColorButtonVariant>;
    outlineButton: ButtonStyles<BGColorButtonVariant>;
    linkButton: ButtonStyles<TextColorButtonVariant>;
  };
}