import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from '../label/Label';
import getRadioFillVariables from './radio-fill-variables';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';
import useUniqueId from '../../util/useUniqueId';

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
  align-self: flex-start;
  cursor: pointer;
  display: flex;
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${props => props.theme.font.baseFontSize};
  font-weight: normal;
  line-height: ${props => props.theme.font.baseLineHeight};
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  padding: 10px 0 10px 10px;
  text-transform: none;

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
  min-width: 25px;

  &:before {
    ${props => radioFill(props.fill)};
  }
`;

export function RadioButton({ children, className, ...radioProps }) {
  const id = useUniqueId(radioProps.id);
  const isChecked = radioProps.checked;
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

  const inputProps = {
    ...radioProps,
    checked: isChecked
  };

  return (
    <RadioLabel className={className} {...labelProps}>
      <RadioInput type="radio" id={id} {...inputProps} />
      <RadioDisplay
        className="es-radio__fill"
        borderColor={fill}
        fill={radioDisplayFill}
      />
      {children}
    </RadioLabel>
  );
}

RadioButton.propTypes = {
  /** supports styled-component usage, applies to the wrapping Label */
  className: PropTypes.string,
  children: PropTypes.any
};

RadioButton.defaultProps = {
  className: undefined,
  children: undefined
};

export default RadioButton;
