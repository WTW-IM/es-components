import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Label from '../Label';
import { LabelText, SelectBase } from '../BaseControls';
import {
  validationInputColor,
  validationTextColor
} from '../validationStateVars';

const optionsShape = {
  /** Text to display in drop down */
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired
};

function Dropdown({
  labelText,
  name,
  options,
  inline = false,
  includeDefaultFirstOption = true,
  isDefaultFirstOptionDisabled = true,
  firstOptionDisplayText = '--',
  value = '',
  onChange = noop,
  onBlur = noop,
  validationState = 'normal',
  ...rest
}) {
  const firstOption = includeDefaultFirstOption
    ? <option disabled={isDefaultFirstOptionDisabled} value="">
        {firstOptionDisplayText}
      </option>
    : null;

  const selectOptions = options.map(opt => {
    const optionKey = opt.optionValue.replace(/\s/g, '');
    return (
      <option key={optionKey} value={opt.optionValue}>
        {opt.optionText}
      </option>
    );
  });

  return (
    <Label inline={inline}>
      <LabelText
        foregroundColor={validationTextColor[validationState]}
        inline={inline}
      >
        {labelText}
      </LabelText>
      <SelectBase
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...validationInputColor[validationState]}
        {...rest}
      >
        {firstOption}
        {selectOptions}
      </SelectBase>
    </Label>
  );
}

Dropdown.propTypes = {
  labelText: PropTypes.string.isRequired,
  /** The name of the select element*/
  name: PropTypes.string,
  /** Display label inline with dropdown */
  inline: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape(optionsShape)),
  /** Display a default first option */
  includeDefaultFirstOption: PropTypes.bool,
  /** Prevent default first option from being selected */
  isDefaultFirstOptionDisabled: PropTypes.bool,
  /** The text of the first option displayed */
  firstOptionDisplayText: PropTypes.string,
  /** The currently selected value */
  value: PropTypes.string,
  /** Display label and text with contextual state colorings */
  validationState: PropTypes.oneOf(['normal', 'success', 'warning', 'danger']),
  /** Function to execute when the dropdown value changes */
  onChange: PropTypes.func,
  /** Function to execute when the dropdown loses focus */
  onBlur: PropTypes.func
};

export default Dropdown;
