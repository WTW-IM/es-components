import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { noop } from 'lodash';

import defaultTheme from '../../theme/defaultTheme';
import Label from '../Label';

/* eslint-disable no-confusing-arrow */
const CheckboxLabel = Label.extend`
  font-size: ${props => props.theme.sizes.baseFontSize}px;
  font-weight: normal;
  text-transform: none;
  display: flex;

  > .checkbox-fill {
    background-color: ${props =>
      props.isChecked ? props.theme.colors.accent : props.theme.colors.white};
    border-color: ${props =>
      props.isChecked
        ? props.theme.colors.accent
        : props.theme.colors.grayDark};

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }

  &:hover > .checkbox-fill:after {
    border-color: ${props =>
      props.isChecked
        ? props.theme.colors.white
        : props.theme.colors.grayLight};
  }

  &[disabled] > .checkbox-fill {
    background-color: ${props =>
      props.isChecked ? props.theme.colors.gray : props.theme.colors.white};
    border-color: ${props => props.theme.colors.gray};
    cursor: not-allowed;
    outline: 0;

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }
`;
/* eslint-enable */

const CheckboxInput = styled.input`
  clip: rect(0, 0, 0, 0);
  position: absolute;

  &:focus ~ .checkbox-fill {
    outline: 5px auto ${props => props.theme.colors.inputFocus};
  }
`;

const CheckboxWrapper = styled.span`
  background: ${props => props.theme.colors.white};
  border: 3px solid ${props => props.theme.colors.grayDarker};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: 25px;
  transition: all 0.25s linear;
  width: 25px;

  &:after {
    background: transparent;
    border: 3px solid ${props => props.theme.colors.white};
    border-right: none;
    border-top: none;
    box-sizing: border-box;
    content: '';
    height: 9px;
    display: block;
    transform: rotate(-45deg);
    transition: border 0.25s linear;
    width: 15px;
    margin: 3px 0 0 2px;
  }
`;

const CheckboxText = styled.span`
  line-height: 1.4;
  margin-left: 5px;
`;

function Checkbox({
  labelText,
  value,
  isChecked = false,
  isDisabled = false,
  onClick = noop,
  onChange = noop,
  theme
}) {
  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <ThemeProvider theme={theme}>
      <CheckboxLabel disabled={isDisabled} isChecked={isChecked}>
        <CheckboxInput
          type="checkbox"
          disabled={isDisabled}
          value={value}
          checked={isChecked}
          onClick={onClick}
          onChange={onChange}
          focusBorderColor={theme.colors.inputFocus}
        />
        <CheckboxWrapper className="checkbox-fill" />
        <CheckboxText>{labelText}</CheckboxText>
      </CheckboxLabel>
    </ThemeProvider>
  );
  /* eslint-enable */
}

Checkbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isChecked: PropTypes.bool,
  /* Function to execute when a checkbox is clicked */
  onClick: PropTypes.func,
  /* Function to execute when a checkbox checked state is changed */
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

Checkbox.defaultProps = {
  theme: defaultTheme
};

export default Checkbox;
