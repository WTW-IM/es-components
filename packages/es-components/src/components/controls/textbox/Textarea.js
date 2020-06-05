import React from 'react';
import styled from 'styled-components';

import { useTheme } from '../../util/useTheme';
import ValidationContext from '../ValidationContext';

const TextareaBase = styled.textarea`
  border: 1px solid ${props => props.borderColor};
  border-radius: 2px;
  box-shadow: ${props => props.boxShadow};
  box-sizing: border-box;
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.font.baseFontSize};
  font-weight: normal;
  line-height: ${props => props.theme.font.baseLineHeight};
  min-width: 0;
  padding: 6px 12px;
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

  &:read-only {
    background-color: ${props => props.theme.colors.gray2};
    cursor: text;
  }
`;

const Textarea = React.forwardRef(function Textarea(props, ref) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);

  return (
    <TextareaBase
      ref={ref}
      {...props}
      {...theme.validationInputColor[validationState]}
    />
  );
});

export default Textarea;
