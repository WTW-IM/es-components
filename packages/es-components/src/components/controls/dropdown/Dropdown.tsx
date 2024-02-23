import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { DefaultTheme, StyledComponent, css } from 'styled-components';
import InputBase, {
  validationStateHighlightStyles,
  placeholderStyles,
  useValidationStyleProps,
  ValidationStyleProps,
  getInputStyles,
  getInputPropsForValidation
} from '../textbox/InputBase';
import { callRefs } from '../../util/callRef';
import { arrowDown } from './assets';
import getStyledProp, { ESThemeProps } from '../../util/getStyledProp';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

const getCSSArrow = (props: ESThemeProps) =>
  `"${
    (getStyledProp('inputStyles.dropdownArrow', props) as string) || arrowDown
  }"`;

type StyledInputProps = ValidationStyleProps & {
  hasValue?: boolean;
};

const getDropdownStyles = (props: ESThemeProps<ValidationStyleProps>) => css`
  ${getInputStyles(props)}
  min-width: 100px;
  appearance: none;
  background-image: url(${getCSSArrow(props)});
  background-repeat: no-repeat;
  background-position: right 0.5em center;
  background-size: 0.6em auto;
  line-height: ${props =>
    getStyledProp('inputStyles.dropdownLineHeight', props as ESThemeProps) ||
    '1.5em'};

  &:not(:has(:checked)) {
    ${placeholderStyles}
  }

  &&:focus {
    ${validationStateHighlightStyles(props)}
  }
`;

export const globalDrowdownCss = css`
  select {
    ${({ theme }) =>
      getDropdownStyles({
        theme,
        ...getInputPropsForValidation(theme, 'default')
      })}
  }
`;

const StyledDropdownInput = styled(InputBase)<StyledInputProps>`
  ${getDropdownStyles}

  ${({ hasValue }) => !hasValue && placeholderStyles}
`;

const DropdownInput = StyledDropdownInput as StyledComponent<
  'select',
  DefaultTheme,
  StyledInputProps
>;

export type DropdownProps = JSXElementProps<'select'> & {
  flat?: boolean;
};

const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  function ForwardedDropdown({ onChange: onChangeProp, ...props }, ref) {
    const { value, defaultValue } = props;
    const validationStyleProps = useValidationStyleProps(props);
    const [hasValue, setHasValue] = useState(Boolean(props.value));
    const [inputRef, setInputRef] = useState<HTMLSelectElement | null>(null);
    const onChange = useMonitoringCallback(
      (
        currentOnChange,
        ev: Parameters<React.ChangeEventHandler<HTMLSelectElement>>[0]
      ) => {
        setHasValue(Boolean(ev.target.value));
        currentOnChange?.(ev);
      },
      onChangeProp
    );

    const inputRefCallback = useCallback(
      (node: HTMLSelectElement | null) => callRefs(node, setInputRef, ref),
      [ref]
    );

    useEffect(() => {
      if (inputRef) {
        setHasValue(Boolean(inputRef && inputRef.value));
        return;
      }

      setHasValue(Boolean(value || defaultValue));
    }, [value, defaultValue, inputRef, inputRef?.value]);

    return (
      <DropdownInput
        {...validationStyleProps}
        {...props}
        onChange={onChange}
        hasValue={hasValue}
        ref={inputRefCallback}
        forwardedAs="select"
      />
    );
  }
);

const UnstyledSelectInput = styled('select')``;

export const propTypes = {
  ...UnstyledSelectInput.propTypes,
  /** Whether the input should be rendered as a flat-style input */
  flat: PropTypes.bool
};

export const defaultProps = {
  ...UnstyledSelectInput.defaultProps,
  flat: InputBase.defaultProps?.flat
};

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
