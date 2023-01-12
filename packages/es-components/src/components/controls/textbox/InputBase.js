import styled, { css } from 'styled-components';
import getStyledProp from '../../util/getStyledProp';

export const validationStateInputStyles = css`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  ${props =>
    !props.flat
      ? `box-shadow: ${props => props.boxShadow}`
      : `border-bottom: 2px solid ${props => props.borderColor};`}

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
    outline: 0;
  }
`;

export default styled.input`
  ${validationStateInputStyles}
  border-radius: 2px;
  box-sizing: border-box;
  color: ${getStyledProp('colors.black')};
  font-size: ${getStyledProp('font.baseFontSize')};
  font-face: ${getStyledProp('font.baseFontFace')};
  font-weight: normal;
  height: 2.2em;
  line-height: ${getStyledProp('font.baseLineHeight')};
  min-width: 0;
  padding: 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  width: 100%;

  &:disabled,
  &:disabled:read-only {
    background-color: ${getStyledProp('colors.gray2')};
    cursor: not-allowed;
  }

  &:read-only {
    background-color: ${getStyledProp('colors.gray2')};
    cursor: text;
  }
`;
