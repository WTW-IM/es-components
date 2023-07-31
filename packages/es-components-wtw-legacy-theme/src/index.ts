import type ESTheme from 'es-components-shared-types';
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
const blue25 = '#f2f8fb';
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
const primary = blue500;
const primaryHover = '#3c084a';
const primaryLight = '#ebcff3';

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

// semantic
const info = info500;
const infoHover = '#004466';
const infoLight = '#c0ebff';
const success = '#006000';
const successHover = '#004000';
const successLight = '#d2e9d2';
const warning = '#de7400';
const warningHover = '#a65600';
const warningLight = '#f6e0ca';
const danger = '#a31e22';
const dangerHover = '#970500';
const dangerLight = '#ffc2c0';
const advisor = '#ff6310';
const advisorLight = '#fee7de';

// brand colors
const primary1 = blue500;
const primary2 = '#63666a';
const primary3 = '#c110a0';
const secondary1 = primary1;
const secondary2 = primary2;

// misc
const inputFocus = '#66afe9';
const boxShadowLight = 'rgba(0, 0, 0, 0.075)';
const boxShadowDark = 'rgba(0, 0, 0, 0.5)';

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

const dropdownArrow =
  "data:image/svg+xml,%3Csvg width='11px' height='21px' viewBox='0 0 11 21' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Autocomplete-and-Dropdowns' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Icon' transform='translate(1.000000  2.000000)' stroke='%2300A0D2' stroke-width='2'%3E%3Cg id='Atoms-/-Functional-Icons-/-Custom-/-Chevron-/-Down-/-Blue'%3E%3Cpolyline points='9 11.646475 4.5 16.646475 0 11.646475'%3E%3C/polyline%3E%3Cpolyline id='Atoms-/-Functional-Icons-/-Custom-/-Chevron-/-Down-/-Blue-Copy' transform='translate(4.500000 2.500000) rotate(-180.000000) translate(-4.500000  -2.500000) ' points='9 0 4.5 5 0 0'%3E%3C/polyline%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const theme: ESTheme = {
  themeName: 'wtw-theme',
  colors: {
    white: white,
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
    black: black,
    blue25: blue25,
    blue50: blue50,
    blue100: blue100,
    blue300: blue300,
    blue500: blue500,
    blue700: blue700,
    blue900: blue900,
    green50: green50,
    green100: green100,
    green300: green300,
    green500: green500,
    green700: green700,
    green900: green900,
    magenta50: magenta50,
    magenta100: magenta100,
    magenta300: magenta300,
    magenta500: magenta500,
    magenta700: magenta700,
    magenta900: magenta900,
    violet50: violet50,
    violet100: violet100,
    violet300: violet300,
    violet500: violet500,
    violet700: violet700,
    violet900: violet900,
    yellow50: yellow50,
    yellow100: yellow100,
    yellow300: yellow300,
    yellow500: yellow500,
    yellow700: yellow700,
    yellow900: yellow900,
    primary: primary,
    primaryHover: primaryHover,
    primaryLight: primaryLight,
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
  },
  brandColors: {
    primary1: primary1,
    primary2: primary2,
    primary3: primary3,
    secondary1: secondary1,
    secondary2: secondary2,
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
    highlightHover: highlightHover,
  },
  promptStyles: {
    readAloud: {
      bgColor: '#FDE8DE',
      bannerBgColor: '#FF6310',
      bannerTextColor: white,
      textColor: white,
      iconColor: white,
      iconName: 'agent',
    },
    doNotReadAloud: {
      bgColor: '#E0F4F4',
      bannerBgColor: '#0073B6',
      bannerTextColor: white,
      textColor: white,
      iconColor: white,
      iconName: 'no-symbol',
    },
  },
  bannerStyles: {
    success: {
      bgColor: success100,
      textColor: black,
    },
    info: {
      bgColor: info100,
      textColor: black,
    },
    default: {
      bgColor: info100,
      textColor: black,
    },
    warning: {
      bgColor: warning100,
      textColor: black,
    },
    danger: {
      bgColor: danger100,
      textColor: black,
    },
    advisor: {
      bgColor: agent300,
      textColor: black,
    },
  },
  notificationStyles: {
    success: {
      base: {
        bgColor: success,
        textColor: white,
      },
      light: {
        bgColor: successLight,
        textColor: gray9,
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: success,
      },
    },
    default: {
      base: {
        bgColor: info,
        textColor: white,
      },
      light: {
        bgColor: infoLight,
        textColor: gray9,
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: info,
      },
    },
    info: {
      base: {
        bgColor: info,
        textColor: white,
      },
      light: {
        bgColor: infoLight,
        textColor: gray9,
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: info,
      },
    },
    warning: {
      base: {
        bgColor: warning,
        textColor: white,
      },
      light: {
        bgColor: warningLight,
        textColor: gray9,
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: warning,
      },
    },
    danger: {
      base: {
        bgColor: danger,
        textColor: white,
      },
      light: {
        bgColor: dangerLight,
        textColor: gray9,
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: danger,
      },
    },
    advisor: {
      base: {
        bgColor: advisor,
        textColor: white,
      },
      light: {
        bgColor: advisorLight,
        textColor: gray9,
      },
      messageOnly: {
        bgColor: 'transparent',
        textColor: advisor,
      },
    },
  },
  buttonStyles: {
    button: {
      variant: {
        // default is required
        primary: {
          bgColor: primary,
        },
        default: {
          bgColor: '#ccc',
        },
        darkDefault: {
          bgColor: gray9,
        },
        success: {
          bgColor: success,
        },
        info: {
          bgColor: info,
        },
        warning: {
          bgColor: warning,
        },
        danger: {
          bgColor: danger,
        },
        inherited: {
          bgColor: 'inherit',
        },
        magenta: {
          bgColor: primary3,
        },
        violet: {
          bgColor: primary1,
        },
        information: {
          bgColor: info,
        },
      },
      // size should always have default, lg, sm, xs
      // sizes must include borderRadius, fontSize, padding[Top|Sides|Bottom]
      // fontWeight, lineHeight, textTransform are optional
      size: {
        lg: {
          borderRadius: '0',
          fontSize: '1.4375rem',
          lineHeight: '2',
          paddingTop: '0.125rem',
          paddingSides: '1rem',
          paddingBottom: '0.125rem',
        },
        default: {
          borderRadius: '0',
          fontSize: '1rem',
          lineHeight: '1.5',
          paddingTop: '0.25rem',
          paddingSides: '1rem',
          paddingBottom: '0.25rem',
        },
        sm: {
          borderRadius: '0',
          fontSize: '1.00625rem',
          lineHeight: '1.25',
          paddingTop: '0.25rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.25rem',
        },
        xs: {
          borderRadius: '0',
          fontSize: '0.8855rem',
          lineHeight: '1.5',
          paddingTop: '0.1rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.1rem',
          textTransform: 'uppercase',
        },
      },
    },
    outlineButton: {
      variant: {
        primary: {
          bgColor: primary,
        },
        default: {
          bgColor: gray9,
          hoverBgColor: gray1,
          hoverColor: primary,
        },
        darkDefault: {
          bgColor: gray9,
        },
        success: {
          bgColor: success,
        },
        info: {
          bgColor: info,
        },
        information: {
          bgColor: info,
        },
        warning: {
          bgColor: warning,
        },
        danger: {
          bgColor: danger,
        },
        magenta: {
          bgColor: primary3,
        },
        violet: {
          bgColor: primary1,
        },
        inherited: {
          bgColor: 'inherit',
        },
      },
      size: {
        lg: {
          borderRadius: '0',
          fontSize: '1.4375rem',
          fontWeight: 'normal',
          lineHeight: '2',
          paddingTop: '0.125rem',
          paddingSides: '1rem',
          paddingBottom: '0.125rem',
        },
        default: {
          borderRadius: '0',
          fontSize: '1rem',
          fontWeight: 'normal',
          lineHeight: '1.5',
          paddingTop: '0.25rem',
          paddingSides: '1rem',
          paddingBottom: '0.25rem',
        },
        sm: {
          borderRadius: '0',
          fontSize: '1.00625rem',
          fontWeight: 'normal',
          lineHeight: '1.25',
          paddingTop: '0.25rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.25rem',
        },
        xs: {
          borderRadius: '0',
          fontSize: '0.8855rem',
          fontWeight: 'normal',
          lineHeight: '1.5',
          paddingTop: '0.1rem',
          paddingSides: '0.5rem',
          paddingBottom: '0.1rem',
          textTransform: 'uppercase',
        },
      },
    },
    linkButton: {
      variant: {
        default: {
          textColor: gray9,
        },
        darkDefault: {
          textColor: gray9,
        },
        magenta: {
          textColor: gray9,
        },
        violet: {
          textColor: gray9,
        },
        primary: {
          textColor: primary,
        },
        success: {
          textColor: success,
        },
        info: {
          textColor: info,
        },
        information: {
          textColor: info,
        },
        danger: {
          textColor: danger,
        },
        warning: {
          textColor: warning,
        },
        inherited: {
          textColor: 'inherit',
        },
      },
    },
  },
  inputStyles: {
    borderRadius: '2px',
    defaultFormStyle: 'flat',
    dropdownArrow: dropdownArrow,
    inputHeight: '2.2em',
    dropdownLineHeight: '1.5em',
  },
  validationIconName: {
    success: 'ok-circle',
    info: 'info-circle',
    default: 'info-circle',
    warning: 'exclamation-sign',
    danger: 'exclamation-circle',
    advisor: 'agent',
  },
  validationTextColor: {
    success: success,
    warning: warning,
    danger: danger,
    info: gray3,
    advisor: gray3,
    default: gray3,
  },
  validationInputColor: {
    success: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: success,
      boxShadow: 'inset 0 0 5px ' + success,
      focusBorderColor: success,
      focusBoxShadow: '0 0 6px ' + success,
      focusBoxShadowFlat: '0 0 1px 2px ' + success,
      addOn: {
        textColor: white,
        backgroundColor: success,
        borderColor: success,
      },
    },
    warning: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: warning,
      boxShadow: 'inset 0 0 5px ' + warning,
      focusBorderColor: warning,
      focusBoxShadow: '0 0 6px ' + warning,
      focusBoxShadowFlat: '0 0 1px 2px ' + warning,
      addOn: {
        textColor: white,
        backgroundColor: warning,
        borderColor: warning,
      },
    },
    danger: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: danger,
      boxShadow: 'inset 0 0 5px ' + danger,
      focusBorderColor: danger,
      focusBoxShadow: '0 0 6px ' + danger,
      focusBoxShadowFlat: '0 0 1px 2px ' + danger,
      addOn: {
        textColor: white,
        backgroundColor: danger,
        borderColor: danger,
      },
    },
    info: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: gray4,
      boxShadow: 'inset 0 1px 1px ' + boxShadowLight,
      focusBorderColor: inputFocus,
      focusBoxShadow: '0 0 8px rgba(102, 175, 233, 0.6)',
      focusBoxShadowFlat: '0 0 1px 2px rgba(102, 175, 233, 0.6)',
      addOn: {
        textColor: gray8,
        backgroundColor: gray3,
        borderColor: gray4,
      },
    },
    advisor: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: gray4,
      boxShadow: 'inset 0 1px 1px ' + boxShadowLight,
      focusBorderColor: inputFocus,
      focusBoxShadow: '0 0 8px rgba(102, 175, 233, 0.6)',
      focusBoxShadowFlat: '0 0 1px 2px rgba(102, 175, 233, 0.6)',
      addOn: {
        textColor: gray8,
        backgroundColor: gray3,
        borderColor: gray4,
      },
    },
    default: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: gray4,
      boxShadow: 'inset 0 1px 1px ' + boxShadowLight,
      focusBorderColor: inputFocus,
      focusBoxShadow: '0 0 8px rgba(102, 175, 233, 0.6)',
      focusBoxShadowFlat: '0 0 1px 2px rgba(102, 175, 233, 0.6)',
      addOn: {
        textColor: gray8,
        backgroundColor: gray3,
        borderColor: gray4,
      },
    },
  },
  font: {
    baseFontSize: '16px',
    baseFontFace:
      'NHaasGroteskTXPro-55Rg, "Source Sans Pro", "Segoe UI", Segoe, Calibri, Tahoma, sans-serif',
    labelFontSize: '14px',
    labelFontWeight: 'normal',
    baseLineHeight: 1.428,
    headingDesktop: {
      1: '31.104px',
      2: '31.104px',
      3: '31.104px',
      4: '25.92px',
      5: '21.6px',
      6: '18px',
    },
    headingMobile: {
      1: '31.104px',
      2: '31.104px',
      3: '31.104px',
      4: '25.92px',
      5: '21.6px',
      6: '18px',
    },
  },
  screenSize: {
    retina: '360px',
    phone: '480px',
    tablet: '768px',
    desktop: '900px',
    widescreen: '1200px',
  },
  spacing: {
    defaultMargin: '1.875rem',
  },
};

module.exports = theme;
