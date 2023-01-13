import { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ValidationContext from '../ValidationContext';
import { FormContext } from '../../containers/form/Form';
import getStyledProp from '../../util/getStyledProp';
import { useTheme } from '../../util/useTheme';
import { darken } from '../../util/colors';
import isBool from '../../util/isBool';

export const validationStateInputStyles = css`
  border: 1px solid ${props => props.borderColor};
  box-shadow: 0 0 0 0 ${props => props.borderColor};
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

function getValidationStylesOrDefault(theme, validationState) {
  return (
    theme.validationInputColor[validationState] || {
      backgroundColor: theme.colors.white,
      backgroundColorFlat: theme.colors.gray2
    }
  );
}

export function useValidationStyleProps(props) {
  const validationState = useContext(ValidationContext);
  const fieldsetContext = useContext(FormContext);
  const flat = isBool(props.flat) ? props.flat : fieldsetContext.flat;
  const theme = useTheme();
  const [validationStyleProps, setValidationStyleProps] = useState(
    getValidationStylesOrDefault(theme, validationState)
  );
  useEffect(() => {
    setValidationStyleProps(
      getValidationStylesOrDefault(theme, validationState)
    );
  }, [validationState, theme]);

  const backgroundColor = flat
    ? validationStyleProps.backgroundColorFlat
    : validationStyleProps.backgroundColor;
  const disabledBackgroundColor = darken(backgroundColor, 7);
  const calculatedProps = { disabledBackgroundColor, backgroundColor };
  const finalProps = { flat };

  const validationProps = {
    ...validationStyleProps,
    ...calculatedProps,
    ...props,
    ...finalProps
  };

  return validationProps;
}
