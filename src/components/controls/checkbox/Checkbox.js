import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

import Label from '../Label';
import { sizes, colors, inputColors } from '../../theme';

/* eslint-disable no-confusing-arrow */
const CheckboxLabel = Label.extend`
  font-size: ${sizes.baseFontSize}px;
  font-weight: normal;
  text-transform: none;

  > .checkbox-fill {
    background-color: ${props =>
      props.isChecked ? colors.accent : colors.white};
    border-color: ${props =>
      props.isChecked ? colors.accent : colors.grayDark};

    &:after {
      border-color: ${colors.white};
    }
  }

  &:hover > .checkbox-fill:after {
    border-color: ${props =>
      props.isChecked ? colors.white : colors.grayLight};
  }

  &[disabled] > .checkbox-fill {
    background-color: ${props =>
      props.isChecked ? colors.gray : colors.white};
    border-color: ${colors.gray};
    cursor: not-allowed;
    outline: 0;

    &:after {
      border-color: ${colors.white};
    }
  }
`;
/* eslint-disable */

const CheckboxInput = styled.input`
  clip: rect(0, 0, 0, 0);
  position: absolute;

  &:focus ~ .checkbox-fill {
    outline: 5px auto ${inputColors.inputDefaultFocus};
  }
`;

const CheckboxWrapper = styled.span`
  background: ${colors.white};
  border: 3px solid ${colors.grayDarker};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: 25px;
  position: absolute;
  transition: all .25s linear;
  width: 25px;

  &:after {
    background: transparent;
    border: 3px solid ${colors.white};
    border-right: none;
    border-top: none;
    box-sizing: border-box;
    content: '';
    height: 9px;
    top: 3px;
    left: 2px;
    position: absolute;
    transform: rotate(-45deg);
    transition: border .25s linear;
    width: 15px;
  }
`;

const CheckboxText = styled.span`
  line-height: 1.4;
  margin-left: 30px;
`;

function Checkbox({
  labelText,
  value,
  isChecked = false,
  isDisabled = false,
  onClick = noop,
  onChange = noop
}) {
  return (
    <CheckboxLabel disabled={isDisabled} isChecked={isChecked}>
      <CheckboxInput
        type="checkbox"
        disabled={isDisabled}
        value={value}
        checked={isChecked}
        onClick={onClick}
        onChange={onChange}
        focusBorderColor={inputColors.inputDefaultFocus}
      />
      <CheckboxWrapper className="checkbox-fill" />
      <CheckboxText>
        {labelText}
      </CheckboxText>
    </CheckboxLabel>
  );
}

Checkbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isChecked: PropTypes.bool,
  /* Function to execute when a checkbox is clicked */
  onClick: PropTypes.func,
  /* Function to execute when a checkbox checked state is changed */
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool
};

export default Checkbox;
