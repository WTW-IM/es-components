// grayscale
const white = '#fff';
const gray0 = '#f9f9f9';
const gray1 = '#f4f4f4';
const gray2 = '#ededed';
const gray3 = '#e4e4e4';
const gray4 = '#d8d8d8';
const gray5 = '#c5c5c5';
const gray6 = '#919191';
const gray7 = '#787878';
const gray8 = '#5e5e5e';
const gray9 = '#444';
const black = '#000';

// tints/shades
const blue50 = '#e0f4fa';
const blue100 = '#b3e3f2';
const blue300 = '#4dbde0';
const blue500 = '#00a0d2';
const blue700 = '#008ec7';
const blue900 = '#0073b6';
const green50 = '#e0f8f1';
const green100 = '#b3eddc';
const green300 = '#4dd5ac';
const green500 = '#00c389';
const green700 = '#00b576';
const green900 = '#00a159';
const magenta50 = '#f8e2f4';
const magenta100 = '#ecb7e3';
const magenta300 = '#d458bd';
const magenta500 = '#c110a0';
const magenta700 = '#b30c8e';
const magenta900 = '#9e0573';
const violet50 = '#ebe2ee';
const violet100 = '#ceb6d4';
const violet300 = '#8c559a';
const violet500 = '#5a0c6f';
const violet700 = '#48085c';
const violet900 = '#2e0340';
const yellow50 = '#fff6e4';
const yellow100 = '#ffeabb';
const yellow300 = '#ffcd60';
const yellow500 = '#ffb81c';
const yellow700 = '#ffa814';
const yellow900 = '#ff9109';

// functional
const primary = blue900;
const primaryHover = '#00436a'; // from bda toolkit link example
const primaryLight = blue700;

// semantic - base colors, tints, & shades
const agent50 = '#fde8de';
const agent100 = '#fee8c4';
const agent300 = '#fdcc8a';
const agent500 = '#fc8d59';
const agent700 = '#ff6310';
const danger50 = '#f9e0e0';
const danger100 = '#f0b3b3';
const danger300 = '#db4d4d';
const danger500 = '#cc0000';
const danger700 = '#c00000';
const danger900 = '#ad0000'; 
const info50 = '#e0edf3';
const info100 = '#b3d1e0';
const info300 = '#4d94b8';
const info500 = '#006699';
const info700 = '#005386';
const info900 = '#00386b';
const success50 = '#e5f0e9';
const success100 = '#bfdac7';
const success300 = '#69aa7c';
const success500 = '#298544';
const success700 = '#1f7235';
const success900 = '#0f551f'; 
const warning50 = '#f8eae0';
const warning100 = '#edccb3';
const warning300 = '#d4874d';
const warning500 = '#c25400';
const warning700 = '#b44300';
const warning900 = '#9f2900';

// semantic - named variables
const info = info500;
const infoHover = info900;
const infoLight = info50;
const success = success500;
const successHover = success900;
const successLight = success50;
const warning = warning500;
const warningHover = warning900;
const warningLight = warning50;
const danger = danger500;
const dangerHover = danger900;
const dangerLight = danger50;
const advisor = agent700;
const advisorLight = agent100;

// brand colors
const primary1 = blue500; // used by: spinner, drawerPanel
const primary2 = green500; // used by: spinner
const primary3 = magenta500; // used by: spinner, modalHeader, breadcrumb, Nav, progressTracker, IconButton
const secondary1 = violet500; // used by spinner, outlineButton
const secondary2 = gray7;

// misc
const inputFocus = '#83bffc';
const boxShadowLight = 'rgba(0, 0, 0, 0.075)';
const boxShadowDark = 'rgba(0, 0, 0, 0.5)';

// Datepicker colors
const dpBackground = primary;
const navArrow = white;
const navArrowHover = gray2;
const selected = primary3;
const hover = violet500;
const keyboard = primary;
const inRange = 'rgba(251, 213, 244, 0.75)';
const highlight = success;
const highlightHover = success700;

const theme = {
  colors: {
    white,
    gray0,
    gray1,
    gray2,
    gray3,
    gray4,
    gray5,
    gray6,
    gray7,
    gray8,
    gray9,
    black,
    blue50,
    blue100,
    blue300,
    blue500,
    blue700,
    blue900,
    green50,
    green100,
    green300,
    green500,
    green700,
    green900,
    magenta50,
    magenta100,
    magenta300,
    magenta500,
    magenta700,
    magenta900,
    violet50,
    violet100,
    violet300,
    violet500,
    violet700,
    violet900,
    yellow50,
    yellow100,
    yellow300,
    yellow500,
    yellow700,
    yellow900,
    primary,
    primaryHover,
    primaryLight,
    success,
    successHover,
    successLight,
    info,
    infoHover,
    infoLight,
    warning,
    warningHover,
    warningLight,
    danger,
    dangerHover,
    dangerLight,
    advisor,
    advisorLight,
    boxShadowLight,
    boxShadowDark,
    inputFocus
  },
  spacing: {
    defaultMargin: '1.875rem'
  },
  brandColors: {
    primary1,
    primary2,
    primary3,
    secondary1,
    secondary2
  },
  datepickerColors: {
    dpBackground,
    navArrow,
    navArrowHover,
    selected,
    hover,
    keyboard,
    inRange,
    highlight,
    highlightHover
  },
  promptStyles: {
    readAloud: {
      bgColor: agent50,
      bannerBgColor: agent700,
      bannerTextColor: white,
      textColor: white,
      iconColor: white,
      iconName: 'agent'
    },
    doNotReadAloud: {
      bgColor: blue50,
      bannerBgColor: blue900,
      bannerTextColor: white,
      textColor: white,
      iconColor: white,
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
        textColor: gray9
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
        textColor: gray9
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
        textColor: gray9
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
        textColor: gray9
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
        textColor: gray9
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
          bgColor: gray4
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
        magenta: {
          bgColor: primary3
        },
        violet: {
          bgColor: secondary1
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
          textColor: '#ccc'
        },
        primary: {
          textColor: primary
        },
        success: {
          textColor: success
        },
        information: {
          textColor: info
        },
        danger: {
          textColor: danger
        },
        warning: {
          textColor: warning
        },
        inherited: {
          textColor: 'inherit'
        }
      }
    }
  },
  validationIconName: {
    success: 'ok-circle',
    info: 'info-circle',
    warning: 'exclamation-sign',
    danger: 'exclamation-circle',
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
      borderColor: gray5,
      boxShadow: 'inset 0 1px 1px ' + boxShadowLight,
      focusBorderColor: inputFocus,
      focusBoxShadow: '0 0 8px rgba(102, 175, 233, 0.6)'
    }
  },
  font: {
    baseFontSize: '18px',
    baseLineHeight: 1.428,
    baseFontFace: '"Source Sans Pro", "Segoe UI", Segoe, Calibri, Tahoma, sans-serif',
    headingDesktop: {
      1: '44.78976px',
      2: '37.3248px',
      3: '31.104px',
      4: '25.92px',
      5: '21.6px',
      6: '18px'
    },
    headingMobile: {
      1: '38.7898px;',
      2: '31.3248px',
      3: '31.104px',
      4: '25.92px',
      5: '21.6px',
      6: '18px'
    }
  },
  screenSize: {
    retina: '360px',
    phone: '480px',
    tablet: '768px',
    desktop: '900px',
    widescreen: '1200px'
  }
};

export = theme;
