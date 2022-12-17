import tinycolor, { ColorInput } from 'tinycolor2';

export function darken(color: ColorInput, percent: number) {
  return tinycolor(color).darken(percent).toHexString();
}

export function lighten(color: ColorInput, percent: number) {
  return tinycolor(color).lighten(percent).toHexString();
}

export function getTextColor(
  bgColor: ColorInput,
  darkestColor: ColorInput = 'black',
  lightestColor: ColorInput = 'white'
) {
  return tinycolor.readability(darkestColor, bgColor) > 10
    ? darkestColor
    : lightestColor;
}
