import React from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroupContext,
  RadioGroupContextShape,
  radioGroupContextPropTypes,
  IsAnswerGroup
} from './RadioGroupContext';

export type RadioGroupProps<A extends IsAnswerGroup = undefined> = Override<
  RadioGroupContextShape<A>,
  {
    children: NonNullable<React.ReactNode>;
  }
>;

function RadioGroup<A extends IsAnswerGroup>({
  children,
  selectedValue = '',
  disableAllOptions = false,
  ...props
}: RadioGroupProps<A>) {
  return (
    <RadioGroupContext.Provider
      value={{ ...props, selectedValue, disableAllOptions }}
    >
      {children}
    </RadioGroupContext.Provider>
  );
}

export const propTypes = {
  ...radioGroupContextPropTypes,
  children: PropTypes.node.isRequired
};

RadioGroup.propTypes = propTypes;

/** @component */
export default RadioGroup;
