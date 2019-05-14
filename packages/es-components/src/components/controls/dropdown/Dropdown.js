import React from 'react';
import styled from 'styled-components';

import ValidationContext from '../ValidationContext';
import { useTheme } from '../../util/useTheme';
import {
  ValidationIconWrapper,
  ValidationIcon,
  InputWrapper
} from '../textbox/TextAddons';

const DropdownValidationIcon = styled(ValidationIcon)`
  right: 20px;
`;

const DropdownBase = styled.select`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray5};
  border-radius: 2px;
  box-shadow: ${props => props.boxShadow};
  box-sizing: border-box;
  color: ${props => props.theme.colors.black};
  flex: auto;
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: normal;
  height: 39px;
  padding: 6px 48px 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
    outline: 0;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray2};
    cursor: not-allowed;
  }
`;

function Dropdown(props) {
  const validationState = React.useContext(ValidationContext);
  const hasValidationIcon = validationState !== 'default';
  const theme = useTheme();

  return (
    <InputWrapper>
      <DropdownBase {...props} />
      {hasValidationIcon && (
        <ValidationIconWrapper>
          <DropdownValidationIcon
            aria-hidden="true"
            name={theme.validationIconName[validationState]}
            size={18}
          />
        </ValidationIconWrapper>
      )}
    </InputWrapper>
  );
}

export default Dropdown;
