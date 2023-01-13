import styled, { css } from 'styled-components';
import getStyledProp from '../../util/getStyledProp';

export const validationStateInputStyles = css`
  border: 1px solid ${props => props.borderColor};
  box-shadow: 0 0 0 0 ${getStyledProp('colors.white')}
    ${({ flat, boxShadow }) => !flat && `,${boxShadow}`};
  ${props =>
    props.flat
      ? css`
          background-color: ${props => props.backgroundColorFlat};
          border-width: 0;
          border-bottom-width: 2px;
        `
      : css`
          background-color: ${props => props.backgroundColor};
        `}

  &&:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props =>
      props.flat ? props.focusBoxShadowFlat : props.focusBoxShadow};
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
  transition: border-color linear 0.15s, box-shadow linear 0.15s;
  width: 100%;

  &:before {
    content: 'hola';
    background-color: red;
    display: block;
  }

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
