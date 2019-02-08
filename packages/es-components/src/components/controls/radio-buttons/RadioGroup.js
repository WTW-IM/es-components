import React from 'react';
import PropTypes from 'prop-types';

function RadioGroup({
  name,
  disableAllOptions,
  selectedValue,
  children,
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
  disableAllOptions: PropTypes.bool
};

RadioGroup.defaultProps = {
  selectedValue: undefined,
  disableAllOptions: false
};

export default RadioGroup;
