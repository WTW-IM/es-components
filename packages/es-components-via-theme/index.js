const white = '#fff';
const gray0 = '#f9f9f9';
const gray1 = '#f4f4f4';
const gray2 = '#ecedee';
const gray3 = '#e4e4e4';
const gray4 = '#d8d8d8';
const gray5 = '#c5c5c5';
const gray6 = '#979797';
const gray7 = '#707070';
const gray8 = '#585858';
const gray9 = '#444';
const black = '#000';
const darkBlue = '#006685';

const defaultColor = '#d8d8d8';
const defaultHover = '#bfbfbf';
const defaultBtnText = black;
const primary = '#0073b6';
const primaryHover = '#005874';
const info = '#069';
const infoHover = '#004466';
const infoLight = '#b8e4f9';
const success = '#298544';
const successHover = '#004B00';
const successLight = '#d9eedf';
const warning = '#c25400';
const warningHover = '#8f3e00';
const warningLight = '#fcebde';
const danger = '#cc0000';
const dangerHover = '#BB0000';
const dangerLight = '#fde7e7';
const advisor = warning;
const advisorLight = warningLight;
const popoverHeader = darkBlue;

const vbBlue = '#00a0d2';
const vbGreen = '#00c389';
const vbMagenta = '#c110a0';
const wtwGray = '#63666a';

const boxShadowLight = 'rgba(0, 0, 0, 0.075)';
const boxShadowDark = 'rgba(0, 0, 0, 0.5)';

const inputBorder = gray5;
const inputFocus = '#83bffc';
const inputBoxShadow = 'rgba(102, 175, 233, 0.6)';

const violet = '#5a0c6f';
const blueLighter = '#d2f4ff';
const greenLighter = '#c3ffed';
const violetLighter = '#eac9f2';

// Datepicker colors
const dpBackground = '#006685';
const navArrow = white;
const navArrowHover = gray2;
const selected = vbMagenta;
const hover = '#7a0a65';
const keyboard = primary;
const inRange = 'rgba(251, 213, 244, 0.75)';
const highlight = success;
const highlightHover = '#007653';

