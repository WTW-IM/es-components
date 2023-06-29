import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

type RadioGroupProps = JSXElementProps<'input'> & {
  name: string;
  disableAllOptions: boolean;
  selectedValue: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

interface ChildProps {
  props: {
    disabled: boolean;
    value: string | number;
  };
}

function RadioGroup({
  name,
  disableAllOptions,
  selectedValue,
  children,
  onChange,
  ...rest
}: RadioGroupProps) {
  return React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    const key = `${name}-option-${index + 1}`;
    const disabled = disableAllOptions || (child as ChildProps).props.disabled;
    const checked = selectedValue === (child as ChildProps).props.value;
    return React.cloneElement(child, {
      key,
      name,
      disabled,
      checked,
      onChange,
      ...rest
    } as React.HTMLAttributes<HTMLInputElement>);
  });
}

RadioGroup.propTypes = {
  /** The name of the radio group */
  name: PropTypes.string.isRequired,
  /** Selected option for the radio group */
  selectedValue: PropTypes.any,
  /** Disable all radio buttons */
  disableAllOptions: PropTypes.bool,
  /** Function to change selected value */
  onChange: PropTypes.func
};

RadioGroup.defaultProps = {
  selectedValue: undefined,
  disableAllOptions: false,
  onChange: noop
};

/** @component */
export default RadioGroup;
