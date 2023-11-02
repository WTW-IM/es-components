import { createContext, useContext } from 'react';
import * as CSS from 'csstype';
import PropTypes from 'prop-types';
import { HTMLInputProps, htmlInputPropTypes } from '../../util/htmlProps';
import type { RadioButtonProps } from './RadioButton';
import type {
  ButtonSize,
  ButtonVariantStyleType
} from 'es-components-shared-types';

export type RadioGroupContextShape<A extends boolean = false> = Override<
  Partial<RadioButtonProps>,
  {
    name: string;
    disableAllOptions?: boolean;
    selectedValue?: HTMLInputProps['value'];
    onChange?: HTMLInputProps['onChange'];
    isAnswerGroup?: A;
    size?: A extends true ? ButtonSize : RadioButtonProps['size'];
    isOutline?: A extends true ? boolean : never;
    styleType?: A extends true ? ButtonVariantStyleType : never;
    selectedType?: A extends true ? ButtonVariantStyleType : never;
    itemWidth?: A extends true ? CSS.Property.Width : never;
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

export const RadioGroupContext = createContext<RadioGroupContextShape<boolean>>(
  {
    name: '',
    selectedValue: ''
  }
);

export function useRadioGroupContext<T extends boolean = false>() {
  return useContext<RadioGroupContextShape<T>>(
    RadioGroupContext as React.Context<RadioGroupContextShape<T>>
  );
}
