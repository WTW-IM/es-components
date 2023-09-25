import React, { useMemo } from 'react';
import * as CSS from 'csstype';
import styled, { DefaultTheme, css } from 'styled-components';
import { ValidationStyleType } from 'es-components-shared-types';

import Label from '../label/Label';
import { useTheme } from '../../util/useTheme';
import { useValidationState } from '../ValidationContext';
import useUniqueId from '../../util/useUniqueId';
import {
  HTMLInputProps,
  htmlInputPropTypes,
  htmlInputDefaultProps
} from '../../util/htmlProps';
import { lighten } from '../../util/colors';
import {
  useRadioGroupContext,
  RadioGroupContextShape
} from './RadioGroupContext';

export const RadioDisplayWrapper = styled.div``;

export const RadioDisplay = styled.span`
  align-items: center;
  border-radius: 50%;
  border-style: solid;
  border-width: 3px;
  box-sizing: border-box;
  display: flex;
  height: 25px;
  justify-content: center;
  margin-right: 8px;
  min-width: 25px;

  &:before {
    background-color: transparent;
    border-radius: 50%;
    content: '';
    display: block;
    height: 13px;
    width: 13px;
    transition: background 0.25s linear;
  }
`;

export const RadioInput = styled.input<{ fill: CSS.Property.BackgroundColor }>`
  ${({
    theme: {
      colors: { inputFocus },
      validationInputColor: {
        default: { borderColor: disabledColor }
      }
    },
    fill
  }) => css`
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
    position: absolute;

    ~ ${RadioDisplay} {
      border-color: ${fill};
    }

    &:focus ~ ${RadioDisplay} {
      box-shadow: 0 0 3px 3px ${inputFocus};
    }

    &:checked ~ ${RadioDisplay}:before {
      background-color: ${fill};
    }

    &&:disabled {
      ~ ${RadioDisplay} {
        border-color: ${disabledColor};
      }

      &:checked ~ ${RadioDisplay}:before {
        background-color: ${disabledColor};
      }
    }
  `}
`;

const RadioLabel = styled(Label)<{ hover: CSS.Property.BackgroundColor }>`
  ${({ theme, hover }) => css`
    align-self: flex-start;
    cursor: pointer;
    display: flex;
    font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma,
      sans-serif;
    font-size: ${theme.font.baseFontSize};
    font-weight: normal;
    line-height: ${theme.font.baseLineHeight};
    margin-right: 15px;
    margin-bottom: 10px;
    position: relative;
    padding: 10px 0 10px 10px;
    text-transform: none;

    @media (min-width: ${theme.screenSize.tablet}) {
      padding: 5px 0;
    }

    &:hover {
      & > ${RadioDisplayWrapper} {
        &
          > ${RadioInput}:not(:disabled):not(:checked)
          ~ ${RadioDisplay}:before {
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
  contextProps: RadioGroupContextShape
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

export const getValidationSelectionColors = (
  theme: DefaultTheme,
  validationState: ValidationStyleType,
  checked?: boolean
): ValidationSelectionColors => {
  const targetColor =
    validationState === 'default' && checked
      ? theme.colors.primary
      : theme.validationTextColor[validationState];
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
      fill,
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
RadioButton.defaultProps = {
  ...htmlInputDefaultProps,
  displayClassName: ''
};

export default RadioButton;
