import React, { useMemo } from 'react';
import * as CSS from 'csstype';
import styled, { DefaultTheme, css } from 'styled-components';
import { ValidationStyleType } from 'es-components-shared-types';

import Label from '../label/Label';
import { useTheme } from '../../util/useTheme';
import { useValidationState } from '../ValidationContext';
import useUniqueId from '../../util/useUniqueId';
import { HTMLInputProps, htmlInputPropTypes } from '../../util/htmlProps';
import { lighten } from '../../util/colors';
import {
  useRadioGroupContext,
  RadioGroupContextShape
} from './RadioGroupContext';

export const RadioDisplayWrapper = styled.div``;

export const RadioDisplay = styled.span`
  display: flex;
  min-width: 25px;
  height: 25px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-style: solid;
  border-radius: 50%;
  margin-right: 8px;

  &::before {
    display: block;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: transparent;
    content: '';
    transition: background 0.25s linear;
  }
`;

export const RadioInput = styled.input.withConfig({
  shouldForwardProp: prop =>
    !['selectedValue', 'disableAllOptions'].includes(prop)
})<{ $fill: CSS.Property.BackgroundColor }>`
  ${({
    theme: {
      colors: { inputFocus, disabled: disabledColor },
      validationInputColor: {
        default: { borderColor: disabledBorderColor }
      }
    },
    $fill
  }) => css`
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;

    ~ ${RadioDisplay} {
      border-color: ${$fill};
    }

    &:focus ~ ${RadioDisplay} {
      box-shadow: 0 0 3px 3px ${inputFocus};
    }

    &:checked ~ ${RadioDisplay}::before {
      background-color: ${$fill};
    }

    &&:disabled {
      ~ ${RadioDisplay} {
        border-color: ${disabledColor || disabledBorderColor};
      }

      &:checked ~ ${RadioDisplay}::before {
        background-color: ${disabledColor || disabledBorderColor};
      }
    }
  `}
`;

const RadioLabel = styled(Label).withConfig({
  shouldForwardProp: prop => !['validationState'].includes(prop)
})<{ hover: CSS.Property.BackgroundColor }>`
  ${({ theme, hover }) => css`
    position: relative;
    display: flex;
    align-self: flex-start;
    padding: 10px 0 10px 10px;
    margin-right: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    font-family:
      'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
    font-size: ${theme.font.baseFontSize};
    font-weight: normal;
    line-height: ${theme.font.baseLineHeight};
    text-transform: none;

    @media (min-width: ${theme.screenSize.tablet}) {
      padding: 5px 0;
    }

    &:hover {
      & > ${RadioDisplayWrapper} {
        &
          > ${RadioInput}:not(:disabled):not(:checked)
          ~ ${RadioDisplay}::before {
          background-color: ${hover};
        }
      }
    }
  `}
`;

export type RadioButtonProps = HTMLInputProps & {
  displayClassName?: string;
};

const getOnChange =
  (
    ...onChanges: (HTMLInputProps['onChange'] | undefined)[]
  ): React.ChangeEventHandler<HTMLInputElement> =>
  event => {
    onChanges.forEach(c => c?.(event));
  };

export function getCheckedProps(
  radioProps: RadioButtonProps,
  contextProps: RadioGroupContextShape<boolean>
) {
  const checked = Boolean(
    radioProps.checked ||
      radioProps.defaultChecked ||
      contextProps.selectedValue === radioProps.value
  );
  const onChanges = [radioProps.onChange, contextProps.onChange];
  return onChanges.some(c => c)
    ? {
        onChange: getOnChange(...onChanges),
        checked,
        defaultChecked: undefined
      }
    : {
        defaultChecked: checked,
        checked: undefined
      };
}

export interface ValidationSelectionColors {
  fill: CSS.Property.BackgroundColor;
  hover: CSS.Property.BackgroundColor;
}

const defaultPrimary = '#0073b6';

export const getValidationSelectionColors = (
  theme: DefaultTheme | undefined,
  validationState: ValidationStyleType,
  checked?: boolean
): ValidationSelectionColors => {
  const targetColor =
    validationState === 'default' && checked
      ? (theme?.colors.primary ?? defaultPrimary)
      : (theme?.validationTextColor[validationState] ?? defaultPrimary);
  return {
    fill: targetColor,
    hover: lighten(targetColor, 40)
  };
};

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  function ForwardedRadioButton(
    { children, className, displayClassName, ...radioProps },
    ref
  ) {
    const contextProps = useRadioGroupContext();
    const { disableAllOptions } = contextProps;
    const id = useUniqueId(radioProps.id);
    const checkedProps = getCheckedProps(radioProps, contextProps);
    const checked = checkedProps.checked || checkedProps.defaultChecked;
    const theme = useTheme();
    const validationState = useValidationState();
    const { fill, hover } = useMemo(
      () => getValidationSelectionColors(theme, validationState, checked),
      [theme, validationState, checked]
    );
    const disabled = radioProps.disabled || disableAllOptions;

    const labelProps = {
      htmlFor: id,
      disabled,
      validationState,
      checked,
      hover
    };

    const inputProps = {
      ...contextProps,
      ...radioProps,
      disabled,
      $fill: fill,
      ...checkedProps
    };

    const displayWrapperClasses = `${displayClassName || ''} ${
      contextProps.displayClassName || ''
    }`.trim();

    return (
      <RadioLabel className={className} {...labelProps}>
        <RadioDisplayWrapper className={displayWrapperClasses}>
          <RadioInput ref={ref} type="radio" id={id} {...inputProps} />
          <RadioDisplay className="es-radio__fill" />
        </RadioDisplayWrapper>
        {children}
      </RadioLabel>
    );
  }
);

export const propTypes = {
  ...htmlInputPropTypes,
  /** supports styled-component usage, applies to the wrapping Label */
  className: htmlInputPropTypes['className'],
  /** applies to the display wrapper */
  displayClassName: htmlInputPropTypes['className']
};

RadioButton.propTypes = propTypes;

export default RadioButton;
