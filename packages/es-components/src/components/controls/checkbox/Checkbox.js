import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { noop } from 'lodash';
import viaTheme from 'es-components-via-theme';

import Label from '../Label';

/* eslint-disable no-confusing-arrow */
const CheckboxLabel = Label.extend`
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: normal;
  text-transform: none;
  display: flex;

  > .es-checkbox__fill {
    background-color: ${({ isChecked, theme }) =>
      isChecked ? theme.colors.info : theme.colors.white};
    border-color: ${({ isChecked, theme }) =>
      isChecked ? theme.colors.info : theme.colors.gray6};

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }

  &:hover > .es-checkbox__fill:after {
    border-color: ${({ isChecked, theme }) =>
      isChecked ? theme.colors.white : theme.colors.gray3};
  }

  &[disabled] > .es-checkbox__fill {
    background-color: ${({ isChecked, theme }) =>
      isChecked ? theme.colors.gray5 : theme.colors.white};
    border-color: ${props => props.theme.colors.gray5};
    cursor: not-allowed;
    outline: 0;

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }
`;

const CheckboxInput = styled.input`
  clip: rect(0, 0, 0, 0);
  position: absolute;

  &:focus ~ .es-checkbox__fill {
    box-shadow: 0 0 3px 3px ${props => props.theme.colors.inputFocus};
    &:after {
      border-color: ${({ checked, theme }) =>
        checked ? theme.colors.white : theme.colors.gray3};
    }
  }
`;
/* eslint-enable */

const CheckboxWrapper = styled.span`
  background: ${props => props.theme.colors.white};
  border: 3px solid ${props => props.theme.colors.gray8};
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
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin-left: 5px;
`;

function Checkbox({
  labelText,
  value,
  isChecked = false,
  isDisabled = false,
  onClick = noop,
  onChange = noop,
  ariaLabel,
  theme
}) {
  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <ThemeProvider theme={theme}>
      <CheckboxLabel
        className="es-checkbox__label"
        disabled={isDisabled}
        isChecked={isChecked}
      >
        <CheckboxInput
          className="es-checkbox"
          type="checkbox"
          disabled={isDisabled}
          value={value}
          checked={isChecked}
          onClick={onClick}
          onChange={onChange}
          aria-label={ariaLabel}
          focusBorderColor={theme.colors.inputFocus}
        />
        <CheckboxWrapper className="es-checkbox__fill" />
        <CheckboxText className="es-checkbox__text" aria-hidden={!!ariaLabel}>
          {labelText}
        </CheckboxText>
      </CheckboxLabel>
    </ThemeProvider>
  );
  /* eslint-enable */
}

Checkbox.propTypes = {
  labelText: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the aria-label attribute */
  ariaLabel: PropTypes.string,
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
  theme: viaTheme
};

export default withTheme(Checkbox);
