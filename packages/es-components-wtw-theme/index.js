const white = '#fff';
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
const darkBlue = '#00607d';

const defaultColor = gray9;
const defaultHover = black;
const defaultBtnText = white;
const primary = '#702082';
const primaryHover = '#3e084d';
const info = '#1b6284';
const infoHover = '#144962';
const infoLight = '#227ba6';
const success = '#009865';
const successHover = '#007d50';
const successLight = '#f3fffb';
const warning = '#de7400';
const warningHover = '#c26100';
const warningLight = '#fff6ee';
const danger = '#a31e22';
const dangerHover = '#8c1515';
const dangerLight = '#fff5f5';
const advisor = '#ebaf00';
const advisorLight = '#ffedb8';
const popoverHeader = darkBlue;

const vbBlue = primaryHover;
const vbGreen = '#00c389';
const vbMagenta = primaryHover;
const wtwGray = '#63666a';

const boxShadowLight = 'rgba(0, 0, 0, 0.075)';
const boxShadowDark = 'rgba(0, 0, 0, 0.5)';

const inputBorder = gray4;
const inputFocus = '#66afe9';
const inputBoxShadow = 'rgba(102, 175, 233, 0.6)';

const violet = '#5a0c6f';
const blueLighter = '#d2f4ff';
const greenLighter = '#c3ffed';
const violetLighter = '#eac9f2';

// Datepicker colors
const dpBackground = '#006685';
const navArrow = white;
const navArrowHover = gray2;
const selected = '#216ba5';
const hover = '#1d5d90';
const keyboard = '#2a87d0';
const inRange = 'rgba(33, 107, 165, 0.5)';
const highlight = '#3dcc4a';
const highlightHover = '#32be3f';

const theme = {
  colors: {
    black: black,
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
    violet: violet
  },
  brandColors: {
    vbBlue: vbBlue,
    vbGreen: vbGreen,
    vbMagenta: vbMagenta,
    wtwGray: wtwGray
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
        textColor: white
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
          bgColor: primary,
          textColor: white,
          hoverBgColor: primaryHover,
          hoverTextColor: white,
          activeBgColor: primaryHover,
          activeTextColor: white,
          boxShadowColor: primaryHover
        },
        default: {
          bgColor: '#d8d8d8',
          textColor: black,
          hoverBgColor: '#bfbfbf',
          hoverTextColor: black,
          activeBgColor: '#bfbfbf',
          activeTextColor: black,
          boxShadowColor: '#bfbfbf'
        },
        darkDefault: {
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
      // size should always have default, lg, sm, xs
      // sizes must include borderRadius, fontSize, padding[Top|Sides|Bottom]
      // fontWeight, lineHeight, textTransform are optional
      size: {
        lg: {
          borderRadius: '5px',
          fontSize: '26px',
          lineHeight: '1.333',
          paddingTop: '8px',
          paddingSides: '20px',
          paddingBottom: '5px'
        },
        default: {
          borderRadius: '4px',
          fontSize: '18px',
          paddingTop: '5px',
          paddingSides: '15px',
          paddingBottom: '4px'
        },
        sm: {
          borderRadius: '3px',
          fontSize: '17px',
          lineHeight: '1.5',
          paddingTop: '4px',
          paddingSides: '10px',
          paddingBottom: '3px'
        },
        xs: {
          borderRadius: '3px',
          fontSize: '15px',
          lineHeight: '1.5',
          paddingTop: '3px',
          paddingSides: '10px',
          paddingBottom: '2px',
          textTransform: 'uppercase'
        }
      }
    },
    outlineButton: {
      variant: {
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
          hoverTextColor: white,
          activeBgColor: warningHover,
          activeTextColor: white,
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
        }
      },
      size: {
        lg: {
          borderRadius: '5px',
          fontSize: '125%',
          fontWeight: 'bold',
          paddingTop: '8px',
          paddingSides: '25px',
          paddingBottom: '8px'
        },
        default: {
          borderRadius: '4px',
          fontSize: '18px',
          fontWeight: 'bold',
          paddingTop: '5px',
          paddingSides: '15px',
          paddingBottom: '5px'
        },
        sm: {
          borderRadius: '3px',
          fontSize: '75%',
          fontWeight: 'bold',
          paddingTop: '4px',
          paddingSides: '10px',
          paddingBottom: '4px'
        },
        xs: {
          borderRadius: '3px',
          fontSize: '60%',
          fontWeight: 'bold',
          paddingTop: '4px',
          paddingSides: '8px',
          paddingBottom: '4px',
          textTransform: 'uppercase'
        }
      }
    }
  },
  validationIconName: {
    success: 'ok-circle',
    info: 'info-circle',
    warning: 'exclamation-sign',
    danger: 'remove-circle',
    advisor: 'agent'
  },
  validationTextColor: {
    success: success,
    warning: warningHover,
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
    retina: '320px',
    phone: '480px',
    tablet: '768px',
    desktop: '900px',
    widescreen: '1200px'
  }
};

module.exports = theme;
