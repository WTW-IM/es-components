import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { HTMLInputProps, htmlInputPropTypes } from '../../util/htmlProps';
import type { RadioButtonProps } from './RadioButton';

export type RadioGroupContextShape = Override<
  Partial<RadioButtonProps>,
  {
    name: string;
    disableAllOptions?: boolean;
    selectedValue?: HTMLInputProps['value'];
    onChange?: HTMLInputProps['onChange'];
  }
>;

export const radioGroupContextPropTypes = {
  /** The name of the radio group */
  name: PropTypes.string.isRequired,
  /** Selected option for the radio group */
  selectedValue: htmlInputPropTypes.value,
  /** Disable all radio buttons */
  disableAllOptions: PropTypes.bool
};

export const RadioGroupContext = createContext<RadioGroupContextShape>({
  name: '',
  selectedValue: ''
});

export const useRadioGroupContext = () => useContext(RadioGroupContext);
