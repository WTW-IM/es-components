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
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  padding: 10px 0 10px 10px;
  text-transform: none;
  flex-basis: 15%;

  &:hover .es-radio__fill:before {
    ${props => !props.checked && radioFill(props.hoverFillColor)};
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
  const isChecked = radioProps.checked || radioProps.defaultChecked;
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);
  const { hover, fill } = getRadioFillVariables(
    isChecked,
    radioProps.disabled,
    validationState,
    theme.colors
  );
  const radioDisplayFill = isChecked ? fill : theme.colors.white;

  const labelProps = {
    disabled: radioProps.disabled,
    htmlFor: id,
    hoverFillColor: hover,
    validationState,
    checked: isChecked
  };

  return (
    <RadioLabel {...labelProps}>
      <RadioInput type="radio" name={name} id={id} {...radioProps} />
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
