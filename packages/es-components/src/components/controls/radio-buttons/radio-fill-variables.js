export default function getRadioFillVariables(
  isChecked,
  isDisabled,
  validationState,
  colors
) {
  const isNotDisabled = !isDisabled;
  const isValid = validationState === 'default';

  if (isDisabled) {
    return { fill: colors.gray5 };
  }

  if (isNotDisabled && !isValid) {
    return {
      fill: colors[validationState],
      hover: colors.gray3
    };
  }

  if (isChecked && isNotDisabled) {
    return {
      fill: colors.primary
    };
  }

  return {
    fill: colors.gray8,
    hover: colors.gray3
  };
}
