import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme, css } from 'styled-components';

import Label from '../label/Label';
import { useValidationState } from '../ValidationContext';
import {
  htmlInputPropTypes,
  htmlInputDefaultProps
} from '../../util/htmlProps';
import {
  ValidationSelectionColors,
  getValidationSelectionColors
} from '../radio-buttons/RadioButton';
import useUniqueId from '../../util/useUniqueId';

export const CheckboxLabel = styled(Label)<{ disabled?: boolean }>`
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

  [disabled] {
    pointer-events: none;
    cursor: not-allowed;
    outline: 0;
  }
`;

export const CheckboxInput = styled.input`
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
  position: absolute;
`;

export const CheckboxDisplayWrapper = styled.div``;

export const CheckboxDisplay = styled.span<
  ValidationSelectionColors & {
    validationStateClass: string;
  }
>`
  ${({ theme, fill, hover, validationStateClass }) => css`
    background-color: ${theme.colors.white};
    border: 3px solid;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    height: 25px;
    left: 10px;
    position: absolute;
    top: 0.55em;
    transition: all 0.25s linear, box-shadow 0.15s linear;
    width: 25px;

    @media (min-width: ${theme.screenSize.tablet}) {
      left: 0;
      top: 0.35em;
    }

    &:after {
      background: transparent;
      border: 3px solid transparent;
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

    ${CheckboxLabel}:focus &,
    ${CheckboxInput}:focus ~ & {
      box-shadow: 0 0 3px 3px ${theme.colors.inputFocus};
    }

    ${CheckboxInput}:disabled ~ && {
      border-color: ${theme.colors.disabled ||
      theme.validationInputColor.default.borderColor};
      cursor: not-allowed;
      outline: 0;

      ${CheckboxLabel}:focus &:after,
      ${CheckboxLabel}:hover &:after,
      &:after {
        border-color: transparent;
      }
    }

    ${CheckboxInput}:disabled:checked ~ && {
      background-color: ${theme.colors.disabled ||
      theme.validationInputColor.default.borderColor};
      border-color: transparent;

      ${CheckboxLabel}:focus &:after,
      ${CheckboxLabel}:hover &:after,
      &:after {
        border-color: ${theme.colors.white};
      }
    }

    &.${validationStateClass} {
      border-color: ${fill};

      ${CheckboxInput}:checked ~ & {
        background-color: ${fill};

        &:after {
          border-color: ${theme.colors.white};
        }
      }

      &:after {
        ${CheckboxInput}:not(:disabled):not(:checked) ~ & {
          ${CheckboxLabel}:focus &,
          ${CheckboxLabel}:hover &,
          ${CheckboxInput}:focus&,
          ${CheckboxInput}:hover& {
            border-color: ${hover};
          }
        }
      }
    }
  `}
`;

export type CheckboxProps = Override<
  JSXElementProps<'input'>,
  {
    /** Applies as className on the display wrapper. */
    displayClassName?: string;
  }
>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function ForwardedCheckbox(
    { children, displayClassName, ...checkboxProps },
    ref
  ) {
    const theme = useTheme();
    const validationState = useValidationState();
    const isChecked = Boolean(
      checkboxProps.checked || checkboxProps.defaultChecked
    );
    const { hover, fill } = useMemo(
      () => getValidationSelectionColors(theme, validationState, isChecked),
      [theme, validationState, isChecked]
    );

    const uniqueName = useUniqueId();
    const checkboxName = checkboxProps.name || uniqueName;
    const validationStateClass = `${
      theme.themeName?.toLowerCase().replace(/\s+/g, '-') || 'es'
    }-${validationState}${isChecked ? '-checked' : ''}`;

    return (
      <CheckboxLabel disabled={checkboxProps.disabled}>
        <CheckboxDisplayWrapper className={displayClassName}>
          <CheckboxInput
            type="checkbox"
            {...checkboxProps}
            name={checkboxName}
            ref={ref}
          />
          <CheckboxDisplay
            className={`es-checkbox__fill ${validationStateClass}`}
            {...{ hover, fill, validationStateClass }}
          />
        </CheckboxDisplayWrapper>
        {children}
      </CheckboxLabel>
    );
  }
);

export const propTypes = {
  ...htmlInputPropTypes,
  /** applies to the display wrapper */
  displayClassName: PropTypes.string
};

export const defaultProps = {
  ...htmlInputDefaultProps,
  displayClassName: ''
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
