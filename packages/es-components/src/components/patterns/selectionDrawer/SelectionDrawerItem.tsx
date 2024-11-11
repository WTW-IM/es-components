import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes, { Validator } from 'prop-types';
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
import Button from '../../controls/buttons/Button';
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
import { htmlInputPropTypes } from '../../util/htmlProps/input';

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

const StyledSelectionDrawerItemContainer = styled.div<{
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

const StyledOpenerButton = styled(Button)`
  &,
  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
  const label = open ? 'Collapse' : 'Expand';

  return openable ? (
    <Drawer.ItemOpener>
      <StyledOpenerButton onClick={() => setOpen(!open)} aria-label={label}>
        <Icon size={24} name={open ? 'chevron-up' : 'chevron-down'} />
      </StyledOpenerButton>
    </Drawer.ItemOpener>
  ) : (
    <></>
  );
};
/* eslint-enable react/prop-types */

type BaseDrawerType<T extends DrawerType> = T extends 'radio'
  ? RadioButtonProps
  : CheckboxProps;

type CheckboxValue = CheckboxProps['value'];
type RadioValue = RadioButtonProps['value'];

type SelectionDrawerItemBase<T extends DrawerType = 'checkbox'> = {
  header: NonNullable<ReactNode>;
  forceOpen?: boolean;
  forceClose?: boolean;
  disabled?: boolean;
  validationState?: ValidationStyleType;
  openable?: boolean;
  children: NonNullable<ReactNode>;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
  type?: T;
  value?: T extends 'radio' ? RadioValue : CheckboxValue;
} & Partial<HeaderAlignment>;

export type SelectionDrawerItemProps<T extends DrawerType = 'checkbox'> =
  Override<BaseDrawerType<T>, SelectionDrawerItemBase<T>>;

/**
 * @visibleName SelectionDrawer.Item
 */
export const SelectionDrawerItem = React.forwardRef<
  HTMLDivElement,
  SelectionDrawerItemProps<DrawerType>
>(function SelectionDrawerItem<T extends DrawerType>(
  {
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
    inputRef,
    ...props
  }: SelectionDrawerItemProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const value = valueProp?.toString() || '';
  const [open, setOpen] = useState(false);
  const {
    selectedItems,
    validationState: contextValidationState,
    inputAlignment: contextInputAlignment,
    labelAlignment: contextLabelAlignment,
    drawerType: contextType,
    openable: contextOpenable,
    disableAll
  } = useSelectionDrawerContext();
  const outerValidationState = useValidationState();

  const type = getFirstDefined(typeProp, contextType) || 'checkbox';
  const openable = Boolean(getFirstDefined(openableProp, contextOpenable));
  const disabled = Boolean(getFirstDefined(disabledProp, disableAll));

  const validationState =
    getFirstDefined(
      validationStateProp,
      contextValidationState,
      outerValidationState
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
    <StyledSelectionDrawerItemContainer
      {...{
        disabled,
        validationState,
        borderColor,
        disabledBgColor
      }}
      ref={ref}
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
            <Input {...props} disabled={disabled} value={value} ref={inputRef}>
              <div>{header}</div>
            </Input>
            <DrawerControl {...{ openable, setOpen }} />
          </DrawerHeader>
          <StyledDrawerBody applyInlineTransitions={false}>
            {children}
          </StyledDrawerBody>
        </Drawer.Item>
      </DrawerValidationControl>
    </StyledSelectionDrawerItemContainer>
  );
});

SelectionDrawerItem.propTypes = {
  /** The content for the Drawer Item's header */
  header: PropTypes.node.isRequired,
  /** The content for the Drawer Item's body */
  children: PropTypes.node.isRequired,
  /** The left or right alignment of the checkbox/radio input */
  inputAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right']),
  /** The left or right alignment of the header label */
  labelAlignment: PropTypes.oneOf<ControlAlignment>(['left', 'right']),
  /** Optional validation state */
  validationState: PropTypes.oneOf<ValidationStyleType>(validationStyleTypes),
  /** Set the drawer as independently openable */
  openable: PropTypes.bool,
  /** Force the drawer open whether or not it is selected */
  forceOpen: PropTypes.bool,
  /** Force the drawer closed whether or not it is selected */
  forceClose: PropTypes.bool,
  /** Disable the drawer */
  disabled: htmlInputPropTypes.disabled,
  /** The value of the drawer input */
  value: htmlInputPropTypes.value,
  /** The ref for the input element in the drawer */
  inputRef: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.shape({ current: PropTypes.any.isRequired }).isRequired
  ]) as Validator<React.ForwardedRef<HTMLInputElement>>,
  type: PropTypes.oneOf<DrawerType>(['radio', 'checkbox'])
};
