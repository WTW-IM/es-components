import React from 'react';
import styled from 'styled-components';
import Drawer, { DrawerProps } from '../../containers/drawer/Drawer';
import {
  SelectionDrawerItem,
  SelectionDrawerItemProps
} from './SelectionDrawerItem';
import SelectionDrawerProvider, {
  DrawerType,
  SelectionDrawerProviderProps
} from './SelectionDrawerProvider';
import noop from '../../util/noop';

const StyledDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export type SelectionDrawerProps<T extends DrawerType> = Override<
  Omit<DrawerProps, 'activeKeys' | 'isAccordion' | 'useDefaultStyles'>,
  SelectionDrawerProviderProps<T>
>;

const SelectionDrawer = React.forwardRef<
  HTMLDivElement,
  SelectionDrawerProps<DrawerType>
>(function ForwardedSelectionDrawer<T extends DrawerType>(
  { children, ...props }: SelectionDrawerProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    selectedItems = [],
    onSelectionChange = noop,
    type: typeProp = 'checkbox',
    ...drawerProps
  } = props;
  const type: DrawerType = typeProp || 'checkbox';
  const providerProps = { selectedItems, onSelectionChange, type };

  return (
    <SelectionDrawerProvider {...providerProps}>
      <StyledDrawer
        ref={ref}
        useDefaultStyles={false}
        isAccordion={type === 'radio'}
        {...drawerProps}
      >
        {React.Children.map(children, child => {
          if (
            !child ||
            !React.isValidElement<SelectionDrawerItemProps<DrawerType>>(child)
          )
            return child;

          return React.cloneElement(child, { type });
        })}
      </StyledDrawer>
    </SelectionDrawerProvider>
  );
});

type SelectionDrawerComponentType = typeof SelectionDrawer & {
  Item: typeof SelectionDrawerItem;
};

const SelectionDrawerComponent =
  SelectionDrawer as SelectionDrawerComponentType;

SelectionDrawerComponent.Item = SelectionDrawerItem;

/** @component */
export default SelectionDrawerComponent;
