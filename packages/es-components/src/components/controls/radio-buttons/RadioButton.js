import React from 'react';
import styled from 'styled-components';

import Label from '../label/Label';
import getRadioFillVariables from './radio-fill-variables';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';
import genId from '../../util/generateAlphaName';

function radioFill(color) {
  return `
    background-color: ${color};
    border-radius: 50%;
    content: '';
    display: block;
    height: 13px;
    left: 3px;
    position: relative;
    width: 13px;
    top: 3px;
    transition: background 0.25s linear;
  `;
}

const RadioLabel = styled(Label)`
  color: ${props => (props.disabled ? props.theme.colors.gray7 : 'inherit')};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: bold;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin-bottom: 10px;
  position: relative;
  padding: 10px 0 10px 10px;
  text-transform: none;

  &:hover .es-radio__fill:before {
    ${props => radioFill(props.hoverFillColor)};
  }

  @media (min-width: ${props => props.theme.screenSize.phone}) {
    display: ${props => (props.inline ? 'inline-flex' : 'flex')};
    margin-right: ${props => (props.inline ? '15px' : '0')};
  }

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    padding: 5px 0;
  }
`;

const RadioInput = styled.input`
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  position: absolute;

  &:focus ~ .es-radio__fill {
    box-shadow: 0 0 3px 3px ${props => props.theme.colors.inputFocus};
  }
`;

const RadioDisplay = styled.span`
  border: 3px solid ${props => props.borderColor};
  border-radius: 50%;
  box-sizing: border-box;
  height: 25px;
  margin-right: 8px;
  width: 25px;

  &:before {
    ${props => radioFill(props.fill)};
  }
`;

export function RadioButton({ name, children, ...radioProps }) {
  const id = radioProps.id || genId();

  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const { hover, fill } = getRadioFillVariables(
    radioProps.checked,
    radioProps.disabled,
    validationState,
    theme.colors
  );
  const radioDisplayFill = radioProps.checked ? fill : theme.colors.white;

  const labelProps = {
    disabled: radioProps.disabled,
    htmlFor: id,
    hoverFillColor: hover,
    validationState
  };
  const classNameState = `es-radio__input--${validationState}`;

  return (
    <RadioLabel className="es-radio" {...labelProps}>
      <RadioInput
        type="radio"
        name={name}
        className={classNameState}
        id={id}
        {...radioProps}
      />
      <RadioDisplay
        className="es-radio__fill"
        borderColor={fill}
        fill={radioDisplayFill}
      />
      {children}
    </RadioLabel>
  );
}

export default RadioButton;
