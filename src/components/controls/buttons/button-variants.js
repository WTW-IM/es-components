import tinycolor from 'tinycolor2';

function getBackgroundColor(color, lightenAmount = 5) {
  return tinycolor(color).lighten(lightenAmount);
}

function getHoverBackgroundColor(color, darkenAmount = 10) {
  return tinycolor(color)
    .darken(darkenAmount)
    .toRgbString();
}

function getBorderColor(color, darkenAmount = 5) {
  return tinycolor(color)
    .darken(darkenAmount)
    .toRgbString();
}

function getBoxShadowColor(color, darkenAmount = 10) {
  return tinycolor(color)
    .darken(darkenAmount)
    .toRgbString();
}

function getSimpleButtonVariation(color, foregroundColor = '#fff') {
  return {
    backgroundColor: getBackgroundColor(color),
    hoverBackgroundColor: getHoverBackgroundColor(color),
    borderColor: getBorderColor(color),
    boxShadowColor: getBoxShadowColor(color),
    foregroundColor
  };
}

function defaultButtonVariants(colors, type) {
  let variant;

  switch (type) {
    case 'primary':
      variant = {
        backgroundColor: getBackgroundColor(colors.black, 30),
        hoverBackgroundColor: getHoverBackgroundColor(
          getBackgroundColor(colors.black, 30)
        ),
        borderColor: getBorderColor(getBackgroundColor(colors.black, 30), 20),
        boxShadowColor: getBoxShadowColor(getBackgroundColor(colors.black, 30)),
        foregroundColor: colors.white
      };
      break;
    case 'accent':
      variant = getSimpleButtonVariation(colors.accent);
      break;
    case 'success':
      variant = getSimpleButtonVariation(colors.success);
      break;
    case 'info':
      variant = getSimpleButtonVariation(colors.information);
      break;
    case 'warning':
      variant = getSimpleButtonVariation(colors.warning, colors.grayDarkest);
      break;
    case 'danger':
      variant = getSimpleButtonVariation(colors.danger);
      break;
    default:
      variant = {
        backgroundColor: getBackgroundColor(colors.grayLight, 0),
        hoverBackgroundColor: getHoverBackgroundColor(colors.grayLight),
        borderColor: getBorderColor(colors.grayLight, 0),
        boxShadowColor: getBoxShadowColor(colors.grayLight),
        foregroundColor: colors.grayDarkest
      };
  }

  return variant;
}

function getAlternateColor(
  color,
  foregroundColor = color,
  hoverForegroundColor = '#fff',
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

function alternateButtonVariants(colors, type) {
  let variant;

  switch (type) {
    case 'primary':
      variant = getAlternateColor(colors.black, 30);
      break;
    case 'accent':
      variant = getAlternateColor(colors.accent);
      break;
    case 'success':
      variant = getAlternateColor(colors.success);
      break;
    case 'info':
      variant = getAlternateColor(colors.information);
      break;
    case 'warning':
      variant = getAlternateColor(
        colors.warning,
        colors.grayDarkest,
        colors.grayDarkest
      );
      break;
    case 'danger':
      variant = getAlternateColor(colors.danger);
      break;
    default:
      variant = getAlternateColor(
        colors.grayLight,
        colors.grayDarkest,
        colors.grayDarkest,
        0
      );
  }

  return variant;
}

export { defaultButtonVariants, alternateButtonVariants };
