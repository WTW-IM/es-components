import React from 'react';
import * as CSS from 'csstype';
import styled, { css } from 'styled-components';

import Label from '../label/Label';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';
import useUniqueId from '../../util/useUniqueId';
import {
  HTMLInputProps,
  htmlInputPropTypes,
  htmlInputDefaultProps
} from '../../util/htmlProps';
import { lighten } from '../../util/colors';

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

    &:hover
      > ${RadioInput}:not(:disabled):not(:checked)
      ~ ${RadioDisplay}:before {
      background-color: ${hover};
    }
  `}
`;

export type RadioButtonProps = HTMLInputProps;

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  function ForwardedRadioButton({ children, className, ...radioProps }, ref) {
    const id = useUniqueId(radioProps.id);
    const checked = radioProps.checked || radioProps.defaultChecked;
    const theme = useTheme();
    const validationState = React.useContext(ValidationContext);
    const fill =
      validationState === 'default' && checked
        ? theme.colors.primary
        : theme.validationTextColor[validationState];
    const hover = lighten(fill, 40);

    const labelProps = {
      disabled: radioProps.disabled,
      htmlFor: id,
      validationState,
      checked,
      hover
    };

    const inputProps = {
      ...radioProps,
      checked,
      fill
    };

    return (
      <RadioLabel className={className} {...labelProps}>
        <RadioInput ref={ref} type="radio" id={id} {...inputProps} />
        <RadioDisplay className="es-radio__fill" />
        {children}
      </RadioLabel>
    );
  }
);

export const propTypes = {
  ...htmlInputPropTypes,
  /** supports styled-component usage, applies to the wrapping Label */
  className: htmlInputPropTypes['className']
};

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = { ...htmlInputDefaultProps };

export default RadioButton;
