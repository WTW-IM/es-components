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
const darkBlue = '#006685';

const grayLightest = gray1;
const grayLighter = gray2;
const grayLight = gray3;
const gray = gray5;
const grayDark = gray6;
const grayDarker = gray8;
const grayDarkest = gray9;

const defaultColor = '#d8d8d8';
const defaultHover = '#bfbfbf';
const defaultBtnText = black;
const primary = '#007fa7';
const primaryHover = '#005874';
const info = '#069';
const infoHover = '#004466';
const success = '#298544';
const successHover = '#1d5e30';
const warning = '#b35f00';
const warningHover = '#804400';
const danger = '#c00';
const dangerHover = '#990000';
const advisor = warning;
const popoverHeader = darkBlue;

const vbBlue = '#00a0d2';
const vbGreen = '#00c389';
const vbMagenta = '#c110a0';
const wtwGray = '#63666a';

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
    defaultColor,
    defaultHover,
    defaultBtnText,
    primary,
    primaryHover,
    success,
    successHover,
    info,
    infoHover,
    warning,
    warningHover,
    danger,
    dangerHover,
    advisor,
    boxShadowLight,
    boxShadowDark,
    inputFocus,
    popoverHeader
  },
  brandColors: {
    vbBlue,
    vbGreen,
    vbMagenta,
    wtwGray
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
      // these button types are dynamic, so you can add/remove/rename them
      primary: {
        bgColor: primary,
        textColor: white,
        hoverBgColor: primaryHover,
        hoverTextColor: white,
        activeBgColor: primaryHover,
        activeTextColor: white,
        boxShadowColor: primaryHover
      },
      default: {
        bgColor: defaultColor,
        textColor: white,
        hoverBgColor: defaultHover,
        hoverTextColor: white,
        activeBgColor: defaultHover,
        activeTextColor: white,
        boxShadowColor: defaultHover
      },
      success: {
        bgColor: success,
        textColor: white,
        hoverBgColor: successHover,
        hoverTextColor: white,
        activeBgColor: successHover,
        activeTextColor: white,
        boxShadowColor: successHover
      },
      info: {
        bgColor: info,
        textColor: white,
        hoverBgColor: infoHover,
        hoverTextColor: white,
        activeBgColor: infoHover,
        activeTextColor: white,
        boxShadowColor: infoHover
      },
      warning: {
        bgColor: warning,
        textColor: white,
        hoverBgColor: warningHover,
        hoverTextColor: white,
        activeBgColor: warningHover,
        activeTextColor: white,
        boxShadowColor: warningHover
      },
      danger: {
        bgColor: danger,
        textColor: white,
        hoverBgColor: dangerHover,
        hoverTextColor: white,
        activeBgColor: dangerHover,
        activeTextColor: white,
        boxShadowColor: dangerHover
      }
    },
    buttonsOutline: {
      // these can be independent of the main buttons, but generally
      // should have matching sets
      primary: {
        bgColor: white,
        textColor: primary,
        hoverBgColor: primary,
        hoverTextColor: white,
        activeBgColor: primaryHover,
        activeTextColor: white,
        borderColor: primary
      },
      default: {
        bgColor: white,
        textColor: defaultColor,
        hoverBgColor: defaultColor,
        hoverTextColor: white,
        activeBgColor: defaultHover,
        activeTextColor: white,
        borderColor: defaultColor
      },
      success: {
        bgColor: white,
        textColor: success,
        hoverBgColor: success,
        hoverTextColor: white,
        activeBgColor: successHover,
        activeTextColor: white,
        borderColor: success
      },
      info: {
        bgColor: white,
        textColor: info,
        hoverBgColor: info,
        hoverTextColor: white,
        activeBgColor: infoHover,
        activeTextColor: white,
        borderColor: info
      },
      warning: {
        bgColor: white,
        textColor: warning,
        hoverBgColor: warning,
        hoverTextColor: black,
        activeBgColor: warningHover,
        activeTextColor: black,
        borderColor: warning
      },
      danger: {
        bgColor: white,
        textColor: danger,
        hoverBgColor: danger,
        hoverTextColor: white,
        activeBgColor: dangerHover,
        activeTextColor: white,
        borderColor: danger
      },
      gray: {
        bgColor: white,
        textColor: wtwGray,
        hoverBgColor: wtwGray,
        hoverTextColor: white,
        activeBgColor: '#4a4d50',
        activeTextColor: white,
        borderColor: wtwGray
      },
      magenta: {
        bgColor: white,
        textColor: vbMagenta,
        hoverBgColor: vbMagenta,
        hoverTextColor: white,
        activeBgColor: '#920C79',
        activeTextColor: white,
        borderColor: vbMagenta
      },
      violet: {
        bgColor: white,
        textColor: '#702082',
        hoverBgColor: '#702082',
        hoverTextColor: white,
        activeBgColor: '#4d1659',
        activeTextColor: white,
        borderColor: '#702082'
      }
    }
  },
  // buttonSizes should always have default, lg, sm, xs
  buttonSizes: {
    lg: {
      borderRadius: '3px',
      fontSize: '26px',
      padding: '8px 20px 5px'
    },
    default: {
      borderRadius: '2px',
      fontSize: '18px',
      padding: '5px 15px 4px'
    },
    sm: {
      borderRadius: '2px',
      fontSize: '14px',
      padding: '4px 10px 3px'
    },
    xs: {
      borderRadius: '2px',
      fontSize: '12px',
      padding: '3px 10px 2px'
    }
  },
  validationIconName: {
    success: 'ok',
    warning: 'warning-sign',
    danger: 'remove'
  },
  validationTextColor: {
    success,
    warning: warningHover,
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
    desktop: '900px',
    widescreen: '1200px'
  }
};

export default theme;
