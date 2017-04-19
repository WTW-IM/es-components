import { inputColors, backgroundColors, colors } from '../../theme';

export default function getValidationStateVariables(validationState) {
  switch (validationState) {
    case 'success':
      return {
        addonBackgroundColor: backgroundColors.success,
        borderColor: colors.success,
        boxShadow: `inset 0 0 5px ${colors.success}`,
        focusBorderColor: `${inputColors.inputSuccessBorder}`,
        focusBoxShadow: `0 0 6px ${inputColors.inputSuccessBoxShadow}`,
        foregroundColor: colors.success,
        icon: 'ok'
      };
    case 'warning':
      return {
        addonBackgroundColor: backgroundColors.warning,
        borderColor: colors.warning,
        boxShadow: `inset 0 0 5px ${colors.warning}`,
        focusBorderColor: colors.warning,
        focusBoxShadow: `0 0 6px ${colors.warning}`,
        foregroundColor: colors.grayDarkest,
        icon: 'warning-sign'
      };
    case 'danger':
      return {
        addonBackgroundColor: backgroundColors.danger,
        borderColor: colors.danger,
        boxShadow: `inset 0 0 5px ${colors.danger}`,
        focusBorderColor: colors.danger,
        focusBoxShadow: '0 0 6px #f13a30',
        foregroundColor: colors.danger,
        icon: 'remove'
      };
    default:
      return {
        addonBackgroundColor: colors.grayLighter,
        borderColor: inputColors.inputDefaultBorder,
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
        focusBorderColor: inputColors.inputDefaultFocus,
        focusBoxShadow: `0 0 8px ${inputColors.inputDefaultBoxShadow}`
      };
  }
}
