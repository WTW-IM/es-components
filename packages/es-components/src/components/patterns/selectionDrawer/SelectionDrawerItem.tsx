import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ValidationStyleType } from 'es-components-shared-types';
import Checkbox, { CheckboxProps } from '../../controls/checkbox/Checkbox';
import Control from '../../controls/Control';
import Drawer, { useDrawerItemContext } from '../../containers/drawer/Drawer';
import Icon from '../../base/icons/Icon';
import {
  DrawerType,
  useSelectionDrawerContext
} from './SelectionDrawerProvider';
import { useMonitoringEffect } from '../../../hooks/useMonitoringHooks';
import {
  RadioButton,
  RadioButtonProps
} from '../../controls/radio-buttons/RadioButton';

export type SelectionDrawerProps = {
  children: ReactNode;
};

export type ControlAlignment = 'left' | 'right';

type StyledItemHeaderProps = {
  checkboxAlignment: ControlAlignment;
  headerAlignment: ControlAlignment;
};

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
    flex-grow: 1;
    margin: 0;
    padding: 0;
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

const StyledDrawerBody = styled(Drawer.ItemBody)`
  flex-shrink: 0;
  padding-top: 1rem;

  transition: padding-top 0.3s linear, height 0.3s ease-in-out;

  &.rah-static--height-zero,
  &.rah-animating--up {
    padding-top: 0;
  }
`;

const StyledDropdownButton = styled.div`
  cursor: pointer;
`;

/* eslint-disable react/prop-types */
const DrawerRadio: ReactFCWithChildren<RadioButtonProps> = props => {
  return <RadioButton {...props} />;
};
/* eslint-enable react/prop-types */

/* eslint-disable react/prop-types */
const DrawerCheckbox: ReactFCWithChildren<CheckboxProps> = ({
  children,
  ...props
}) => {
  const { itemKey } = useDrawerItemContext();
  const { selectedItems, handleCheckboxChange } = useSelectionDrawerContext();

  const isSelected = selectedItems.includes(itemKey);

  return (
    <Checkbox {...props} checked={isSelected} onChange={handleCheckboxChange}>
      {children}
    </Checkbox>
  );
};
/* eslint-enable react/prop-types */

const DrawerControl: ReactFCWithChildren<{
  checkboxAlignment: ControlAlignment;
  headerAlignment: ControlAlignment;
  independentSelection: boolean;
  setOpenState: (state: boolean) => void;
}> = ({
  checkboxAlignment,
  headerAlignment,
  children,
  independentSelection,
  setOpenState
}) => {
  const { open, itemKey } = useDrawerItemContext();
  const { selectedItems } = useSelectionDrawerContext();

  const isSelected = selectedItems.includes(itemKey);

  useMonitoringEffect(
    currentSetOpen => {
      currentSetOpen(isSelected);
    },
    [isSelected],
    setOpenState
  );

  return (
    <StyledSelectionDrawerItemHeader
      checkboxAlignment={checkboxAlignment}
      headerAlignment={headerAlignment}
    >
      {children}
      {independentSelection && (
        <Drawer.ItemOpener>
          <StyledDropdownButton onClick={() => setOpenState(!open)}>
            <Icon size={24} name={open ? 'chevron-down' : 'chevron-up'} />
          </StyledDropdownButton>
        </Drawer.ItemOpener>
      )}
    </StyledSelectionDrawerItemHeader>
  );
};

DrawerControl.propTypes = {
  children: PropTypes.node,
  checkboxAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right'])
    .isRequired,
  headerAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right'])
    .isRequired,
  independentSelection: PropTypes.bool.isRequired,
  setOpenState: PropTypes.func.isRequired
};

export type SelectionDrawerItemProps<T extends DrawerType> = Override<
  T extends 'radio' ? RadioButtonProps : CheckboxProps,
  {
    header: ReactNode;
    forceOpen?: boolean;
    forceClose?: boolean;
    disabled?: boolean;
    validationState?: Extract<
      ValidationStyleType,
      'default' | 'info' | 'warning' | 'danger'
    >;
    independentSelection?: boolean;
    checkboxAlignment?: ControlAlignment;
    headerAlignment?: ControlAlignment;
    children: ReactNode;
    type: T;
  }
>;

export function SelectionDrawerItem<T extends DrawerType>({
  header,
  children,
  forceOpen,
  forceClose,
  disabled = false,
  independentSelection = false,
  validationState = 'default',
  checkboxAlignment = 'left',
  headerAlignment = 'left',
  type,
  value: valueProp,
  ...props
}: SelectionDrawerItemProps<T>) {
  const value = valueProp?.toString() || '';
  const [isOpen, setIsOpen] = useState(false);
  const { selectedItems } = useSelectionDrawerContext();

  const setOpenState = useCallback(
    (openState: boolean) => {
      let newOpen = openState;
      if (typeof forceOpen !== 'undefined') newOpen = forceOpen;
      if (typeof forceClose !== 'undefined') newOpen = !forceClose;
      setIsOpen(newOpen);
    },
    [forceOpen, forceClose]
  );

  useEffect(function defaultClosed() {
    setOpenState(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Input = type === 'radio' ? DrawerRadio : DrawerCheckbox;

  return (
    <ValidationBorder
      validationState={validationState}
      className="test"
      disabled={disabled}
    >
      <Control validationState={validationState}>
        <Drawer.Item
          onChange={setOpenState}
          panelKey={value}
          controlledOpen={Boolean(isOpen || selectedItems.includes(value))}
        >
          <DrawerControl
            checkboxAlignment={checkboxAlignment}
            headerAlignment={headerAlignment}
            independentSelection={independentSelection}
            setOpenState={setOpenState}
          >
            <Input {...props} disabled={disabled} value={value}>
              <div>{header}</div>
            </Input>
          </DrawerControl>
          <StyledDrawerBody applyInlineTransitions={false}>
            {children}
          </StyledDrawerBody>
        </Drawer.Item>
      </Control>
    </ValidationBorder>
  );
}
