import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { Label } from '../BaseControls';
import getRadioFillVariables from './radio-fill-variables';

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
  color: ${props => props.theme.colors[props.validationState]};
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: bold;
  margin-bottom: 0;
  margin-right: ${props => (props.inline ? '15px' : 'initial')};
  position: relative;
  padding: 5px 0;
  text-transform: none;

  &:hover .es-radio__fill:before {
    ${props => radioFill(props.hoverFillColor)};
  }

  @media (max-width: ${props => props.theme.screenSize.phone}) {
    display: flex;
    margin-right: initial;
  }
`;

const RadioInput = styled.input`
  opacity: 0;
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
  margin-right: 5px;
  width: 25px;

  &:before {
    ${props => radioFill(props.fill)};
  }
`;

export function RadioButton({
  optionText,
  name,
  isChecked,
  id,
  isDisabled,
  inline,
  validationState,
  theme,
  ...radioProps
}) {
  const { hover, fill } = getRadioFillVariables(
    isChecked,
    isDisabled,
    validationState,
    theme.colors
  );
  const radioDisplayFill = isChecked ? fill : theme.colors.white;

  const labelProps = {
    inline,
    disabled: isDisabled,
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
        id={id}
        disabled={isDisabled}
        checked={isChecked}
        className={classNameState}
        {...radioProps}
      />
      <RadioDisplay
        className="es-radio__fill"
        borderColor={fill}
        fill={radioDisplayFill}
      />
      {optionText}
    </RadioLabel>
  );
}

RadioButton.propTypes = {
  optionText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  inline: PropTypes.bool,
  /** Display radio button with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

RadioButton.defaultProps = {
  isChecked: false,
  id: undefined,
  isDisabled: false,
  inline: true,
  validationState: 'default'
};

export default withTheme(RadioButton);