const theme = {
  colors: {
    black: black,
    gray0: gray0,
    gray1: gray1,
    gray2: gray2,
    gray3: gray3,
    gray4: gray4,
    gray5: gray5,
    gray6: gray6,
    gray7: gray7,
    gray8: gray8,
    gray9: gray9,
    white: white,
    defaultColor: defaultColor,
    defaultHover: defaultHover,
    defaultBtnText: defaultBtnText,
    primary: primary,
    primaryHover: primaryHover,
    success: success,
    successHover: successHover,
    successLight: successLight,
    info: info,
    infoHover: infoHover,
    infoLight: infoLight,
    warning: warning,
    warningHover: warningHover,
    warningLight: warningLight,
    danger: danger,
    dangerHover: dangerHover,
    dangerLight: dangerLight,
    advisor: advisor,
    advisorLight: advisorLight,
    boxShadowLight: boxShadowLight,
    boxShadowDark: boxShadowDark,
    inputFocus: inputFocus,
    popoverHeader: popoverHeader,
    greenLighter: greenLighter,
    violetLighter: violetLighter,
    blueLighter: blueLighter,
    violet: violet,
    softwareBlue: darkBlue
  },
  brandColors: {
    vbBlue: vbBlue,
    vbGreen: vbGreen,
    vbMagenta: vbMagenta,
    wtwGray: wtwGray
  },
  datepickerColors: {
    dpBackground: dpBackground,
    navArrow: navArrow,
    navArrowHover: navArrowHover,
    selected: selected,
    hover: hover,
    keyboard: keyboard,
    inRange: inRange,
    highlight: highlight,
    highlightHover: highlightHover
  },
  headingSize: {
    1: '44.78976px',
    2: '37.3248px',
    3: '31.104px',
    4: '25.92px',
    5: '21.6px',
    6: '18px'
  },
  promptStyles: {
    readAloud: {
      bgColor: '#FDE8DE',
      bannerBgColor: '#FF6310',
      textColor: black,
      iconColor: black,
      iconName: 'agent'
    },
    doNotReadAloud: {
      bgColor: gray1,
      bannerBgColor: gray1,
      textColor: black,
      iconColor: black,
      iconName: 'no-symbol'
    }
  },
  notificationStyles: {
    success: {
      base: {
        bgColor: success,
        textColor: white
      },
      light: {
        bgColor: successLight,
        textColor: gray8
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: success
      }
    },
    info: {
      base: {
        bgColor: info,
        textColor: white
      },
      light: {
        bgColor: infoLight,
        textColor: gray8
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: info
      }
    },
    warning: {
      base: {
        bgColor: warning,
        textColor: white
      },
      light: {
        bgColor: warningLight,
        textColor: gray8
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: warning
      }
    },
    danger: {
      base: {
        bgColor: danger,
        textColor: white
      },
      light: {
        bgColor: dangerLight,
        textColor: gray8
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: danger
      }
    },
    advisor: {
      base: {
        bgColor: advisor,
        textColor: white
      },
      light: {
        bgColor: advisorLight,
        textColor: gray8
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: advisor
      }
    }
  },
  buttonStyles: {
    button: {
      variant: {
        // default is required
        primary: {
          bgColor: primary
        },
        default: {
          bgColor: defaultColor
        },
        darkDefault: {
          bgColor: gray8
        },
        success: {
          bgColor: success
        },
        info: {
          bgColor: info
        },
        warning: {
          bgColor: warning
        },
        danger: {
          bgColor: danger
        },
        inherited: {}
      },
      // size should always have default, lg, sm, xs
      // sizes must include borderRadius, fontSize, padding[Top|Sides|Bottom]
      // fontWeight, lineHeight, textTransform are optional
      size: {
        lg: {
          borderRadius: '0.3rem',
          fontSize: '1.4375rem',
          lineHeight: '2',
          paddingTop: '0.125rem',
          paddingSides: '1rem',
          paddingBottom: '0.125rem'
        },
        default: {
          borderRadius: '0.25rem',
          fontSize: '1.15rem',
          lineHeight: '1.5',
          paddingTop: '0.25rem',
          paddingSides: '1rem',
          paddingBottom: '0.25rem'
        },
        sm: {
          borderRadius: '0.2rem',
          fontSize: '1.00625rem',
          lineHeight: '1.25',
          paddingTop: '0.25rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.25rem'
        },
        xs: {
          borderRadius: '0.25rem',
          fontSize: '0.8855rem',
          lineHeight: '1.5',
          paddingTop: '0.1rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.1rem',
          textTransform: 'uppercase'
        }
      }
    },
    outlineButton: {
      variant: {
        primary: {
          bgColor: primary
        },
        default: {
          bgColor: gray8
        },
        success: {
          bgColor: success
        },
        info: {
          bgColor: info
        },
        warning: {
          bgColor: warning
        },
        danger: {
          bgColor: danger
        },
        gray: {
          bgColor: wtwGray
        },
        magenta: {
          bgColor: vbMagenta
        },
        violet: {
          bgColor: '#702082'
        },
        inherited: {}
      },
      size: {
        lg: {
          borderRadius: '0.3rem',
          fontSize: '1.4375rem',
          fontWeight: 'bold',
          lineHeight: '2',
          paddingTop: '0.125rem',
          paddingSides: '1rem',
          paddingBottom: '0.125rem'
        },
        default: {
          borderRadius: '0.25rem',
          fontSize: '1.15rem',
          fontWeight: 'bold',
          lineHeight: '1.5',
          paddingTop: '0.25rem',
          paddingSides: '1rem',
          paddingBottom: '0.25rem'
        },
        sm: {
          borderRadius: '0.2rem',
          fontSize: '1.00625rem',
          fontWeight: 'bold',
          lineHeight: '1.25',
          paddingTop: '0.25rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.25rem'
        },
        xs: {
          borderRadius: '0.25rem',
          fontSize: '0.8855rem',
          fontWeight: 'bold',
          lineHeight: '1.5',
          paddingTop: '0.1rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.1rem',
          textTransform: 'uppercase'
        }
      }
    },
    linkButton: {
      variant: {
        default: {
          textColor: defaultColor,
          hoverTextColor: defaultHover
        },
        primary: {
          textColor: primary,
          hoverTextColor: primaryHover
        },
        success: {
          textColor: success,
          hoverTextColor: successHover
        },
        information: {
          textColor: info,
          hoverTextColor: infoHover
        },
        danger: {
          textColor: danger,
          hoverTextColor: dangerHover
        },
        warning: {
          textColor: warning,
          hoverTextColor: warningHover
        },
        inherited: {
          textColor: 'inherit',
          hoverTextColor: 'inherit'
        }
      }
    }
  },
  validationIconName: {
    success: 'ok-circle',
    info: 'info-circle',
    warning: 'exclamation-circle',
    danger: 'exclamation-sign',
    advisor: 'agent'
  },
  validationTextColor: {
    success: success,
    warning: warning,
    danger: danger
  },
  validationInputColor: {
    success: {
      borderColor: success,
      boxShadow: 'inset 0 0 5px ' + success,
      focusBorderColor: success,
      focusBoxShadow: '0 0 6px ' + success
    },
    warning: {
      borderColor: warning,
      boxShadow: 'inset 0 0 5px ' + warning,
      focusBorderColor: warning,
      focusBoxShadow: '0 0 6px ' + warning
    },
    danger: {
      borderColor: danger,
      boxShadow: 'inset 0 0 5px ' + danger,
      focusBorderColor: danger,
      focusBoxShadow: '0 0 6px ' + danger
    },
    default: {
      borderColor: inputBorder,
      boxShadow: 'inset 0 1px 1px ' + boxShadowLight,
      focusBorderColor: inputFocus,
      focusBoxShadow: '0 0 8px ' + inputBoxShadow
    }
  },
  sizes: {
    baseFontSize: '18px',
    baseLineHeight: 1.428
  },
  screenSize: {
    retina: '360px',
    phone: '480px',
    tablet: '768px',
    desktop: '900px',
    widescreen: '1200px'
  }
};

module.exports = theme;
