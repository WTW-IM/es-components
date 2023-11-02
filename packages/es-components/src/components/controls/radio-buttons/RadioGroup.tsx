import React from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroupContext,
  RadioGroupContextShape,
  radioGroupContextPropTypes
} from './RadioGroupContext';

export type RadioGroupProps<A extends boolean = false> = Override<
  RadioGroupContextShape<A>,
  {
    children: NonNullable<React.ReactNode>;
  }
>;

function RadioGroup<P, A extends boolean>({
  children,
  ...props
}: RadioGroupProps<A> & P) {
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
