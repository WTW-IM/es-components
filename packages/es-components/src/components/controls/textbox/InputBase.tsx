import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { DefaultTheme, css } from 'styled-components';
import * as CSS from 'csstype';
import ValidationContext from '../ValidationContext';
import { FormContext } from '../../containers/form/Form';
import getStyledProp from '../../util/getStyledProp';
import { useTheme } from '../../util/useTheme';
import { darken } from '../../util/colors';
import isBool from '../../util/isBool';
import {
  ValidationInputColor,
  ValidationStyleType
} from 'es-components-shared-types';
import {
  htmlInputPropTypes,
  htmlInputDefaultProps
} from '../../util/htmlProps';

export const noInset = 'inset 0 0 0 0 rgba(0, 0, 0, 0)';

export type ValidationStateHighlightProps = Pick<
  ValidationInputColor,
  'focusBorderColor' | 'focusBoxShadow'
>;

export type FlatInputProps = { flat?: boolean };

export type ValidationStateInputProps = Pick<
  ValidationInputColor,
  'borderColor'
> &
  FlatInputProps;

export interface ValidationStateReadonlyProps {
  disabledBackgroundColor: CSS.Property.BackgroundColor;
}

export type ValidationStateSetupProps = ValidationStateInputProps &
  Pick<ValidationInputColor, 'backgroundColor' | 'boxShadow'>;

export interface ValidationStyleProps
  extends ValidationInputColor,
    ValidationStateSetupProps,
    ValidationStateHighlightProps,
    ValidationStateReadonlyProps {}

export const validationStateHighlightStyles = css<ValidationStateHighlightProps>`
  ${({ focusBorderColor, focusBoxShadow }) => css`
    border-color: ${focusBorderColor};
    box-shadow: ${focusBoxShadow}, ${noInset};
  `}
`;

export const validationStateInputStyles = css<ValidationStateInputProps>`
  ${props => css`
    border: 1px solid ${props.borderColor};
    border-radius: ${getStyledProp('inputStyles.borderRadius', props) || '2px'};
    box-sizing: border-box;
  `}

  ${props =>
    props.flat &&
    css`
      border-width: 0;
      border-bottom-width: 2px;
    `}
`;

export const validationStateReadonlyStyles = css<ValidationStateReadonlyProps>`
  ${({ disabledBackgroundColor }) => css`
    background-color: ${disabledBackgroundColor};
    cursor: text;
  `};
`;

const maybeGetComma = ({ flat, boxShadow }: ValidationStateSetupProps) =>
  (flat || boxShadow) && ', ';

export const validationStateSetupStyles = css<ValidationStateSetupProps>`
  ${({ backgroundColor, borderColor, flat, boxShadow }) => css`
    background-color: ${backgroundColor};
    box-shadow: 0 0 0 0 ${borderColor}${maybeGetComma}${flat
        ? noInset
        : boxShadow};
    transition: border-color linear 0.15s, box-shadow linear 0.15s;
  `}
`;

export const placeholderStyles = css`
  color: ${({ theme }) => theme.colors.gray7};
`;

const InputBaseComponent = styled.input<ValidationStyleProps>`
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

export type InputBaseProps = StyledComponentElementProps<'input'> &
  ValidationStyleProps;

const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  function ForwardedInputBase(props, ref) {
    const validationStyleProps = useValidationStyleProps(props);
    return <InputBaseComponent ref={ref} {...validationStyleProps} />;
  }
);

export const propTypes = {
  ...htmlInputPropTypes
};

export const defaultProps = {
  ...htmlInputDefaultProps
};

InputBase.propTypes = propTypes;
InputBase.defaultProps = defaultProps;

export default InputBase;

export interface BasicTextboxStyleProps
  extends JSXElementProps<'input'>,
    ValidationStateSetupProps,
    ValidationStateReadonlyProps {}

export const basicTextboxStyles = css<BasicTextboxStyleProps>`
  ${validationStateSetupStyles}
  ${css`
    display: table-cell;
    -webkit-appearance: none;

    &&:read-only {
      ${validationStateReadonlyStyles}
    }
  `}
`;

export const BasicTextboxComponent = styled(InputBaseComponent)`
  ${basicTextboxStyles}
  &&:focus {
    ${validationStateHighlightStyles}
  }
`;

export type BasicTextboxProps = JSXElementProps<'input'> & FlatInputProps;

export const BasicTextbox = React.forwardRef<
  HTMLInputElement,
  BasicTextboxProps
>(function ForwardedBasicTextbox(props, ref) {
  const validationStyleProps = useValidationStyleProps(props);
  return (
    <BasicTextboxComponent {...props} {...validationStyleProps} ref={ref} />
  );
});

export const basicTextboxPropTypes = {
  ...htmlInputPropTypes,
  flat: PropTypes.bool
};

export const basicTextboxDefaultProps = {
  ...htmlInputDefaultProps,
  flat: false
};

BasicTextbox.propTypes = basicTextboxPropTypes;
BasicTextbox.defaultProps = basicTextboxDefaultProps;

function getValidationStylesOrDefault(
  theme: DefaultTheme,
  validationState: ValidationStyleType
) {
  const validationTarget =
    theme.validationInputColor[validationState] ||
    theme.validationInputColor.default ||
    {};
  return validationTarget;
}

export interface ValidationProps
  extends ValidationInputColor,
    ValidationStyleProps {}

export function useValidationStyleProps(
  props: FlatInputProps
): ValidationProps {
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

  function getValidationProp<T extends keyof ValidationInputColor>(
    propName: T,
    fallback: ValidationInputColor[T]
  ) {
    return validationStyleProps[propName] || fallback;
  }

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
