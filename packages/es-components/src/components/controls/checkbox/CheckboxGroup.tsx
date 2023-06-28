import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox, { CheckboxProps } from './Checkbox';
import CheckAllBox from './CheckAllBox';

const Spacer = styled.div<{ bumpRight?: boolean }>`
  margin-left: ${props => (props.bumpRight ? '10px' : '0')};
`;

export type CheckboxGroupProps = {
  onChange: (values: CheckboxProps['value'][]) => void;
  options?: CheckboxProps[];
  disableAllOptions?: boolean;
  checkAllText?: string;
  textOnHoverCheckAll?: boolean;
};

function CheckboxGroup({
  onChange,
  disableAllOptions,
  options = [],
  checkAllText,
  textOnHoverCheckAll
}: CheckboxGroupProps) {
  const [selectedValues, setSelectedValues] = useState(
    options.filter(o => o.checked).map(o => o.value)
  );
  const [checkAll, setCheckAll] = useState(false);
  const afterFirstRender = useRef(false);

  useEffect(() => {
    if (!afterFirstRender.current) return;

    onChange(selectedValues);
  }, [onChange, selectedValues]);

  useEffect(() => {
    const allChecked = options.every(o => selectedValues.includes(o.value));
    setCheckAll(allChecked);
  }, [options, selectedValues]);

  const handleCheckAll = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const checked = ev.target.checked;
      setSelectedValues(checked ? options.map(o => o.value) : []);
    },
    [options]
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
    afterFirstRender.current = true;
  }, []);

  return (
    <>
      {checkAllText && (
        <CheckAllBox
          onChange={handleCheckAll}
          checked={checkAll}
          disabled={disableAllOptions}
          textOnHover={textOnHoverCheckAll}
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
            checked={selectedValues.includes(value)}
            disabled={disableAllOptions || disabled}
            onChange={handleCheckboxChange}
          >
            {content || value}
          </Checkbox>
        </Spacer>
      ))}
    </>
  );
}

CheckboxGroup.propTypes = {
  /** change handler */
  onChange: PropTypes.func.isRequired,
  /** Disable all checkbox buttons */
  disableAllOptions: PropTypes.bool,
  /** array of checkbox objects defined by this shape */
  options: PropTypes.arrayOf(PropTypes.shape(Checkbox.propTypes)),
  /** display an optional "Check All" checkbox with this value */
  checkAllText: PropTypes.string,
  /** display the "Check All" text on hover */
  textOnHoverCheckAll: PropTypes.bool
};

CheckboxGroup.defaultProps = {
  checkAllText: undefined,
  textOnHoverCheckAll: false,
  disableAllOptions: false,
  options: []
};

export default CheckboxGroup;
