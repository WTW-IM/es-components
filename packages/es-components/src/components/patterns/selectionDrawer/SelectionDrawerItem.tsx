import React, { ReactNode, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { ValidationStyleType } from 'es-components-shared-types';
import Checkbox from '../../controls/checkbox/Checkbox';
import Control from '../../controls/Control';
import Drawer, { useDrawerItemContext } from '../../containers/drawer/Drawer';
import Icon from '../../base/icons/Icon';
import { SelectedItemsContext } from './SelectionDrawer';

export type SelectionDrawerProps = {
  children: ReactNode;
};

export type SelectionDrawerItemProps = {
  header: ReactNode | (({ className }: { className: string }) => ReactNode);
  type?: 'radio' | 'checkbox';
  panelKey: string;
  forceOpen?: boolean;
  forceClose?: boolean;
  disabled?: boolean;
  validationState?: Extract<
    ValidationStyleType,
    'default' | 'info' | 'warning' | 'danger'
  >;
  independentSelection?: boolean;
  checkboxAlignment?: 'left' | 'right';
  headerAlignment?: 'left' | 'right';
  children: ReactNode;
};

type StyledItemHeaderProps = {
  checkboxAlignment: 'left' | 'right';
  headerAlignment: 'left' | 'right';
};

const headerClass = 'selection-drawer__title';
function determineJustify({
  checkboxAlignment,
  headerAlignment
}: StyledItemHeaderProps) {
  if (checkboxAlignment !== headerAlignment) return 'space-between';
  // if (checkboxAlignment === 'right' && headerAlignment === 'right') return
  return 'flex-start';
}

const StyledSelectionDrawerItemHeader = styled.div<StyledItemHeaderProps>`
  display: flex;
  align-items: center;

  label {
    display: flex;
    flex-direction: ${props =>
      props.checkboxAlignment === 'left' ? 'row' : 'row-reverse'};
    flex-wrap: wrap;
    justify-content: ${determineJustify};
    align-items: center;
    column-gap: 0.66rem;
    flex-grow: 1;
    margin: 0;
    padding: 0;
  }

  .es-checkbox__wrapper {
    display: flex;
  }

  .${headerClass} {
    display: flex;
  }

  .es-checkbox__fill {
    position: static;
    border-radius: 50%;
  }
`;

const ValidationBorder = styled.div<{
  validationState: ValidationStyleType;
  disabled: boolean;
}>`
  border: 2px solid
    ${props =>
      props.theme.validationInputColor[props.validationState].borderColor};
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${props =>
    props.disabled ? props.theme.colors.gray3 : 'inherit'};

  > div {
    margin-bottom: 0;
  }
`;

const StyledDrawerBody = styled.div`
  display: flex;
`;

const StyledDropdownButton = styled.div`
  cursor: pointer;
`;

function DrawerControl({
  checkboxAlignment,
  headerAlignment,
  disabled,
  children,
  independentSelection,
  type
}: {
  checkboxAlignment: 'left' | 'right';
  headerAlignment: 'left' | 'right';
  disabled: boolean;
  children: ReactNode;
  independentSelection: boolean;
  type: 'radio' | 'checkbox';
}) {
  const { open, toggleOpen, itemKey } = useDrawerItemContext();
  const { selectedItems, setSelectedItems } = useContext(SelectedItemsContext);

  const isSelected = selectedItems.includes(itemKey);
  const onChange = useCallback(() => {
    if (type === 'radio') {
      setSelectedItems(() => [itemKey]);
      if (!open) {
        toggleOpen();
      }
      return;
    }

    if (!isSelected) {
      setSelectedItems(items => [...items, itemKey]);
      if (open === isSelected) {
        toggleOpen();
      }
      return;
    }

    setSelectedItems(items =>
      items.reduce((acc, item) => {
        return item === itemKey ? acc : [...acc, item];
      }, [] as string[])
    );
    if (open === isSelected) {
      toggleOpen();
    }
  }, [type, open, itemKey, isSelected]);

  return (
    <StyledSelectionDrawerItemHeader
      checkboxAlignment={checkboxAlignment}
      headerAlignment={headerAlignment}
    >
      <Checkbox
        displayClassName="es-checkbox__wrapper"
        checked={isSelected}
        disabled={disabled}
        onChange={onChange}
      >
        {children}
      </Checkbox>
      {independentSelection && (
        <Drawer.ItemOpener>
          <StyledDropdownButton>
            <Icon size={24} name={open ? 'chevron-down' : 'chevron-up'} />
          </StyledDropdownButton>
        </Drawer.ItemOpener>
      )}
    </StyledSelectionDrawerItemHeader>
  );
}

export function SelectionDrawerItem({
  header,
  type = 'checkbox',
  children,
  panelKey,
  forceOpen,
  forceClose,
  disabled = false,
  independentSelection = false,
  validationState = 'default',
  checkboxAlignment = 'left',
  headerAlignment = 'left'
}: SelectionDrawerItemProps) {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof forceOpen !== 'undefined') return forceOpen;
    if (typeof forceClose !== 'undefined') return !forceClose;
    return false;
  });
  const title =
    typeof header === 'function' ? (
      header({ className: headerClass })
    ) : (
      <div className={headerClass}>{header}</div>
    );

  return (
    <ValidationBorder
      validationState={validationState}
      className="test"
      disabled={disabled}
    >
      <Control validationState={validationState}>
        <Drawer.Item onChange={setIsOpen} panelKey={panelKey} open={isOpen}>
          <DrawerControl
            type={type}
            checkboxAlignment={checkboxAlignment}
            headerAlignment={headerAlignment}
            independentSelection={independentSelection}
            disabled={disabled}
          >
            {title}
          </DrawerControl>
          <StyledDrawerBody>
            <Drawer.ItemBody style={{ flexShrink: 0 }}>
              {children}
            </Drawer.ItemBody>
          </StyledDrawerBody>
        </Drawer.Item>
      </Control>
    </ValidationBorder>
  );
}
