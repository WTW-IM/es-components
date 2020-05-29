import tinycolor from 'tinycolor2';

export function darken(color, percent) {
  return tinycolor(color)
    .darken(percent)
    .toHexString();
}

export function lighten(color, percent) {
  return tinycolor(color)
    .lighten(percent)
    .toHexString();
}

export function getTextColor(
  bgColor,
  darkestColor = 'black',
  lightestColor = 'white'
) {
  return tinycolor.readability(darkestColor, bgColor) > 10
    ? darkestColor
    : lightestColor;
}
