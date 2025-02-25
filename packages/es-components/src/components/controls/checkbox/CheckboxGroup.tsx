import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes, { ValidationMap } from 'prop-types';
import styled from 'styled-components';
import Checkbox, { CheckboxProps } from './Checkbox';
import CheckAllBox from './CheckAllBox';
import { htmlInputPropTypes } from '../../util/htmlProps';
import { useMonitoringEffect } from '../../../hooks/useMonitoringHooks';

const Spacer = styled.div<{ bumpRight?: boolean }>`
  margin-left: ${props => (props.bumpRight ? '10px' : '0')};
`;

export type CheckboxGroupProps = {
  onChange: (values: CheckboxProps['value'][]) => void;
  options?: CheckboxProps[];
  disableAllOptions?: boolean;
  checkAllText?: string;
  textOnHoverCheckAll?: boolean;
  displayClassName?: string;
};

export function useCheckboxGroupActions({
  originalSelectedValues,
  onChange
}: {
  onChange: (values: string[]) => void;
  originalSelectedValues: string[];
}) {
  const [selectedValues, setSelectedValues] = useState(originalSelectedValues);
  const [afterFirstRender, setAfterFirstRender] = useState(false);

  useMonitoringEffect(
    ({ onChange: currentOnChange, afterFirstRender: currentAfterFirst }) => {
      if (!currentAfterFirst) return;

      currentOnChange?.(selectedValues);
    },
    [selectedValues],
    { onChange, afterFirstRender }
  );

  const handleCheckboxChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValues(oldValues => {
        const includeValue = ev.target.checked;
        const value = ev.target.value;
        const hasValue = oldValues.includes(value);

        if (includeValue) return hasValue ? oldValues : [...oldValues, value];

        return hasValue ? oldValues.filter(v => v !== value) : oldValues;
      });
    },
    []
  );

  useEffect(function lastEffect() {
    setAfterFirstRender(true);
  }, []);

  return {
    selectedValues,
    setSelectedValues,
    handleCheckboxChange
  } as const;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  disableAllOptions = false,
  options = [],
  checkAllText,
  textOnHoverCheckAll = false,
  onChange,
  displayClassName = ''
}) => {
  const originalSelectedValues = useMemo(
    () => options.filter(o => o.checked).map(o => o.value?.toString() || ''),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const { selectedValues, setSelectedValues, handleCheckboxChange } =
    useCheckboxGroupActions({
      originalSelectedValues,
      onChange
    });
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    const allChecked = options.every(o =>
      selectedValues.includes(o.value?.toString() || '')
    );
    setCheckAll(allChecked);
  }, [options, selectedValues]);

  const handleCheckAll = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const checked = ev.target.checked;
      setSelectedValues(
        checked ? options.map(o => o.value?.toString() || '') : []
      );
    },
    [options, setSelectedValues]
  );

  return (
    <>
      {checkAllText && (
        <CheckAllBox
          onChange={handleCheckAll}
          checked={checkAll}
          disabled={disableAllOptions}
          textOnHover={textOnHoverCheckAll}
          displayClassName={displayClassName}
        >
          {checkAllText}
        </CheckAllBox>
      )}
      {options.map(({ name, value, disabled, content }, ind) => (
        <Spacer
          bumpRight={Boolean(checkAllText)}
          key={
            (Array.isArray(value) ? value.join(';') : value?.toString()) || ind
          }
        >
          <Checkbox
            name={name}
            value={value}
            checked={selectedValues.includes(value?.toString() || '')}
            disabled={disableAllOptions || disabled}
            onChange={handleCheckboxChange}
            displayClassName={displayClassName}
          >
            {content || value}
          </Checkbox>
        </Spacer>
      ))}
    </>
  );
};

CheckboxGroup.propTypes = {
  /** change handler */
  onChange: PropTypes.func.isRequired,
  /** Disable all checkbox buttons */
  disableAllOptions: PropTypes.bool,
  /** array of checkbox objects defined by this shape */
  options: PropTypes.arrayOf<CheckboxProps>(
    PropTypes.shape(htmlInputPropTypes as ValidationMap<CheckboxProps>)
      .isRequired
  ),
  /** display an optional "Check All" checkbox with this value */
  checkAllText: PropTypes.string,
  /** display the "Check All" text on hover */
  textOnHoverCheckAll: PropTypes.bool,
  /** applies to the checkboxes display wrappers */
  displayClassName: PropTypes.string
};

export default CheckboxGroup;
