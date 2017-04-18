import tinycolor from 'tinycolor2';

export function getBackgroundColor(color, lightenAmount, desaturationAmount = 45) {
  return tinycolor(color)
    .desaturate(desaturationAmount)
    .lighten(lightenAmount)
    .toRgbString();
}

export const colors = {
  white: '#fff',
  red: '#af140c',
  black: '#000',
  grayDarkest: '#444',
  grayDarker: '#666',
  grayDark: '#888',
  gray: '#aaa',
  grayLight: '#ddd',
  grayLighter: '#eee',
  success: '#060',
  accent: '#5a0c6f',
  information: '#1b6284',
  warning: '#ebaf00',
  danger: '#af140c',
  advisor: '#ff6310'
};

export const backgroundColors = {
  success: getBackgroundColor(colors.success, 75, 50),
  information: getBackgroundColor(colors.information, 60),
  primary: getBackgroundColor(colors.black, 45, 45),
  warning: getBackgroundColor(colors.warning, 45),
  danger: getBackgroundColor(colors.danger, 55),
  advisor: getBackgroundColor(colors.advisor, 37)
};

export const sizes = {
  baseFontSize: 18,
  baseLightHeight: 24
};
