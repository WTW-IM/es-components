import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from './Checkbox';
import CheckAllBox from './CheckAllBox';

const Spacer = styled.div`
  margin-left: ${props => (props.bumpRight ? '10px' : '0')};
`;

function CheckboxGroup({
  onChange,
  disableAllOptions,
  options,
  checkAllText,
  textOnHoverCheckAll
}) {
  const [selectedValues, setSelectedValues] = useState(
    options.filter(o => o.checked).map(o => o.value) || []
  );
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAll = () => {
    let updatedValues = [];

    if (!checkAll) {
      updatedValues = options.map(o => o.value);
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }

    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  const handleCheckboxChange = ev => {
    let updatedValues = [];

    if (selectedValues.includes(ev.target.value)) {
      updatedValues = selectedValues.filter(val => val !== ev.target.value);
    } else {
      updatedValues = [...selectedValues, ev.target.value];
    }

    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <>
      {checkAllText && (
        <CheckAllBox
          onChange={handleCheckAll}
          checked={checkAll}
          disabled={disableAllOptions}
        >
          {checkAllText}
        </CheckAllBox>
      )}
      {options.map(option => (
        <Spacer bumpRight={Boolean(checkAllText)} key={option.value}>
          <Checkbox
            name={option.name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            disabled={disableAllOptions || option.disabled}
            onChange={handleCheckboxChange}
          >
            {option.content || option.value}
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string.isRequired,
      content: PropTypes.any,
      checked: PropTypes.bool,
      disabled: PropTypes.bool
    })
  ),
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
