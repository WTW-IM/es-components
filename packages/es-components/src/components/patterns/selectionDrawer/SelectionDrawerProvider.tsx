import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  useMonitoringCallback,
  useMonitoringEffect
} from '../../../hooks/useMonitoringHooks';
import { arraysEqual } from '../../util/equality';
import { useCheckboxGroupActions } from '../../controls/checkbox/CheckboxGroup';
import noop from '../../util/noop';
import RadioGroup, {
  RadioGroupProps
} from '../../controls/radio-buttons/RadioGroup';
import { ValidationStyleType } from 'es-components-shared-types';

export type DrawerType = 'radio' | 'checkbox';
export type ControlAlignment = 'left' | 'right';

export type HeaderAlignment = {
  inputAlignment: ControlAlignment;
  labelAlignment: ControlAlignment;
};

export type SelectionDrawerSharedProps = Partial<HeaderAlignment> & {
  selectedItems?: string[];
  validationState?: ValidationStyleType;
  openable?: boolean;
};

export const SelectionDrawerContext = createContext<
  Override<
    SelectionDrawerSharedProps,
    {
      selectedItems: string[];
      setSelectedItems: (dispatch: (items: string[]) => string[]) => void;
      drawerType: DrawerType;
      handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement>;
      disableAll?: boolean;
    }
  >
>({
  selectedItems: [],
  setSelectedItems: noop,
  drawerType: 'checkbox',
  handleCheckboxChange: noop,
  labelAlignment: 'left',
  inputAlignment: 'right',
  disableAll: false
});

export type SelectionDrawerProviderProps<T extends DrawerType = DrawerType> =
  React.PropsWithChildren<
    Override<
      T extends 'radio' ? RadioGroupProps : { name?: string },
      SelectionDrawerSharedProps & {
        onSelectionChange?: (selectedItems: string[]) => void;
        disableAll?: boolean;
        type?: T;
      }
    >
  >;

const isRadioDrawer = (
  props: SelectionDrawerProviderProps<DrawerType>
): props is SelectionDrawerProviderProps<'radio'> => props.type === 'radio';

function SelectionDrawerProvider<T extends DrawerType>(
  props: SelectionDrawerProviderProps<T>
) {
  const {
    children,
    selectedItems: selectedItemsProp,
    onSelectionChange,
    type = 'checkbox' as DrawerType,
    name,
    ...contextProps
  } = props;
  const isRadio = isRadioDrawer(props);
  const guaranteedName = isRadio ? props.name : name || '';
  const { selectedValues, setSelectedValues, handleCheckboxChange } =
    useCheckboxGroupActions({
      originalSelectedValues: selectedItemsProp || [],
      onChange: onSelectionChange || noop
    });

  const onRadioChange = useMonitoringCallback(
    (currentSetSelected, ev: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = ev.target;
      currentSetSelected([value]);
    },
    setSelectedValues
  );

  useMonitoringEffect(
    currentOnChange => {
      if (arraysEqual(selectedValues || [], selectedItemsProp || [])) return;

      currentOnChange?.(selectedValues);
    },
    [selectedValues, selectedItemsProp],
    onSelectionChange
  );

  useMonitoringEffect(
    currentSetSelected => {
      currentSetSelected(selectedItemsProp || []);
    },
    [selectedItemsProp],
    setSelectedValues
  );

  const radioGroupProps: RadioGroupProps = {
    name: guaranteedName,
    disableAllOptions: contextProps.disableAll,
    onChange: onRadioChange,
    selectedValue: selectedValues[0],
    children: children || ''
  };

  return (
    <SelectionDrawerContext.Provider
      value={{
        selectedItems: selectedValues || [],
        setSelectedItems: setSelectedValues,
        drawerType: type || 'checkbox',
        handleCheckboxChange,
        ...contextProps
      }}
    >
      {isRadio ? <RadioGroup {...radioGroupProps} /> : children}
    </SelectionDrawerContext.Provider>
  );
}

export const propTypes = {
  children: PropTypes.node,
  /** The currently selected items */
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired),
  /** Function when selected items changes */
  onSelectionChange: PropTypes.func.isRequired,
  /** Type of drawer */
  type: PropTypes.oneOf(['radio', 'checkbox'])
};

SelectionDrawerProvider.propTypes = propTypes;

export default SelectionDrawerProvider;

export const useSelectionDrawerContext = () =>
  useContext(SelectionDrawerContext);
