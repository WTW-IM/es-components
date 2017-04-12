import tinycolor from 'tinycolor2';

import { colors } from '../../theme';

function getBackgroundColor(color, lightenAmount, desaturationAmount = 45) {
  return tinycolor(color)
    .desaturate(desaturationAmount)
    .lighten(lightenAmount)
    .toRgbString();
}

export const alertVariations = {
  success: {
    color: getBackgroundColor(colors.success, 75, 50),
    foregroundColor: colors.success
  },
  information: {
    color: getBackgroundColor(colors.information, 60),
    foregroundColor: colors.information
  },
  warning: {
    color: getBackgroundColor(colors.warning, 45),
    foregroundColor: colors.grayDarkest
  },
  danger: {
    color: getBackgroundColor(colors.danger, 55),
    foregroundColor: colors.danger
  },
  advisor: {
    color: getBackgroundColor(colors.advisor, 37),
    foregroundColor: colors.grayDarkest
  }
};
