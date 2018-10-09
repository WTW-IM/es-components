export default function getRadioFillVariables(
  isChecked,
  isDisabled,
  validationState,
  colors
) {
  const isNotChecked = !isChecked;
  const isNotDisabled = !isDisabled;
  const isValid = validationState === 'default';

  if (isNotChecked && isDisabled && isValid) {
    return {
      hover: colors.white,
      fill: colors.gray5
    };
  }

  if (isNotChecked && isNotDisabled && !isValid) {
    return {
      fill: colors[validationState],
      hover: colors.gray8
    };
  }

  if (isChecked && isNotDisabled) {
    return {
      fill: colors.info
    };
  }

  if (isChecked && isDisabled && isValid) {
    return {
      fill: colors.gray5
    };
  }

  return {
    hover: colors.gray8,
    fill: colors.gray8
  };
}
