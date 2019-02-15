import React from 'react';
import styled from 'styled-components';

import Label from '../label/Label';
import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

const backgroundColorSelect = (checked, theme, validationState) => {
  if (checked) {
    return validationState === 'default'
      ? theme.colors.primary
      : theme.colors[validationState];
  }
  return theme.colors.white;
};

const CheckboxLabel = styled(Label)`
  color: inherit;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: bold;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin-left: -10px;
  min-height: 25px;
  padding: 10px 0 10px 42px;
  position: relative;
  flex: 1 0 auto;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin-left: 0;
    padding: 5px 0 5px 32px;
  }

  > .es-checkbox__fill {
    background-color: ${({ checked, theme, validationState }) =>
      backgroundColorSelect(checked, theme, validationState)};
    border-color: ${({ checked, theme, validationState }) =>
      checked && validationState === 'default'
        ? theme.colors.primary
        : theme.colors[validationState]};

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }

  &:hover > .es-checkbox__fill:after {
    border-color: ${({ checked, theme }) =>
      checked ? theme.colors.white : theme.colors.gray3};
  }

  &[disabled] > .es-checkbox__fill {
    background-color: ${({ checked, theme }) =>
      checked ? theme.colors.gray5 : theme.colors.white};
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

function Checkbox({ children, ...checkboxProps }) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);

  return (
    <CheckboxLabel
      validationState={validationState}
      checked={checkboxProps.checked}
      disabled={checkboxProps.disabled}
    >
      <CheckboxInput
        type="checkbox"
        focusBorderColor={theme.colors.inputFocus}
        {...checkboxProps}
      />
      <CheckboxDisplay className="es-checkbox__fill" />
      {children}
    </CheckboxLabel>
  );
}

export default Checkbox;
