import { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ValidationContext from '../ValidationContext';
import { FormContext } from '../../containers/form/Form';
import getStyledProp from '../../util/getStyledProp';
import { useTheme } from '../../util/useTheme';
import { darken } from '../../util/colors';
import isBool from '../../util/isBool';

export const noInset = 'inset 0 0 0 0 rgba(0, 0, 0, 0)';

export const validationStateHighlightStyles = css`
  border-color: ${props => props.focusBorderColor};
  box-shadow: ${props =>
      props.flat ? props.focusBoxShadowFlat : props.focusBoxShadow},
    ${noInset};
`;

export const validationStateInputStyles = css`
  border: 1px solid ${props => props.borderColor};
  ${props =>
    props.flat &&
    css`
      border-width: 0;
      border-bottom-width: 2px;
    `}
`;

export const validationStateReadonlyStyles = css`
  background-color: ${({ disabledBackgroundColor }) => disabledBackgroundColor};
  cursor: text;
`;

export const validationStateSetupStyles = css`
  background-color: ${props => props.backgroundColor};
  box-shadow: 0 0 0 0 ${props => props.borderColor},
    ${({ flat, boxShadow }) => (flat ? noInset : boxShadow)};
  transition: border-color linear 0.15s, box-shadow linear 0.15s;
`;

export const placeholderStyles = css`
  color: ${({ theme }) => theme.colors.gray7};
`;

const InputBase = styled.input`
  ${validationStateInputStyles}
  ${validationStateSetupStyles}
  box-sizing: border-box;
  color: ${getStyledProp('colors.black')};
  font-size: ${getStyledProp('font.baseFontSize')};
  font-face: ${getStyledProp('font.baseFontFace')};
  font-weight: normal;
  height: 2.2em;
  line-height: ${getStyledProp('font.baseLineHeight')};
  min-width: 0;
  padding: 6px 12px;
  width: 100%;

  && {
    outline: 0;
  }

  &::placeholder {
    ${placeholderStyles}
  }

  &:disabled,
  &:disabled:read-only {
    ${validationStateReadonlyStyles}
    cursor: not-allowed;
  }
`;
export default InputBase;

export const basicTextboxStyles = css`
  ${validationStateSetupStyles}

  display: table-cell;
  -webkit-appearance: none;

  &&:read-only {
    ${validationStateReadonlyStyles}
  }
`;

export const BasicTextbox = styled(InputBase)`
  ${basicTextboxStyles}
  ${validationStateInputStyles}
  border-radius: ${getStyledProp('inputStyles.borderRadius')};
  &&:focus {
    ${validationStateHighlightStyles}
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
  const formContext = useContext(FormContext);
  const flat = isBool(props.flat) ? props.flat : formContext.flat;
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
