import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ValidationContext from '../ValidationContext';
import { FormContext } from '../../containers/form/Form';
import getStyledProp from '../../util/getStyledProp';
import { useTheme } from '../../util/useTheme';
import { darken } from '../../util/colors';
import isBool from '../../util/isBool';

export const noInset = 'inset 0 0 0 0 rgba(0, 0, 0, 0)';

export const validationStateHighlightStyles = css`
  border-color: ${({ focusBorderColor }) => focusBorderColor};
  box-shadow: ${({ focusBoxShadow }) => focusBoxShadow}, ${noInset};
`;

export const validationStateInputStyles = css`
  border: 1px solid ${props => props.borderColor};
  border-radius: ${props =>
    getStyledProp('inputStyles.borderRadius')(props) || '2px'};
  box-sizing: border-box;
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

const maybeGetComma = ({ flat, boxShadow }) => (flat || boxShadow) && ', ';

export const validationStateSetupStyles = css`
  background-color: ${props => props.backgroundColor};
  box-shadow: 0 0 0 0 ${props => props.borderColor}${maybeGetComma}${({
      flat,
      boxShadow
    }) => (flat ? noInset : boxShadow)};
  transition: border-color linear 0.15s, box-shadow linear 0.15s;
`;

export const placeholderStyles = css`
  color: ${({ theme }) => theme.colors.gray7};
`;

const InputBaseComponent = styled.input`
  ${validationStateInputStyles}
  ${validationStateSetupStyles}
  color: ${getStyledProp('colors.black')};
  font-size: ${getStyledProp('font.baseFontSize')};
  font-family: ${getStyledProp('font.baseFontFace')};
  font-weight: normal;
  height: 2.2em;
  line-height: ${getStyledProp('font.baseLineHeight')};
  min-width: 0;
  padding: 6px 12px;
  flex: 1;

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
const InputBase = React.forwardRef(function ForwardedInputBase(props, ref) {
  const validationStyleProps = useValidationStyleProps(props);
  return <InputBaseComponent ref={ref} {...validationStyleProps} />;
});

export const propTypes = {
  ...(InputBaseComponent.propTypes || {})
};

export const defaultProps = {
  ...(InputBaseComponent.defaultProps || {})
};

InputBase.propTypes = propTypes;
InputBase.defaultProps = defaultProps;

export default InputBase;

export const basicTextboxStyles = css`
  ${validationStateSetupStyles}

  display: table-cell;
  -webkit-appearance: none;

  &&:read-only {
    ${validationStateReadonlyStyles}
  }
`;

export const BasicTextboxComponent = styled(InputBaseComponent)`
  ${basicTextboxStyles}
  &&:focus {
    ${validationStateHighlightStyles}
  }
`;

export const BasicTextbox = React.forwardRef(function ForwardedBasicTextbox(
  props,
  ref
) {
  const validationStyleProps = useValidationStyleProps(props);
  return <BasicTextboxComponent ref={ref} {...validationStyleProps} />;
});

function getValidationStylesOrDefault(theme, validationState) {
  const validationTarget =
    theme.validationInputColor[validationState] ||
    theme.validationInputColor.default ||
    {};
  return validationTarget;
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

  const getValidationProp = (propName, fallback) =>
    validationStyleProps[propName] || fallback;

  const backgroundColor = flat
    ? getValidationProp('backgroundColorFlat', theme.colors.gray1)
    : getValidationProp('backgroundColor', theme.colors.white);

  const focusBoxShadow = flat
    ? getValidationProp(
        'focusBoxShadowFlat',
        `0 0 1px 2px ${validationStyleProps.focusBorderColor}`
      )
    : validationStyleProps.focusBoxShadow;

  const addOn = getValidationProp('addOn', {
    textColor: validationState === 'default' ? theme.colors.gray8 : 'white',
    backgroundColor:
      validationState === 'default'
        ? theme.colors.gray3
        : validationStyleProps.borderColor
  });

  const disabledBackgroundColor = darken(backgroundColor, 7);

  const calculatedProps = {
    disabledBackgroundColor,
    backgroundColor,
    focusBoxShadow,
    addOn
  };

  const finalProps = { flat };

  const validationProps = {
    ...validationStyleProps,
    ...calculatedProps,
    ...props,
    ...finalProps
  };

  return validationProps;
}
