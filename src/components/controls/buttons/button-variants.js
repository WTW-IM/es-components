import tinycolor from 'tinycolor2';

function getBackgroundColor(color, lightenAmount = 5) {
  return tinycolor(color)
    .lighten(lightenAmount)
    .toRgbString();
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

function swapForeground(color) {
  return tinycolor.equals(color, '#000') ? '#fff' : '#000';
}

function getSimpleButtonVariation(color, enforceAccessibility) {
  let bgColor = color;

  // if the color supplied is black, we need to lighten up the button.
  // sticking to black and white text colors for readability.
  if (tinycolor.equals(color, '#000')) {
    bgColor = '#444';
  }

  let textColor = '#fff';
  if (enforceAccessibility && !tinycolor.isReadable(bgColor, textColor)) {
    textColor = swapForeground(textColor);
  }

  return {
    backgroundColor: bgColor,
    hoverBackgroundColor: getHoverBackgroundColor(bgColor),
    borderColor: getBorderColor(bgColor),
    boxShadowColor: getBoxShadowColor(bgColor),
    foregroundColor: textColor
  };
}

function defaultButtonVariants(colors, type, enforceAccessibility) {
  let variant;

  switch (type) {
    case 'primary':
      variant = getSimpleButtonVariation(colors.primary, enforceAccessibility);
      break;
    case 'accent':
      variant = getSimpleButtonVariation(colors.accent, enforceAccessibility);
      break;
    case 'success':
      variant = getSimpleButtonVariation(colors.success, enforceAccessibility);
      break;
    case 'info':
      variant = getSimpleButtonVariation(
        colors.information,
        enforceAccessibility
      );
      break;
    case 'warning':
      variant = getSimpleButtonVariation(colors.warning, enforceAccessibility);
      break;
    case 'danger':
      variant = getSimpleButtonVariation(colors.danger, enforceAccessibility);
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
  const alternateColor = tinycolor(color)
    .lighten(lightenAmount)
    .toRgbString();

  let textColor = color;
  if (tinycolor.readability('#fff', color) < 2) {
    textColor = '#000';
  }

  let hoverColor = hoverForegroundColor;
  if (tinycolor.readability(color, hoverForegroundColor) < 2) {
    hoverColor = '#000';
  }

  return {
    borderColor: alternateColor,
    hoverBackgroundColor: alternateColor,
    hoverForegroundColor: hoverColor,
    foregroundColor: tinycolor(textColor).toRgbString() || alternateColor
  };
}

function alternateButtonVariants(colors, type) {
  let variant;

  switch (type) {
    case 'primary':
      variant = getAlternateColor(colors.primary, 30);
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
      variant = getAlternateColor(colors.warning);
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

const buttonStyleTypes = [
  'default',
  'primary',
  'accent',
  'success',
  'info',
  'warning',
  'danger',
  'link'
];

export { defaultButtonVariants, alternateButtonVariants, buttonStyleTypes };
