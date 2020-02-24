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
const primary = '#007fa7';
const primaryHover = '#005874';
const info = '#069';
const infoHover = '#004466';
const infoLight = '#b8e4f9';
const success = '#006400';
const successHover = '#004B00';
const successLight = '#d9eedf';
const warning = '#c25400';
const warningHover = '#8f3e00';
const warningLight = '#fcebde';
const danger = '#EE0700';
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
          bgColor: primary,
          textColor: white,
          borderColor: primary,
          hoverBgColor: primaryHover,
          hoverTextColor: white,
          hoverBorderColor: primaryHover,
          activeBgColor: primaryHover,
          activeTextColor: white,
          activeBorderColor: primaryHover,
          boxShadowColor: primaryHover
        },
        default: {
          bgColor: defaultColor,
          textColor: black,
          hoverBgColor: defaultHover,
          hoverTextColor: black,
          activeBgColor: defaultHover,
          activeTextColor: black,
          boxShadowColor: defaultHover
        },
        darkDefault: {
          bgColor: gray7,
          textColor: white,
          hoverBgColor: gray8,
          hoverTextColor: white,
          activeBgColor: gray8,
          activeTextColor: white,
          boxShadowColor: gray8
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
        },
        inherited: {
          bgColor: 'inherit',
          textColor: 'inherit',
          hoverBgColor: 'inherit',
          hoverTextColor: 'inherit',
          activeBgColor: 'inherit',
          activeTextColor: 'inherit',
          boxShadowColor: 'inherit'
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
          borderRadius: '0.25rem',
          fontSize: '1.15rem',
          paddingTop: '0.25rem',
          paddingSides: '1rem',
          paddingBottom: '0.25rem',
          lineHeight: '1.5'
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
          textColor: gray7,
          hoverBgColor: gray7,
          hoverTextColor: white,
          activeBgColor: gray8,
          activeTextColor: white,
          borderColor: gray7
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
        },
        inherited: {
          bgColor: 'inherit',
          textColor: 'inherit',
          hoverBgColor: 'inherit',
          hoverTextColor: 'inherit',
          activeBgColor: 'inherit',
          activeTextColor: 'inherit',
          boxShadowColor: 'inherit'
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
          hoverTextColor: infoHover,
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
