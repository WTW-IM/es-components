import tinycolor from 'tinycolor2';

function getBackgroundColor(color, lightenAmount, desaturationAmount = 45) {
  return tinycolor(color)
    .desaturate(desaturationAmount)
    .lighten(lightenAmount)
    .toRgbString();
}

const white = '#fff';
const black = '#000';
const gray = '#aaa';

const grayDarkest = tinycolor(gray)
  .darken(40)
  .toString();
const grayDarker = tinycolor(gray)
  .darken(27)
  .toString();
const grayDark = tinycolor(gray)
  .darken(20)
  .toString();
const grayLight = tinycolor(gray)
  .lighten(20)
  .toString();
const grayLighter = tinycolor(gray)
  .lighten(27)
  .toString();
const grayLightest = tinycolor(gray)
  .lighten(29)
  .toString();

const accent = '#5a0c6f';
const information = '#1b6284';
const advisor = '#ff6310';
const success = '#060';
const warning = '#ebaf00';
const danger = '#af140c';

const inputDefaultBorder = '#ccc';
const inputDefaultFocus = '#66afe9';

const boxShadow = 'rgba(0, 0, 0, 0.075)';
const inputDefaultBoxShadow = 'rgba(102, 175, 233, 0.6)';
const inputSuccessBoxShadow = '#00cc00';
const inputDangerBoxShadow = '#f13a30';

const bgSuccess = getBackgroundColor(success, 75, 50);
const bgInformation = getBackgroundColor(information, 60);
// const bgPrimary = getBackgroundColor(black, 45, 45);
const bgWarning = getBackgroundColor(warning, 45);
const bgDanger = getBackgroundColor(danger, 55);
const bgAdvisor = getBackgroundColor(advisor, 37);

// Datepicker colors, TODO: should deprecate most of this and use above scheme
const navArrow = gray;
const navArrowHover = grayDark;

const selected = '#216ba5';
const hover = '#1d5d90';
const keyboard = '#2a87d0';
const inRange = 'rgba(33, 107, 165, 0.5)';

const highlight = '#3dcc4a';
const highlightHover = '#32be3f';

const portalBackground = 'rgba(0, 0, 0, 0.8)';

const theme = {
  colors: {
    white,
    black,
    grayDarkest,
    grayDarker,
    grayDark,
    gray,
    grayLight,
    grayLighter,
    grayLightest,
    success,
    accent,
    information,
    warning,
    danger,
    advisor,
    boxShadow
  },
  inputColors: {
    inputDefaultBorder,
    inputDefaultFocus,
    inputDefaultBoxShadow,
    inputSuccessBoxShadow
  },
  validationIconName: {
    success: 'ok',
    warning: 'warning-sign',
    danger: 'remove'
  },
  validationTextColor: {
    success,
    warning: grayDarkest,
    danger
  },
  validationInputColor: {
    success: {
      borderColor: success,
      boxShadow: `inset 0 0 5px ${success}`,
      focusBorderColor: success,
      focusBoxShadow: `0 0 6px ${inputSuccessBoxShadow}`
    },
    warning: {
      borderColor: warning,
      boxShadow: `inset 0 0 5px ${warning}`,
      focusBorderColor: warning,
      focusBoxShadow: `0 0 6px ${warning}`
    },
    danger: {
      borderColor: danger,
      boxShadow: `inset 0 0 5px ${danger}`,
      focusBorderColor: danger,
      focusBoxShadow: `0 0 6px ${inputDangerBoxShadow}`
    },
    default: {
      borderColor: inputDefaultBorder,
      boxShadow: `inset 0 1px 1px ${boxShadow}`,
      focusBorderColor: inputDefaultFocus,
      focusBoxShadow: `0 0 8px ${inputDefaultBoxShadow}`
    }
  },
  sizes: {
    baseFontSize: 18,
    baseLineHeight: 24
  },
  screenSize: {
    retina: '320px',
    phone: '480px',
    tablet: '768px',
    desktop: '992px',
    widescreen: '1200px'
  },
  notification: {
    success: {
      color: bgSuccess,
      borderColor: success,
      foregroundColor: success
    },
    information: {
      color: bgInformation,
      borderColor: information,
      foregroundColor: information
    },
    warning: {
      color: bgWarning,
      borderColor: warning,
      foregroundColor: grayDarkest
    },
    danger: {
      color: bgDanger,
      borderColor: danger,
      foregroundColor: danger
    },
    advisor: {
      color: bgAdvisor,
      borderColor: advisor,
      foregroundColor: grayDarkest
    }
  },
  datepickerColors: {
    navArrow,
    navArrowHover,
    selected,
    hover,
    keyboard,
    inRange,
    highlight,
    highlightHover,
    boxShadow,
    portalBackground
  }
};

export default theme;
