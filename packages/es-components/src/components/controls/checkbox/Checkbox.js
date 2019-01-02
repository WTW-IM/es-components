import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import CheckboxLabel from '../../containers/checkboxLabel/CheckboxLabel';

const CheckboxInput = styled.input`
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  position: absolute;

  &:focus ~ .es-checkbox__fill {
    box-shadow: 0 0 3px 3px ${props => props.theme.colors.inputFocus};
    &:after {
      border-color: ${({ checked, theme }) =>
        checked ? theme.colors.white : theme.colors.gray3};
    }
  }
`;

const CheckboxDisplay = styled.span`
  background: ${props => props.theme.colors.white};
  border: 3px solid ${props => props.theme.colors.gray8};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: 25px;
  left: 10px;
  position: absolute;
  top: 0.55em;
  transition: all 0.25s linear;
  width: 25px;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    left: 0;
    top: 0.35em;
  }

  &:after {
    background: transparent;
    border: 3px solid ${props => props.theme.colors.white};
    border-right: none;
    border-top: none;
    box-sizing: border-box;
    content: '';
    display: block;
    height: 9px;
    margin: 3px 0 0 2px;
    transform: rotate(-45deg);
    transition: border 0.25s linear;
    width: 15px;
  }
`;

const AdditionalHelpContent = styled.div`
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 400;
  margin: 10px 0 10px 0;
  position: relative;
  right: 32px;
`;

function Checkbox({
  name,
  labelText,
  validationState,
  additionalHelpContent,
  theme,
  ...checkboxProps
}) {
  const helpId = additionalHelpContent ? `${name}-help` : undefined;
  const additionalHelp = additionalHelpContent && (
    <AdditionalHelpContent
      id={helpId}
      className="es-checkbox__help"
      validationState={validationState}
    >
      {additionalHelpContent}
    </AdditionalHelpContent>
  );

  return (
    <CheckboxLabel
      className="es-checkbox"
      validationState={validationState}
      checked={checkboxProps.checked}
      disabled={checkboxProps.disabled}
    >
      <CheckboxInput
        name={name}
        type="checkbox"
        focusBorderColor={theme.colors.inputFocus}
        {...checkboxProps}
      />
      <CheckboxDisplay className="es-checkbox__fill" />
      {labelText}
      {additionalHelp}
    </CheckboxLabel>
  );
}

Checkbox.propTypes = {
  /** The name of the checkbox */
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
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
  validationState: 'default',
  additionalHelpContent: undefined
};

export default withTheme(Checkbox);
