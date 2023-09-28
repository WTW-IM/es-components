import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as CSS from 'csstype';
import styled, { useTheme, css } from 'styled-components';
import {
  ValidationStyleType,
  validationStyleTypes
} from 'es-components-shared-types';
import Checkbox, {
  CheckboxProps,
  CheckboxDisplay
} from '../../controls/checkbox/Checkbox';
import Label from '../../controls/label/Label';
import Control from '../../controls/Control';
import Drawer, { useDrawerItemContext } from '../../containers/drawer/Drawer';
import Icon from '../../base/icons/Icon';
import {
  ControlAlignment,
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
import getFirstDefined from '../../util/getFirstDefinedValue';

export type SelectionDrawerProps = {
  children: ReactNode;
};

const DrawerValidationControl = styled(Control)`
  margin-bottom: 0;
`;

const DrawerHeader = styled.div<HeaderAlignment>`
  ${({ inputAlignment, labelAlignment }) => css`
    display: flex;
    flex-direction: row;

    &,
    & > ${Label} {
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
      justify-content: ${inputAlignment !== labelAlignment
        ? 'space-between'
        : 'flex-start'};
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
  openable: boolean;
  setOpen: (state: boolean) => void;
}> = ({ openable, setOpen }) => {
  const { open } = useDrawerItemContext();

  return openable ? (
    <Drawer.ItemOpener>
      <StyledOpenerButton onClick={() => setOpen(!open)}>
        <Icon size={24} name={open ? 'chevron-up' : 'chevron-down'} />
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
    openable?: boolean;
    children: ReactNode;
    type: T;
  }
>;

/**
 * @visibleName SelectionDrawer.Item
 */
export function SelectionDrawerItem<T extends DrawerType>({
  header,
  children,
  forceOpen,
  forceClose,
  disabled: disabledProp,
  openable: openableProp,
  validationState: validationStateProp,
  inputAlignment: inputAlignmentProp,
  labelAlignment: labelAlignmentProp,
  type: typeProp,
  value: valueProp,
  ...props
}: SelectionDrawerItemProps<T>) {
  const value = valueProp?.toString() || '';
  const [open, setOpen] = useState(false);
  const {
    selectedItems,
    validationState: drawerValidationState,
    inputAlignment: contextInputAlignment,
    labelAlignment: contextLabelAlignment,
    drawerType: contextType,
    openable: contextOpenable,
    disableAll
  } = useSelectionDrawerContext();
  const parentValidationState = useValidationState();

  const type = getFirstDefined(typeProp, contextType);
  const openable = Boolean(getFirstDefined(openableProp, contextOpenable));
  const disabled = Boolean(getFirstDefined(disabledProp, disableAll));

  const validationState =
    getFirstDefined(
      validationStateProp,
      drawerValidationState,
      parentValidationState
    ) || 'default';

  const labelAlignment =
    getFirstDefined(labelAlignmentProp, contextLabelAlignment) || 'left';
  const inputAlignment =
    getFirstDefined(inputAlignmentProp, contextInputAlignment) || 'right';

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
    setOpen(isChecked);
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
          onChange={setOpen}
          panelKey={value}
          {...(forceOpen
            ? { controlledOpen: true }
            : forceClose
            ? { controlledOpen: false }
            : { open })}
        >
          <DrawerHeader {...{ inputAlignment, labelAlignment }}>
            <Input {...props} disabled={disabled} value={value}>
              <div>{header}</div>
            </Input>
            <DrawerControl {...{ openable, setOpen }} />
          </DrawerHeader>
          <StyledDrawerBody applyInlineTransitions={false}>
            {children}
          </StyledDrawerBody>
        </Drawer.Item>
      </DrawerValidationControl>
    </StyledSelectionDrawerItemHeader>
  );
}

SelectionDrawerItem.propTypes = {
  /** The left or right alignment of the checkbox/radio input */
  inputAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right']),
  /** The left or right alignment of the header label */
  labelAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right']),
  /** The currently selected items */
  selectedItems: PropTypes.arrayOf(PropTypes.string.isRequired),
  /** Optional validation state */
  validationState: PropTypes.oneOf<ValidationStyleType>(validationStyleTypes),
  /** The type of input for each drawer */
  type: PropTypes.oneOf<DrawerType>(['radio', 'checkbox'])
};
