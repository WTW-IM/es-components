import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

import Label from '../Label';
import { colors, sizes } from '../../theme';

import getRadioFillVariables from './radio-fill-variables';

function radioFill(color) {
  return `
    background-color: ${color};
    border-radius: 100%;
    content: '';
    display: block;
    height: 13px;
    left: 3px;
    position: absolute;
    width: 13px;
    top: 3px;
    transition: background 0.25s linear;
  `;
}

const RadioLabel = styled(Label)`
  color: ${props => (props.error ? colors.danger : 'inherit')};
  display: ${props => (props.inline ? 'inline-flex' : 'inherit')};
  font-size: ${sizes.baseFontSize}px;
  font-weight: normal;
  margin-right: ${props => (props.inline ? '20px' : 'initial')};
  min-height: 25px;
  position: relative;
  padding: 5px 0;
  text-transform: none;

  &:hover .radio-fill:before { ${props => radioFill(props.hoverFillColor)} }
`;

const RadioInput = styled.input`
  opacity: 0;
  position: absolute;

  &:focus ~ .radio-fill {
    box-shadow: 0 0 3px 3px #83bffc;
  }
`;

const RadioText = styled.span`
  align-self: center;
  margin-left: 30px;
`;

const RadioDisplay = styled.span`
  border: 3px solid ${props => props.borderColor};
  border-radius: 100%;
  box-sizing: border-box;
  display: block;
  height: 25px;
  position: absolute;
  width: 25px;

  &:before {
    ${props => radioFill(props.fill)};
  }
`;

function RadioButton({
  optionText,
  name,
  checked = false,
  id,
  isDisabled = false,
  inline = true,
  onClick = noop,
  value,
  hasError = false,
  ...radioProps
}) {
  const { hover, fill } = getRadioFillVariables(checked, isDisabled, hasError);
  const radioDisplayFill = checked ? fill : colors.white;

  const labelProps = {
    checked,
    inline,
    disabled: isDisabled,
    htmlFor: id,
    hoverFillColor: hover,
    error: hasError
  };

  return (
    <RadioLabel {...labelProps}>
      <RadioInput
        type="radio"
        name={name}
        id={id}
        onClick={onClick}
        value={value}
        disabled={isDisabled}
        {...radioProps}
      />
      <RadioDisplay
        className="radio-fill"
        borderColor={fill}
        fill={radioDisplayFill}
      />
      <RadioText>
        {optionText}
      </RadioText>
    </RadioLabel>
  );
}

RadioButton.propTypes = {
  optionText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.any,
  hasError: PropTypes.bool
};

export default RadioButton;
