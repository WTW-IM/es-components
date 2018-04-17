export default function getRadioFillVariables(
  isChecked,
  isDisabled,
  isInvalid,
  colors
) {
  const isNotChecked = !isChecked;
  const isNotDisabled = !isDisabled;
  const isValid = !isInvalid;

  if (isNotChecked && isDisabled && isValid) {
    return {
      hover: colors.white,
      fill: colors.gray5
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
      fill: colors.info
    };
  }

  if (isChecked && isDisabled && isValid) {
    return {
      fill: colors.gray5
    };
  }

  if (isChecked && isNotDisabled && isInvalid) {
    return {
      fill: colors.danger
    };
  }

  return {
    hover: colors.gray8,
    fill: colors.gray8
  };
}
