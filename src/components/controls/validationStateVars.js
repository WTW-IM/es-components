import { inputColors, colors } from '../theme';

export const validationIconName = {
  success: 'ok',
  warning: 'warning-sign',
  danger: 'remove'
};

export const validationTextColor = {
  success: colors.success,
  warning: colors.grayDarkest,
  danger: colors.danger
};

export const validationInputColor = {
  success: {
    borderColor: colors.success,
    boxShadow: `inset 0 0 5px ${colors.success}`,
    focusBorderColor: `${inputColors.inputSuccessBorder}`,
    focusBoxShadow: `0 0 6px ${inputColors.inputSuccessBoxShadow}`
  },
  warning: {
    borderColor: colors.warning,
    boxShadow: `inset 0 0 5px ${colors.warning}`,
    focusBorderColor: colors.warning,
    focusBoxShadow: `0 0 6px ${colors.warning}`
  },
  danger: {
    borderColor: colors.danger,
    boxShadow: `inset 0 0 5px ${colors.danger}`,
    focusBorderColor: colors.danger,
    focusBoxShadow: '0 0 6px #f13a30'
  },
  normal: {
    borderColor: inputColors.inputDefaultBorder,
    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    focusBorderColor: inputColors.inputDefaultFocus,
    focusBoxShadow: `0 0 8px ${inputColors.inputDefaultBoxShadow}`
  }
};
