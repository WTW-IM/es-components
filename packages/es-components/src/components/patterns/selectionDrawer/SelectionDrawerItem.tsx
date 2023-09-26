import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import * as CSS from 'csstype';
import styled, { useTheme, css } from 'styled-components';
import { ValidationStyleType } from 'es-components-shared-types';
import Checkbox, {
  CheckboxProps,
  CheckboxDisplay
} from '../../controls/checkbox/Checkbox';
import Label from '../../controls/label/Label';
import Control from '../../controls/Control';
import Drawer, { useDrawerItemContext } from '../../containers/drawer/Drawer';
import Icon from '../../base/icons/Icon';
import {
  DrawerType,
  HeaderAlignment,
  useSelectionDrawerContext
} from './SelectionDrawerProvider';
import {
  RadioButton,
  RadioButtonProps,
  RadioDisplay,
  getValidationSelectionColors
} from '../../controls/radio-buttons/RadioButton';
import { useValidationState } from '../../controls/ValidationContext';
import { lighten } from '../../util/colors';

export type SelectionDrawerProps = {
  children: ReactNode;
};

function determineJustify({ inputAlignment, labelAlignment }: HeaderAlignment) {
  if (inputAlignment !== labelAlignment) return 'space-between';
  // if (checkboxAlignment === 'right' && headerAlignment === 'right') return
  return 'flex-start';
}

const DrawerValidationControl = styled(Control)`
  margin-bottom: 0;
`;

const DrawerHeader = styled.div<HeaderAlignment>`
  ${({ inputAlignment, labelAlignment }) => css`
    flex-direction: row;

    &,
    & > ${Label} {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      column-gap: 0.5em;
      flex-grow: 1;

      margin: 0;
      padding: 0;
    }

    & > ${Label} {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: ${inputAlignment === 'left' ? 'row' : 'row-reverse'};
      justify-content: ${determineJustify({
        inputAlignment,
        labelAlignment
      })};

      justify-content: space-between;

      ${inputAlignment === 'left' &&
      labelAlignment === 'left' &&
      css`
        justify-content: flex-start;
      `}

      ${inputAlignment === 'right' &&
      labelAlignment === 'right' &&
      css`
        justify-content: flex-end;
      `}
    }

    ${CheckboxDisplay} {
      display: block;
      position: relative;
      top: 0;
      left: 0;
    }

    ${CheckboxDisplay}, ${RadioDisplay} {
      margin: 0;
    }
  `}
`;

const StyledSelectionDrawerItemHeader = styled.div<{
  borderColor: CSS.Property.Color;
  validationState: ValidationStyleType;
  disabled: boolean;
  disabledBgColor: CSS.Property.BackgroundColor;
}>`
  ${({ borderColor, disabled, disabledBgColor, theme }) => css`
    border: 2px solid ${borderColor};
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: inherit;

    ${disabled &&
    css`
      background-color: ${disabledBgColor};
      border-color: ${theme.colors.disabled ||
      theme.validationInputColor.default.borderColor};

      &,
      & ${Label} {
        color: ${theme.colors.disabled ||
        theme.validationInputColor.default.borderColor};
      }
    `}
  `}
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

const StyledOpenerButton = styled.div`
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

const DrawerControl: ReactFCWithChildren<{
  independentSelection: boolean;
  setOpenState: (state: boolean) => void;
}> = ({ independentSelection, setOpenState }) => {
  const { open } = useDrawerItemContext();

  return independentSelection ? (
    <Drawer.ItemOpener>
      <StyledOpenerButton onClick={() => setOpenState(!open)}>
        <Icon size={24} name={open ? 'chevron-down' : 'chevron-up'} />
      </StyledOpenerButton>
    </Drawer.ItemOpener>
  ) : (
    <></>
  );
};
/* eslint-enable react/prop-types */

export type SelectionDrawerItemProps<T extends DrawerType> = Override<
  T extends 'radio' ? RadioButtonProps : CheckboxProps,
  HeaderAlignment & {
    header: ReactNode;
    forceOpen?: boolean;
    forceClose?: boolean;
    disabled?: boolean;
    validationState?: ValidationStyleType;
    independentSelection?: boolean;
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
  validationState: validationStateProp = 'default',
  inputAlignment,
  labelAlignment,
  type,
  value: valueProp,
  ...props
}: SelectionDrawerItemProps<T>) {
  const value = valueProp?.toString() || '';
  const [isOpen, setIsOpen] = useState(false);
  const { selectedItems, validationState: drawerValidationState } =
    useSelectionDrawerContext();
  const parentValidationState = useValidationState();
  const validationState =
    validationStateProp || drawerValidationState || parentValidationState;
  const theme = useTheme();
  const isChecked = selectedItems.includes(value);
  const { fill: borderColor } = useMemo(
    () => getValidationSelectionColors(theme, validationState, isChecked),
    [theme, validationState, isChecked]
  );
  const disabledBgColor = useMemo(
    () =>
      lighten(
        theme.colors.disabled || theme.validationInputColor.default.borderColor,
        20
      ),
    [theme]
  );

  useEffect(() => {
    setIsOpen(isChecked);
  }, [isChecked]);

  const Input = type === 'radio' ? DrawerRadio : DrawerCheckbox;

  return (
    <StyledSelectionDrawerItemHeader
      className="test"
      {...{
        disabled,
        validationState,
        borderColor,
        disabledBgColor
      }}
    >
      <DrawerValidationControl validationState={validationState}>
        <Drawer.Item
          onChange={setIsOpen}
          panelKey={value}
          {...(forceOpen
            ? { controlledOpen: true }
            : forceClose
            ? { controlledOpen: false }
            : { open: isOpen })}
        >
          <DrawerHeader {...{ inputAlignment, labelAlignment }}>
            <Input {...props} disabled={disabled} value={value}>
              <div>{header}</div>
            </Input>
            <DrawerControl
              {...{ independentSelection, setOpenState: setIsOpen }}
            />
          </DrawerHeader>
          <StyledDrawerBody applyInlineTransitions={false}>
            {children}
          </StyledDrawerBody>
        </Drawer.Item>
      </DrawerValidationControl>
    </StyledSelectionDrawerItemHeader>
  );
}
