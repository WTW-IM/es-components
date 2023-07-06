import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import InputBase, {
  validationStateHighlightStyles,
  placeholderStyles,
  useValidationStyleProps,
  ValidationStyleProps
} from '../textbox/InputBase';
import { callRefs } from '../../util/callRef';
import { arrowDown } from './assets';
import getStyledProp, { ESThemeProps } from '../../util/getStyledProp';

const getCSSArrow = (props: ESThemeProps) =>
  `"${
    (getStyledProp('inputStyles.dropdownArrow', props) as string) || arrowDown
  }"`;

type StyledInputProps = ValidationStyleProps & {
  hasValue?: boolean;
};

const StyledDropdownInput = styled(InputBase)<StyledInputProps>`
  min-width: 100px;
  appearance: none;
  background-image: url(${getCSSArrow});
  background-repeat: no-repeat;
  background-position: right 0.5em center;
  background-size: 0.6em auto;
  line-height: ${props =>
    getStyledProp('inputStyles.dropdownLineHeight', props as ESThemeProps) ||
    '1.5em'};

  ${({ hasValue }) => !hasValue && placeholderStyles}

  &&:focus {
    ${validationStateHighlightStyles}
  }
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
  function ForwardedDropdown(props, ref) {
    const validationStyleProps = useValidationStyleProps(props);
    const [hasValue, setHasValue] = useState(Boolean(props.value));
    const [inputRef, setInputRef] = useState<HTMLSelectElement | null>(null);
    const onChange = useCallback<
      React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>
    >(
      (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setHasValue(Boolean(ev.target.value));
        (props.onChange || (() => ({})))(ev);
      },
      [props.onChange]
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

      setHasValue(Boolean(props.value || props.defaultValue));
    }, [props.value, props.defaultValue, inputRef, inputRef?.value]);

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
