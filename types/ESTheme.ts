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

export const buttonVariantPropNames = [
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
  "inherited",
] as const;
export type ButtonVariantPropNames = typeof buttonVariantPropNames[number];

export interface ButtonVariant {
  bgColor?: CSS.Property.BackgroundColor;
  textColor?: CSS.Property.Color;
}

export type ButtonVariants = {
  [key in ButtonVariantPropNames]: ButtonVariant;
};

export interface ButtonStyles {
  variant: ButtonVariants;
  size?: ButtonSizes;
}

export default interface ESTheme {
  buttonStyles: {
    button: ButtonStyles;
    outlineButton: ButtonStyles;
    linkButton: ButtonStyles;
  };
}
