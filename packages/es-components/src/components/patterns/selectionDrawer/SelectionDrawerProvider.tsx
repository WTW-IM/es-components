import React, { createContext, useContext, useEffect } from 'react';
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
    }
  >
>({
  selectedItems: [],
  setSelectedItems: noop,
  drawerType: 'checkbox',
  handleCheckboxChange: noop,
  labelAlignment: 'left',
  inputAlignment: 'right'
});

export type SelectionDrawerProviderProps<T extends DrawerType = DrawerType> =
  React.PropsWithChildren<
    SelectionDrawerSharedProps & {
      onSelectionChange: (selectedItems: string[]) => void;
      type?: T;
    } & (T extends 'radio' ? RadioGroupProps : { name?: string })
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
      onChange: onSelectionChange
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

      currentOnChange(selectedValues);
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

  return (
    <SelectionDrawerContext.Provider
      value={{
        selectedItems: selectedValues,
        setSelectedItems: setSelectedValues,
        drawerType: type || 'checkbox',
        handleCheckboxChange,
        ...contextProps
      }}
    >
      {isRadio ? (
        <RadioGroup
          name={guaranteedName}
          onChange={onRadioChange}
          selectedValue={selectedValues[0]}
        >
          {children || ''}
        </RadioGroup>
      ) : (
        children
      )}
    </SelectionDrawerContext.Provider>
  );
}

export const propTypes = {
  children: PropTypes.node,
  /** The currently selected items */
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  /** Function when selected items changes */
  onSelectionChange: PropTypes.func.isRequired,
  /** Type of drawer */
  type: PropTypes.oneOf(['radio', 'checkbox'])
};

export const defaultProps = {};

SelectionDrawerProvider.propTypes = propTypes;
SelectionDrawerProvider.defaultProps = defaultProps;

export default SelectionDrawerProvider;

export const useSelectionDrawerContext = () =>
  useContext(SelectionDrawerContext);
