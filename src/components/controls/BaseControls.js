import styled from 'styled-components';

import { colors, sizes } from '../theme';

export const LabelText = styled.span`
  align-self: ${props => (props.inline ? 'center' : 'initial')};
  color: ${props => props.foregroundColor || 'inherit'};
  flex: 0 auto;
  flex-basis: 90px;
  display: block;
  margin-bottom: ${props => (props.inline ? 'initial' : '5px')};
`;

const baseStyles = `
  border-radius: 2px;
  box-sizing: border-box;
  color: ${colors.grayDarkest};
  font-size: ${sizes.baseFontSize}px;
  font-weight: normal;
  height: 39px;
  padding: 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  width: 100%;

  &:focus {
    outline: 0;
  }

  &:disabled {
    background-color: ${colors.grayLighter};
    cursor: not-allowed;
  }
`;

export const InputBase = styled.input`
  ${baseStyles}
  border: 1px solid ${props => props.borderColor};
  box-shadow: ${props => props.boxShadow};

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }

  &:read-only {
    background-color: ${colors.grayLighter};
    cursor: text;
  }
`;

export const SelectBase = styled.select`
  ${baseStyles}
  background-color: ${colors.white};
  border: 1px solid ${props => props.borderColor};

  color: ${props => props.foregroundColor};

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }
`;
