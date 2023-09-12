import React, { useContext } from 'react';
import styled from 'styled-components';
import { Colors, ValidationStyleType } from 'es-components-shared-types';

import Label from '../label/Label';
import ValidationContext from '../ValidationContext';
import {
  htmlInputPropTypes,
  htmlInputDefaultProps
} from '../../util/htmlProps';

const backgroundColorSelect = (
  checked: Maybe<boolean>,
  colors: Colors,
  validationStyle: ValidationStyleType
) => {
  if (!checked) {
    return colors.white;
  }

  if (validationStyle === 'default') {
    return colors.primary;
  }

  return colors[validationStyle];
};

const borderColorSelect = (
  checked: Maybe<boolean>,
  colors: Colors,
  validationStyle: ValidationStyleType
) => {
  if (!checked && validationStyle === 'default') {
    return 'inherit';
  }

  if (validationStyle !== 'default') {
    return colors[validationStyle];
  }

  if (checked) {
    return colors.primary;
  }
};

export const CheckboxDisplayWrapper = styled.div``;

export const CheckboxDisplay = styled.span`
  background: ${props => props.theme.colors.white};
  border: 3px solid ${props => props.theme.colors.gray8};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: 25px;
  left: 10px;
  position: absolute;
  top: 0.55em;
  transition: all 0.25s linear, box-shadow 0.15s linear;
  width: 25px;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    left: 0;
    top: 0.35em;
  }

  &:after {
    background: transparent;
    border: 3px solid ${props => props.theme.colors.white};
    border-right: none;
    border-top: none;
    box-sizing: border-box;
    content: '';
    display: block;
    height: 9px;
    margin: 3px 0 0 2px;
    transform: rotate(-45deg);
    transition: border 0.25s linear;
    width: 15px;
  }
`;

export const CheckboxLabel = styled(Label)<{
  checked?: boolean;
  validationState: ValidationStyleType;
  disabled?: boolean;
}>`
  font-size: ${props => props.theme.font.baseFontSize};
  font-family: 'Source Sans Pro', 'Segoe UI', Segoe, Calibri, Tahoma, sans-serif;
  font-size: ${props => props.theme.font.baseFontSize};
  font-weight: normal;
  line-height: ${props => props.theme.font.baseLineHeight};
  margin-left: -10px;
  min-height: 25px;
  padding: 10px 0 10px 42px;
  position: relative;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    margin-left: 0;
    padding: 5px 0 5px 32px;
  }

  ${CheckboxDisplay} {
    background-color: ${({ checked, theme: { colors }, validationState }) =>
      backgroundColorSelect(checked, colors, validationState)};
    border-color: ${({ checked, theme: { colors }, validationState }) =>
      borderColorSelect(checked, colors, validationState)};

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }

  &:hover ${CheckboxDisplay}:after {
    border-color: ${({ checked, theme }) =>
      checked ? theme.colors.white : theme.colors.gray3};
  }

  &[disabled] ${CheckboxDisplay} {
    background-color: ${({ checked, theme }) =>
      checked ? theme.colors.gray5 : theme.colors.white};
    border-color: ${props => props.theme.colors.gray5};
    cursor: not-allowed;
    outline: 0;

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }
`;

export const CheckboxInput = styled.input`
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  position: absolute;

  &:focus ~ ${CheckboxDisplay} {
    box-shadow: 0 0 3px 3px ${props => props.theme.colors.inputFocus};
    &:after {
      border-color: ${({ checked, theme }) =>
        checked ? theme.colors.white : theme.colors.gray3};
    }
  }
`;

export type CheckboxProps = JSXElementProps<'input'> & {
  displayClassName?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function ForwardedCheckbox(
    { children, displayClassName, ...checkboxProps },
    ref
  ) {
    const validationState = useContext(ValidationContext);

    return (
      <CheckboxLabel
        validationState={validationState}
        checked={checkboxProps.checked}
        disabled={checkboxProps.disabled}
      >
        <CheckboxDisplayWrapper className={displayClassName}>
          <CheckboxInput type="checkbox" {...checkboxProps} ref={ref} />
          <CheckboxDisplay className="es-checkbox__fill" />
        </CheckboxDisplayWrapper>
        {children}
      </CheckboxLabel>
    );
  }
);

export const propTypes = {
  ...htmlInputPropTypes,
  /** applies to the display wrapper */
  displayClassName: htmlInputPropTypes['className']
};

export const defaultProps = {
  ...htmlInputDefaultProps,
  displayClassName: ''
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
