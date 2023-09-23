import React from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroupContext,
  RadioGroupContextShape,
  radioGroupContextPropTypes
} from './RadioGroupContext';

export type RadioGroupProps = RadioGroupContextShape & {
  children: NonNullable<React.ReactNode>;
};

function RadioGroup<P>({ children, ...props }: RadioGroupProps & P) {
  return (
    <RadioGroupContext.Provider value={props}>
      {children}
    </RadioGroupContext.Provider>
  );
}

export const propTypes = {
  ...radioGroupContextPropTypes,
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
