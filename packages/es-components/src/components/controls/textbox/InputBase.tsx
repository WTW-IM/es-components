import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, {
  DefaultTheme,
  css,
  StyleFunction,
  Interpolation
} from 'styled-components';
import * as CSS from 'csstype';
import ValidationContext from '../ValidationContext';
import { FormContext } from '../../containers/form/Form';
import getStyledProp, { ESThemeProps } from '../../util/getStyledProp';
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

export const validationStateHighlightStyles = ({
  focusBorderColor,
  focusBoxShadow
}: ESThemeProps<ValidationStateHighlightProps>) => css`
  border-color: ${focusBorderColor};
  box-shadow: ${focusBoxShadow}, ${noInset};
`;

type ValidationStyleFunction<P extends object> = (
  ...args: Parameters<StyleFunction<P>>
) => Interpolation<object>;

export const validationStateInputStyles: ValidationStyleFunction<
  ValidationStateInputProps
> = props => css`
  border: 1px solid ${props.borderColor};
  border-radius: ${getStyledProp('inputStyles.borderRadius', props) || '2px'};
  box-sizing: border-box;

  ${props.flat &&
  css`
    border-width: 0;
    border-bottom-width: 2px;
  `}
`;

export const validationStateReadonlyStyles: ValidationStyleFunction<
  ValidationStateReadonlyProps
> = ({ disabledBackgroundColor }) => css`
  background-color: ${disabledBackgroundColor};
  cursor: text;
`;

const maybeGetComma = ({
  flat,
  boxShadow
}: Pick<ValidationStateSetupProps, 'flat' | 'boxShadow'>) =>
  (flat || boxShadow) && ', ';

export const validationStateSetupStyles: ValidationStyleFunction<
  ValidationStateSetupProps
> = ({ backgroundColor, borderColor, flat, boxShadow }) => css`
  background-color: ${backgroundColor};
  box-shadow: 0 0 0 0
    ${borderColor}${maybeGetComma({ flat, boxShadow })}${flat
      ? noInset
      : boxShadow};
  transition:
    border-color linear 0.15s,
    box-shadow linear 0.15s;
`;

export const placeholderStyles = css`
  color: ${({ theme }) => theme.colors.gray7};
`;

export const getInputStyles: ValidationStyleFunction<
  ValidationStyleProps
> = props => css`
  ${validationStateInputStyles(props)}
  ${validationStateSetupStyles(props)}
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
    ${validationStateReadonlyStyles(props)}
    cursor: not-allowed;
  }
`;

const InputBaseComponent = styled.input.withConfig({
  shouldForwardProp: prop =>
    ![
      'backgroundColor',
      'borderColor',
      'focusBorderColor',
      'focusBoxShadow',
      'boxShadow',
      'focusBoxShadowFlat',
      'backgroundColorFlat',
      'addOn',
      'flat',
      'disabledBackgroundColor',
      'updateStateSilently'
    ].includes(prop)
})<ValidationStyleProps>`
  ${getInputStyles}
`;

function getValidationStyleProp<P, T extends keyof P>(
  props: P,
  propName: T,
  fallback: P[T]
) {
  return props[propName] || fallback;
}

function getValidationStylesOrDefault(
  theme: DefaultTheme,
  validationState: ValidationStyleType
): ValidationInputColor {
  const validationTarget =
    theme?.validationInputColor[validationState] ||
    theme?.validationInputColor.default ||
    ({} as ValidationInputColor);
  return validationTarget;
}

export interface ValidationProps
  extends ValidationInputColor,
    ValidationStyleProps {}

export const getDisabledBackgroundColor = (color: CSS.Property.Color) =>
  darken(color, 7);

export function getInputPropsForValidation(
  theme: DefaultTheme,
  validationState: ValidationStyleType,
  flat?: boolean
): ValidationProps {
  const validationStyleProps = getValidationStylesOrDefault(
    theme,
    validationState
  );

  const getValidationProp = getValidationStyleProp.bind(
    null,
    validationStyleProps
  ) as unknown as <K extends keyof ValidationStyleProps>(
    k: K,
    fb: ValidationStyleProps[K]
  ) => ValidationStyleProps[K];

  const backgroundColor = flat
    ? getValidationProp('backgroundColorFlat', theme?.colors.gray1 ?? '')
    : getValidationProp('backgroundColor', theme?.colors.white ?? '');

  const focusBoxShadow = flat
    ? getValidationProp(
        'focusBoxShadowFlat',
        `0 0 1px 2px ${validationStyleProps.focusBorderColor}`
      )
    : validationStyleProps.focusBoxShadow;

  const addOn = getValidationProp('addOn', {
    textColor:
      validationState === 'default' ? (theme?.colors.gray8 ?? '') : 'white',
    backgroundColor:
      validationState === 'default'
        ? (theme?.colors.gray3 ?? '')
        : validationStyleProps.borderColor
  });

  const disabledBackgroundColor = getDisabledBackgroundColor(backgroundColor);

  const calculatedProps = {
    disabledBackgroundColor,
    backgroundColor,
    focusBoxShadow,
    addOn
  };

  const validationProps = {
    ...validationStyleProps,
    ...calculatedProps
  };

  return validationProps;
}

const inputTypes = [
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week'
];
export const globalInputCss = css`
  ${inputTypes.map(type => `input[type='${type}']`).join(',')} {
    ${({ theme }) =>
      getInputStyles({
        theme,
        ...getInputPropsForValidation(theme, 'default')
      })}
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
    appearance: none;
  `}

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

export function useValidationStyleProps(
  props: FlatInputProps
): ValidationProps {
  const validationState = useContext(ValidationContext);
  const formContext = useContext(FormContext);
  const flat = isBool(props.flat) ? props.flat : formContext.flat;
  const theme = useTheme();
  const finalProps = { flat };

  const newValidationProps = useMemo<ValidationProps>(
    () =>
      theme
        ? getInputPropsForValidation(theme, validationState, flat)
        : {
            borderColor: '',
            focusBorderColor: '',
            focusBoxShadow: '',
            backgroundColor: '',
            boxShadow: '',
            disabledBackgroundColor: '',
            backgroundColorFlat: '',
            focusBoxShadowFlat: '',
            addOn: {
              textColor: '',
              backgroundColor: ''
            }
          },
    [theme, validationState, flat]
  );

  return {
    ...newValidationProps,
    ...props,
    ...finalProps
  };
}
