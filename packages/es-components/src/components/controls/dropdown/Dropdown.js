import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { ThemeProvider, withTheme } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import classnames from 'classnames';

import Label from '../Label';
import { LabelText, SelectBase } from '../BaseControls';

const optionsShape = {
  /** Text to display in drop down */
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired
};

function Dropdown({
  labelText,
  className,
  name,
  options,
  inline = false,
  includeDefaultFirstOption = true,
  isDefaultFirstOptionDisabled = true,
  firstOptionDisplayText = '--',
  value = '',
  onChange = noop,
  onBlur = noop,
  validationState = 'default',
  theme,
  ...rest
}) {
  const firstOption = includeDefaultFirstOption ? (
    <option disabled={isDefaultFirstOptionDisabled} value="">
      {firstOptionDisplayText}
    </option>
  ) : null;

  const selectOptions = options.map(opt => {
    const optionKey = opt.optionValue.replace(/\s/g, '');
    return (
      <option key={optionKey} value={opt.optionValue}>
        {opt.optionText}
      </option>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Label inline={inline} className={classnames('es-dropdown', className)}>
        {labelText && (
          <LabelText
            className="es-dropdown__label"
            foregroundColor={theme.validationTextColor[validationState]}
            inline={inline}
          >
            {labelText}
          </LabelText>
        )}
        <SelectBase
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...theme.validationInputColor[validationState]}
          {...rest}
        >
          {firstOption}
          {selectOptions}
        </SelectBase>
      </Label>
    </ThemeProvider>
  );
}

Dropdown.propTypes = {
  labelText: PropTypes.string,
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
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Function to execute when the dropdown value changes */
  onChange: PropTypes.func,
  /** Function to execute when the dropdown loses focus */
  onBlur: PropTypes.func,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object,
  /**
   * class name is applied to top level label
   */
  className: PropTypes.string
};

Dropdown.defaultProps = {
  theme: viaTheme
};

export default withTheme(Dropdown);
