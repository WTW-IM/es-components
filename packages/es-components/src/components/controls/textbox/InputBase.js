import { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ValidationContext from '../ValidationContext';
import getStyledProp from '../../util/getStyledProp';
import { useTheme } from '../../util/useTheme';
import { darken } from '../../util/colors';

export const validationStateInputStyles = css`
  border: 1px solid ${props => props.borderColor};
  box-shadow: 0 0 0 0 ${getStyledProp('colors.white')}
    ${({ flat, boxShadow }) => !flat && `,${boxShadow}`};
  background-color: ${props => props.backgroundColor};
  ${props =>
    props.flat &&
    css`
      border-width: 0;
      border-bottom-width: 2px;
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
  border-radius: ${getStyledProp('inputStyles.borderRadius')};
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
    background-color: ${({ disabledBackgroundColor }) =>
      disabledBackgroundColor};
    cursor: not-allowed;
  }
`;

export function useValidationStyleProps(props) {
  const validationState = useContext(ValidationContext);
  const theme = useTheme();
  const [validationStyleProps, setValidationStyleProps] = useState(
    theme.validationInputColor[validationState]
  );
  useEffect(() => {
    setValidationStyleProps(theme.validationInputColor[validationState]);
  }, [validationState, theme.validationInputColor]);

  const backgroundColor = props.flat
    ? validationStyleProps.backgroundColorFlat
    : validationStyleProps.backgroundColor;
  const disabledBackgroundColor = darken(backgroundColor, 7);

  const validationProps = {
    ...validationStyleProps,
    ...{ backgroundColor, disabledBackgroundColor },
    ...props
  };

  return validationProps;
}
