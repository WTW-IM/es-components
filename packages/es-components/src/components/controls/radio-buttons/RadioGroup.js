import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

function RadioGroup({
  name,
  disableAllOptions,
  selectedValue,
  children,
  onChange,
  ...rest
}) {
  return React.Children.map(children, (child, index) => {
    const key = `${name}-option-${index + 1}`;
    const disabled = disableAllOptions || child.props.disabled;
    const checked = selectedValue === child.props.value;
    return React.cloneElement(child, {
      key,
      name,
      disabled,
      checked,
      onChange,
      ...rest
    });
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
