import tinycolor from 'tinycolor2';

const white = '#fff';
const gray1 = '#f4f4f4';
const gray2 = '#ecedee';
const gray3 = '#e4e4e4';
const gray4 = '#d8d8d8';
const gray5 = '#c5c5c5';
const gray6 = '#979797';
// const gray7 = '#707070';
const gray8 = '#585858';
const gray9 = '#444';
const black = '#000';

const grayLightest = gray1;
const grayLighter = gray2;
const grayLight = gray3;
const gray = gray5;
const grayDark = gray6;
const grayDarker = gray8;
const grayDarkest = gray9;

const dflt = '#d8d8d8';
const primary = '#007fa7';
const info = '#069';
const success = '#298544';
const warning = '#b35f00';
const danger = '#c00';

const boxShadowLight = 'rgba(0, 0, 0, 0.075)';
const boxShadowDark = 'rgba(0, 0, 0, 0.5)';

const inputBorder = gray4;
const inputFocus = '#83bffc';
const inputBoxShadow = 'rgba(102, 175, 233, 0.6)';

// Datepicker colors
const navArrow = gray;
const navArrowHover = grayDark;
const selected = '#216ba5';
const hover = '#1d5d90';
const keyboard = '#2a87d0';
const inRange = 'rgba(33, 107, 165, 0.5)';
const highlight = '#3dcc4a';
const highlightHover = '#32be3f';

const theme = {
  colors: {
    black,
    grayDarkest,
    grayDarker,
    grayDark,
    gray,
    grayLight,
    grayLighter,
    grayLightest,
    white,
    primary,
    success,
    info,
    warning,
    danger,
    boxShadowLight,
    boxShadowDark,
    inputFocus
  },
  datepickerColors: {
    navArrow,
    navArrowHover,
    selected,
    hover,
    keyboard,
    inRange,
    highlight,
    highlightHover
  },
  buttonStyles: {
    buttonsNormal: {
      default: {
        bgColor: dflt,
        textColor: black,
        hoverBgColor: '#BFBFBF',
        hoverTextColor: black,
        activeBgColor: '#BFBFBF',
        activeTextColor: black,
        boxShadowColor: '#BFBFBF'
      },
      primary: {
        bgColor: primary,
        textColor: white,
        hoverBgColor: '#005874',
        hoverTextColor: white,
        activeBgColor: '#005874',
        activeTextColor: white,
        boxShadowColor: '#005874'
      },
      success: {
        bgColor: success,
        textColor: white,
        hoverBgColor: '#1D5E30',
        hoverTextColor: white,
        activeBgColor: '#1D5E30',
        activeTextColor: white,
        boxShadowColor: '#1D5E30'
      },
      info: {
        bgColor: info,
        textColor: white,
        hoverBgColor: '#004466',
        hoverTextColor: white,
        activeBgColor: '#004466',
        activeTextColor: white,
        boxShadowColor: '#004466'
      },
      warning: {
        bgColor: warning,
        textColor: white,
        hoverBgColor: '#804400',
        hoverTextColor: white,
        activeBgColor: '#804400',
        activeTextColor: white,
        boxShadowColor: '#804400'
      },
      danger: {
        bgColor: danger,
        textColor: white,
        hoverBgColor: '#990000',
        hoverTextColor: white,
        activeBgColor: '#990000',
        activeTextColor: white,
        boxShadowColor: '#990000'
      }
    },
    buttonsAlt: {
      primary: {
        bgColor: white,
        textColor: primary,
        hoverBgColor: primary,
        hoverTextColor: white,
        activeBgColor: '#005874',
        activeTextColor: white,
        borderColor: primary
      },
      gray: {
        bgColor: white,
        textColor: '#63666A',
        hoverBgColor: '#63666A',
        hoverTextColor: white,
        activeBgColor: '#4A4D50',
        activeTextColor: white,
        borderColor: '#63666A'
      },
      magenta: {
        bgColor: white,
        textColor: '#C110A0',
        hoverBgColor: '#C110A0',
        hoverTextColor: white,
        activeBgColor: '#920C79',
        activeTextColor: white,
        borderColor: '#C110A0'
      },
      violet: {
        bgColor: white,
        textColor: '#702082',
        hoverBgColor: '#702082',
        hoverTextColor: white,
        activeBgColor: '#4D1659',
        activeTextColor: white,
        borderColor: '#702082'
      }
    }
  },
  validationIconName: {
    success: 'ok',
    warning: 'warning-sign',
    danger: 'remove'
  },
  validationTextColor: {
    success,
    warning: tinycolor(warning)
      .darken(25)
      .toString(),
    danger
  },
  validationInputColor: {
    success: {
      borderColor: success,
      boxShadow: `inset 0 0 5px ${success}`,
      focusBorderColor: success,
      focusBoxShadow: `0 0 6px ${success}`
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
      focusBoxShadow: `0 0 6px ${danger}`
    },
    default: {
      borderColor: inputBorder,
      boxShadow: `inset 0 1px 1px ${boxShadowLight}`,
      focusBorderColor: inputFocus,
      focusBoxShadow: `0 0 8px ${inputBoxShadow}`
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
  }
};

export default theme;
