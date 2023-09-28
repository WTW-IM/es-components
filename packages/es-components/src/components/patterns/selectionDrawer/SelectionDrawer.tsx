import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer, { DrawerProps } from '../../containers/drawer/Drawer';
import { SelectionDrawerItem } from './SelectionDrawerItem';
import SelectionDrawerProvider, {
  ControlAlignment,
  DrawerType,
  SelectionDrawerProviderProps
} from './SelectionDrawerProvider';
import noop from '../../util/noop';
import {
  ValidationStyleType,
  validationStyleTypes
} from 'es-components-shared-types';

const StyledDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export type SelectionDrawerProps<T extends DrawerType = DrawerType> = Override<
  Omit<DrawerProps, 'activeKeys' | 'isAccordion' | 'useDefaultStyles'>,
  SelectionDrawerProviderProps<T>
>;

const SelectionDrawer = React.forwardRef<HTMLDivElement, SelectionDrawerProps>(
  function ForwardedSelectionDrawer<T extends DrawerType>(
    {
      selectedItems,
      onSelectionChange = noop,
      type: typeProp = 'checkbox' as T,
      labelAlignment = 'left',
      inputAlignment = 'right',
      validationState,
      disableAll,
      openable,
      name,
      children,
      ...drawerProps
    }: SelectionDrawerProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const type: DrawerType = typeProp || 'checkbox';
    const providerProps = {
      name,
      selectedItems,
      onSelectionChange,
      type,
      labelAlignment,
      inputAlignment,
      disableAll,
      openable,
      validationState
    };

    return (
      <SelectionDrawerProvider {...providerProps}>
        <StyledDrawer
          ref={ref}
          useDefaultStyles={false}
          isAccordion={type === 'radio'}
          {...drawerProps}
        >
          {children}
        </StyledDrawer>
      </SelectionDrawerProvider>
    );
  }
);

SelectionDrawer.propTypes = {
  /** The left or right alignment of the checkbox/radio input */
  inputAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right']),
  /** The left or right alignment of the header label */
  labelAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right']),
  /** The currently selected items */
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired),
  /** Optional validation state */
  validationState: PropTypes.oneOf<ValidationStyleType>(validationStyleTypes),
  /** Callback when selection changes
   * @param selectedItems The currently selected items
   */
  onSelectionChange: PropTypes.func.isRequired,
  /** Disable all drawers */
  disableAll: PropTypes.bool,
  /** The type of input for each drawer */
  type: PropTypes.oneOf<DrawerType>(['radio', 'checkbox'])
};

type SelectionDrawerType = typeof SelectionDrawer & {
  Item: typeof SelectionDrawerItem;
};

const SelectionDrawerComp = SelectionDrawer as SelectionDrawerType;

SelectionDrawerComp.Item = SelectionDrawerItem;

export default SelectionDrawerComp;
