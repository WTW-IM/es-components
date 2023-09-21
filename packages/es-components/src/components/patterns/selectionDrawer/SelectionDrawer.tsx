import React, {
  ReactNode,
  createContext,
  useCallback,
  useRef,
  useState
} from 'react';
import styled from 'styled-components';
import Drawer from '../../containers/drawer/Drawer';
import {
  SelectionDrawerItem,
  SelectionDrawerItemProps
} from './SelectionDrawerItem';

export type SelectionDrawerProps = {
  children: ReactNode;
  onSelectionChange?: (selectedItems: string[]) => void;
  type?: 'radio' | 'checkbox';
};

const StyledDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const SelectedItemsContext = createContext<{
  selectedItems: string[];
  setSelectedItems: (dispatch: (items: string[]) => string[]) => void;
}>({
  selectedItems: [],
  setSelectedItems() {
    // noop
  }
});

export default function SelectionDrawer({
  type = 'checkbox',
  children,
  ...props
}: SelectionDrawerProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const onChangeRef = useRef(props.onSelectionChange);

  const onChange = useCallback(
    (dispatch: (items: string[]) => string[]) => {
      setSelectedItems(items => {
        const newState = dispatch(items);
        onChangeRef.current?.(newState);
        return newState;
      });
    },
    [selectedItems]
  );

  return (
    <SelectedItemsContext.Provider
      value={{ selectedItems, setSelectedItems: onChange }}
    >
      <StyledDrawer useDefaultStyles={false} isAccordion={type === 'radio'}>
        {React.Children.map(children, child => {
          if (!child || !React.isValidElement<SelectionDrawerItemProps>(child))
            return child;

          return React.cloneElement(child, { type });
        })}
      </StyledDrawer>
    </SelectedItemsContext.Provider>
  );
}

SelectionDrawer.Item = SelectionDrawerItem;

SelectionDrawer.propTypes = {};
