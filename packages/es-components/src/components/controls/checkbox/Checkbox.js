import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { noop } from 'lodash';

import { Label } from '../BaseControls';

/* eslint-disable no-confusing-arrow */
const CheckboxLabel = styled(Label)`
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: bold;
  text-transform: none;
  display: flex;
  flex-flow: wrap;
  color: ${props => props.theme.colors[props.validationState]};

  > .es-checkbox__fill {
    background-color: ${({ isChecked, theme }) =>
      isChecked ? theme.colors.info : theme.colors.white};
    border-color: ${({ isChecked, theme, validationState }) =>
      isChecked ? theme.colors.info : theme.colors[validationState]};

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

const AdditionalHelpContent = styled.div`
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 400;
  margin: 10px 0 10px 0;
  text-transform: none;
  flex-basis: 100%;
`;

function Checkbox({
  name,
  labelText,
  value,
  isChecked,
  isDisabled,
  onClick,
  onChange,
  ariaLabel,
  validationState,
  additionalHelpContent,
  theme
}) {
  const helpId = additionalHelpContent ? `${name}-help` : undefined;
  const additionalHelp = additionalHelpContent && (
    <AdditionalHelpContent
      id={helpId}
      className="checkbox__help"
      validationState={validationState}
    >
      {additionalHelpContent}
    </AdditionalHelpContent>
  );
  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <CheckboxLabel
      className="es-checkbox"
      disabled={isDisabled}
      isChecked={isChecked}
      validationState={validationState}
    >
      <CheckboxInput
        name={name}
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
      {additionalHelp}
    </CheckboxLabel>
  );
  /* eslint-enable */
}

Checkbox.propTypes = {
  /** The name of the checkbox */
  name: PropTypes.string.isRequired,
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
  /** Display checkbox with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Content to display underneath the check box */
  additionalHelpContent: PropTypes.node,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired
};

Checkbox.defaultProps = {
  value: undefined,
  ariaLabel: undefined,
  isChecked: false,
  onClick: noop,
  onChange: noop,
  isDisabled: false,
  validationState: 'default',
  additionalHelpContent: undefined
};

export default withTheme(Checkbox);
