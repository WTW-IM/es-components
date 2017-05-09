import tinycolor from 'tinycolor2';

import { colors } from '../../theme';

function getBackgroundColor(color, lightenAmount = 5) {
  return tinycolor(color).lighten(lightenAmount);
}

function getHoverBackgroundColor(color, darkenAmount = 10) {
  return tinycolor(color).darken(darkenAmount).toRgbString();
}

function getBorderColor(color, darkenAmount = 5) {
  return tinycolor(color).darken(darkenAmount).toRgbString();
}

function getBoxShadowColor(color, darkenAmount = 10) {
  return tinycolor(color).darken(darkenAmount).toRgbString();
}

function getSimpleButtonVariation(color, foregroundColor = colors.white) {
  return {
    backgroundColor: getBackgroundColor(color),
    hoverBackgroundColor: getHoverBackgroundColor(color),
    borderColor: getBorderColor(color),
    boxShadowColor: getBoxShadowColor(color),
    foregroundColor
  };
}

const defaultButtonVariants = {
  default: {
    backgroundColor: getBackgroundColor(colors.grayLight, 0),
    hoverBackgroundColor: getHoverBackgroundColor(colors.grayLight),
    borderColor: getBorderColor(colors.grayLight, 0),
    boxShadowColor: getBoxShadowColor(colors.grayLight),
    foregroundColor: colors.grayDarkest
  },
  primary: {
    backgroundColor: getBackgroundColor(colors.black, 30),
    hoverBackgroundColor: getHoverBackgroundColor(
      getBackgroundColor(colors.black, 30)
    ),
    borderColor: getBorderColor(getBackgroundColor(colors.black, 30), 20),
    boxShadowColor: getBoxShadowColor(getBackgroundColor(colors.black, 30)),
    foregroundColor: colors.white
  },
  accent: getSimpleButtonVariation(colors.accent),
  success: getSimpleButtonVariation(colors.success),
  info: getSimpleButtonVariation(colors.information),
  warning: getSimpleButtonVariation(colors.warning, colors.grayDarkest),
  danger: getSimpleButtonVariation(colors.danger)
};

function getAlternateColor(
  color,
  foregroundColor = color,
  hoverForegroundColor = colors.white,
  lightenAmount = 5
) {
  const alternateColor = tinycolor(color).lighten(lightenAmount);
  return {
    borderColor: alternateColor,
    hoverBackgroundColor: alternateColor,
    hoverForegroundColor,
    foregroundColor: tinycolor(foregroundColor) || alternateColor
  };
}

const alternateButtonVariants = {
  default: getAlternateColor(
    colors.grayLight,
    colors.grayDarkest,
    colors.grayDarkest,
    0
  ),
  primary: getAlternateColor(colors.black, 30),
  accent: getAlternateColor(colors.accent),
  success: getAlternateColor(colors.success),
  info: getAlternateColor(colors.information),
  warning: getAlternateColor(
    colors.warning,
    colors.grayDarkest,
    colors.grayDarkest
  ),
  danger: getAlternateColor(colors.danger)
};

export { defaultButtonVariants, alternateButtonVariants };
