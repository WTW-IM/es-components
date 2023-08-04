import React from 'react';
import PropTypes from 'prop-types';
import { HTMLInputProps, htmlInputPropTypes } from '../../util/htmlProps';

export type RadioGroupProps = {
  name: string;
  children: NonNullable<React.ReactNode>;
  disableAllOptions?: boolean;
  selectedValue?: HTMLInputProps['value'];
  onChange?: HTMLInputProps['onChange'];
};

interface ChildProps {
  disabled?: HTMLInputProps['disabled'];
  value?: HTMLInputProps['value'];
  onChange?: HTMLInputProps['onChange'];
  checked?: HTMLInputProps['checked'];
}

function RadioGroup<P extends ChildProps>({
  name,
  disableAllOptions,
  selectedValue = '',
  children,
  onChange: onChangeProp,
  ...rest
}: RadioGroupProps & P) {
  return React.Children.map(children, (c, index) => {
    if (!React.isValidElement(c)) {
      return null;
    }
    const child = c as React.ComponentElement<
      ChildProps,
      React.Component<ChildProps>
    >;
    const key = `${name}-option-${index + 1}`;
    const {
      checked: childChecked,
      onChange: childOnChange,
      disabled: childDisabled,
      ...childProps
    } = child.props;
    const disabled = disableAllOptions || childDisabled;
    const checked = Boolean(
      selectedValue === child.props.value || childChecked
    );
    const onChange = childOnChange || onChangeProp;

    const props = {
      ...childProps,
      ...rest,
      key,
      name,
      disabled,
      onChange,
      ...(onChange ? { checked } : { defaultChecked: checked })
    };

    return React.cloneElement(
      child,
      props as React.HTMLAttributes<HTMLInputElement>
    );
  });
}

export const propTypes = {
  /** The name of the radio group */
  name: PropTypes.string.isRequired,
  /** Selected option for the radio group */
  selectedValue: htmlInputPropTypes.value,
  /** Disable all radio buttons */
  disableAllOptions: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export const defaultProps = {
  disableAllOptions: false
};

RadioGroup.propTypes = propTypes;

RadioGroup.defaultProps = {
  selectedValue: '',
  disableAllOptions: false
};

/** @component */
export default RadioGroup;
