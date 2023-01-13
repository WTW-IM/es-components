// grayscale
const white = "#fff";
const gray0 = "#f9f9f9";
const gray1 = "#f4f4f4";
const gray2 = "#ededed";
const gray3 = "#e4e4e4";
const gray4 = "#d8d8d8";
const gray5 = "#c5c5c5";
const gray6 = "#919191";
const gray7 = "#787878";
const gray8 = "#5e5e5e";
const gray9 = "#444";
const black = "#000";

// tints/shades
const blue25 = "#f2f8fb";
const blue50 = "#e0f4fa";
const blue100 = "#b3e3f2";
const blue300 = "#4dbde0";
const blue500 = "#00a0d2";
const blue700 = "#008ec7";
const blue900 = "#0073b6";
const green50 = "#e0f8f1";
const green100 = "#b3eddc";
const green300 = "#4dd5ac";
const green500 = "#00c389";
const green700 = "#00b576";
const green900 = "#00a159";
const magenta50 = "#f8e2f4";
const magenta100 = "#ecb7e3";
const magenta300 = "#d458bd";
const magenta500 = "#c110a0";
const magenta700 = "#b30c8e";
const magenta900 = "#9e0573";
const violet50 = "#ebe2ee";
const violet100 = "#ceb6d4";
const violet300 = "#8c559a";
const violet500 = "#5a0c6f";
const violet700 = "#48085c";
const violet900 = "#2e0340";
const yellow50 = "#fff6e4";
const yellow100 = "#ffeabb";
const yellow300 = "#ffcd60";
const yellow500 = "#ffb81c";
const yellow700 = "#ffa814";
const yellow900 = "#ff9109";

// functional
const primary = "#5a0c6f";
const primaryHover = "#3c084a";
const primaryLight = "#ebcff3";

// semantic
const info = "#006699";
const infoHover = "#004466";
const infoLight = "#c0ebff";
const success = "#006000";
const successHover = "#004000";
const successLight = "#d2e9d2";
const warning = "#de7400";
const warningHover = "#a65600";
const warningLight = "#f6e0ca";
const danger = "#e60700";
const dangerHover = "#970500";
const dangerLight = "#ffc2c0";
const advisor = "#ff6310";
const advisorLight = "#fee7de";

// brand colors
const primary1 = "#5a0c6f";
const primary2 = "#63666a";
const primary3 = "#c110a0";
const secondary1 = primary1;
const secondary2 = primary2;

// misc
const inputFocus = "#66afe9";
const boxShadowLight = "rgba(0, 0, 0, 0.075)";
const boxShadowDark = "rgba(0, 0, 0, 0.5)";

// Datepicker colors
const dpBackground = "#006685";
const navArrow = white;
const navArrowHover = gray2;
const selected = "#216ba5";
const hover = "#1d5d90";
const keyboard = "#2a87d0";
const inRange = "rgba(33, 107, 165, 0.5)";
const highlight = "#3dcc4a";
const highlightHover = "#32be3f";

