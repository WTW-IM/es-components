import React from 'react';
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

export const CheckboxDisplayWrapper = styled.span`
  left: 10px;
  position: absolute;
  top: 0.55em;

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    left: 0;
    top: 0.35em;
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

  .es-checkbox__fill {
    background-color: ${({ checked, theme: { colors }, validationState }) =>
      backgroundColorSelect(checked, colors, validationState)};
    border-color: ${({ checked, theme: { colors }, validationState }) =>
      borderColorSelect(checked, colors, validationState)};

    &:after {
      border-color: ${props => props.theme.colors.white};
    }
  }

  &:hover .es-checkbox__fill:after {
    border-color: ${({ checked, theme }) =>
      checked ? theme.colors.white : theme.colors.gray3};
  }

  &[disabled] .es-checkbox__fill {
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

  &:focus ~ ${CheckboxDisplayWrapper} > .es-checkbox__fill {
    box-shadow: 0 0 3px 3px ${props => props.theme.colors.inputFocus};
    &:after {
      border-color: ${({ checked, theme }) =>
        checked ? theme.colors.white : theme.colors.gray3};
    }
  }
`;

export const CheckboxDisplay = styled.div`
  background: ${props => props.theme.colors.white};
  border: 3px solid ${props => props.theme.colors.gray8};
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: 25px;
  transition:
    all 0.25s linear,
    box-shadow 0.15s linear;
  width: 25px;
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

export type CheckboxProps = JSXElementProps<'input'> & {
  displayClassName?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function ForwardedCheckbox(
    { children, displayClassName, ...checkboxProps },
    ref
  ) {
    const validationState = React.useContext(ValidationContext);

    return (
      <CheckboxLabel
        validationState={validationState}
        checked={checkboxProps.checked}
        disabled={checkboxProps.disabled}
      >
        <CheckboxInput type="checkbox" {...checkboxProps} ref={ref} />
        <CheckboxDisplayWrapper className={displayClassName}>
          <CheckboxDisplay className="es-checkbox__fill" />
        </CheckboxDisplayWrapper>
        {children}
      </CheckboxLabel>
    );
  }
);

Checkbox.propTypes = {
  ...htmlInputPropTypes,
  /** applies to the display wrapper */
  displayClassName: htmlInputPropTypes['className']
};

Checkbox.defaultProps = {
  ...htmlInputDefaultProps,
  displayClassName: ''
};

export default Checkbox;
