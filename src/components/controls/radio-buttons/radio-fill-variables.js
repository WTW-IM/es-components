export default function getRadioFillVariables(
  colors,
  isChecked,
  isDisabled,
  isInvalid
) {
  const isNotChecked = !isChecked;
  const isNotDisabled = !isDisabled;
  const isValid = !isInvalid;

  if (isNotChecked && isDisabled && isValid) {
    return {
      hover: colors.white,
      fill: colors.gray
    };
  }

  if (isNotChecked && isNotDisabled && isInvalid) {
    return {
      fill: colors.danger,
      hover: colors.danger
    };
  }

  if (isChecked && isNotDisabled && isValid) {
    return {
      fill: colors.accent
    };
  }

  if (isChecked && isDisabled && isValid) {
    return {
      fill: colors.gray
    };
  }

  if (isChecked && isNotDisabled && isInvalid) {
    return {
      fill: colors.danger
    };
  }

  return {
    hover: colors.grayDarker,
    fill: colors.grayDarker
  };
}