const theme = {
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
      bgColor: "#FDE8DE",
      bannerBgColor: "#FF6310",
      bannerTextColor: white,
      textColor: white,
      iconColor: white,
      iconName: "agent",
    },
    doNotReadAloud: {
      bgColor: "#E0F4F4",
      bannerBgColor: "#0073B6",
      bannerTextColor: white,
      textColor: white,
      iconColor: white,
      iconName: "no-symbol",
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
        bgColor: "transparent",
        textColor: success,
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
        bgColor: "transparent",
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
        bgColor: "transparent",
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
        bgColor: "transparent",
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
        bgColor: "transparent",
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
          bgColor: "#ccc",
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
        inherited: {},
      },
      // size should always have default, lg, sm, xs
      // sizes must include borderRadius, fontSize, padding[Top|Sides|Bottom]
      // fontWeight, lineHeight, textTransform are optional
      size: {
        lg: {
          borderRadius: "0.3rem",
          fontSize: "1.4375rem",
          lineHeight: "2",
          paddingTop: "0.125rem",
          paddingSides: "1rem",
          paddingBottom: "0.125rem",
        },
        default: {
          borderRadius: "0.25rem",
          fontSize: "1.15rem",
          lineHeight: "1.5",
          paddingTop: "0.25rem",
          paddingSides: "1rem",
          paddingBottom: "0.25rem",
        },
        sm: {
          borderRadius: "0.2rem",
          fontSize: "1.00625rem",
          lineHeight: "1.25",
          paddingTop: "0.25rem",
          paddingSides: "0.5rem",
          paddingBottom: "0.25rem",
        },
        xs: {
          borderRadius: "0.25rem",
          fontSize: "0.8855rem",
          lineHeight: "1.5",
          paddingTop: "0.1rem",
          paddingSides: "0.5rem",
          paddingBottom: "0.1rem",
          textTransform: "uppercase",
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
        magenta: {
          bgColor: primary3,
        },
        violet: {
          bgColor: primary1,
        },
        inherited: {},
      },
      size: {
        lg: {
          borderRadius: "0.3rem",
          fontSize: "1.4375rem",
          fontWeight: "bold",
          lineHeight: "2",
          paddingTop: "0.125rem",
          paddingSides: "1rem",
          paddingBottom: "0.125rem",
        },
        default: {
          borderRadius: "0.25rem",
          fontSize: "1.15rem",
          fontWeight: "bold",
          lineHeight: "1.5",
          paddingTop: "0.25rem",
          paddingSides: "1rem",
          paddingBottom: "0.25rem",
        },
        sm: {
          borderRadius: "0.2rem",
          fontSize: "1.00625rem",
          fontWeight: "bold",
          lineHeight: "1.25",
          paddingTop: "0.25rem",
          paddingSides: "0.5rem",
          paddingBottom: "0.25rem",
        },
        xs: {
          borderRadius: "0.25rem",
          fontSize: "0.8855rem",
          fontWeight: "bold",
          lineHeight: "1.5",
          paddingTop: "0.1rem",
          paddingSides: "0.5rem",
          paddingBottom: "0.1rem",
          textTransform: "uppercase",
        },
      },
    },
    linkButton: {
      variant: {
        default: {
          textColor: gray9,
        },
        primary: {
          textColor: primary,
        },
        success: {
          textColor: success,
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
          textColor: "inherit",
        },
      },
    },
  },
  inputStyles: {
    borderRadius: "2px",
  },
  validationIconName: {
    success: "ok-circle",
    info: "info-circle",
    warning: "exclamation-sign",
    danger: "exclamation-circle",
    advisor: "agent",
  },
  validationTextColor: {
    success: success,
    warning: warning,
    danger: danger,
  },
  validationInputColor: {
    success: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: success,
      boxShadow: "inset 0 0 5px " + success,
      focusBorderColor: success,
      focusBoxShadow: "0 0 6px " + success,
      focusBoxShadowFlat: "0 0 1px 2px" + success,
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
      boxShadow: "inset 0 0 5px " + warning,
      focusBorderColor: warning,
      focusBoxShadow: "0 0 6px " + warning,
      focusBoxShadowFlat: "0 0 1px 2px" + warning,
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
      boxShadow: "inset 0 0 5px " + danger,
      focusBorderColor: danger,
      focusBoxShadow: "0 0 6px " + danger,
      focusBoxShadowFlat: "0 0 1px 2px" + danger,
      addOn: {
        textColor: white,
        backgroundColor: danger,
        borderColor: danger,
      },
    },
    default: {
      backgroundColor: white,
      backgroundColorFlat: gray1,
      borderColor: gray4,
      boxShadow: "inset 0 1px 1px " + boxShadowLight,
      focusBorderColor: inputFocus,
      focusBoxShadow: "0 0 8px rgba(102, 175, 233, 0.6)",
      focusBoxShadowFlat: "0 0 1px 2px rgba(102, 175, 233, 0.6)",
      addOn: {
        textColor: gray8,
        backgroundColor: gray3,
        borderColor: gray4,
      },
    },
  },
  font: {
    baseFontSize: "18px",
    baseLineHeight: 1.428,
    headingDesktop: {
      1: "31.104px",
      2: "31.104px",
      3: "31.104px",
      4: "25.92px",
      5: "21.6px",
      6: "18px",
    },
    headingMobile: {
      1: "31.104px",
      2: "31.104px",
      3: "31.104px",
      4: "25.92px",
      5: "21.6px",
      6: "18px",
    },
  },
  screenSize: {
    retina: "360px",
    phone: "480px",
    tablet: "768px",
    desktop: "900px",
    widescreen: "1200px",
  },
};

module.exports = theme;
