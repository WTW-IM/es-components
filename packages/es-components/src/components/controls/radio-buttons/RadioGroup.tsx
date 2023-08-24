import React from 'react';
import PropTypes from 'prop-types';
import { getCheckedProps } from './RadioButton';
import { HTMLInputProps, htmlInputPropTypes } from '../../util/htmlProps';

export type RadioGroupProps = {
  name: string;
  children: NonNullable<React.ReactNode>;
  disableAllOptions?: boolean;
  selectedValue?: HTMLInputProps['value'];
  onChange?: HTMLInputProps['onChange'];
};

type ChildProps<P> = Override<HTMLInputProps, P>;
type ProbableChildProps = Override<
  HTMLInputProps,
  {
    [key in keyof Omit<HTMLInputProps, 'onChange'>]?:
      | HTMLInputProps[key]
      | unknown;
  }
>;

function RadioGroup<P extends ProbableChildProps>({
  name,
  disableAllOptions,
  selectedValue = '',
  children,
  onChange: onChangeProp,
  ...rest
}: RadioGroupProps & (P extends ChildProps<infer R> ? R : P)) {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement<ChildProps<P>>(child)) {
      return null;
    }

    const key = `${name}-option-${index + 1}`;
    const {
      checked: childChecked,
      defaultChecked: childDefaultChecked,
      onChange: childOnChange,
      disabled: childDisabled,
      ...childProps
    } = child.props;
    const disabled = disableAllOptions || childDisabled;
    const checked = Boolean(
      selectedValue === child.props.value || childChecked || childDefaultChecked
    );
    const onChange = childOnChange || onChangeProp;

    const props = {
      ...childProps,
      ...rest,
      key,
      name,
      disabled,
      ...getCheckedProps({
        checked,
        onChange,
        defaultChecked: Boolean(childDefaultChecked)
      })
    };

    return React.cloneElement(child, props as Partial<ChildProps<P>>);
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
