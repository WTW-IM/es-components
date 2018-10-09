import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled, { withTheme } from 'styled-components';
import classnames from 'classnames';

import { Label, LabelText, SelectBase } from '../BaseControls';

const optionsShape = {
  /** Text to display in drop down */
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired
};

const AdditionalHelpContent = styled.div`
  color: ${props => props.theme.colors[props.validationState]};
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 400;
  margin: 10px 0 10px 0;
  text-transform: none;
`;

function Dropdown({
  labelText,
  className,
  name,
  options,
  inline,
  includeDefaultFirstOption,
  isDefaultFirstOptionDisabled,
  firstOptionDisplayText,
  value,
  onChange,
  onBlur,
  validationState,
  additionalHelpContent,
  theme,
  ...rest
}) {
  const helpId = additionalHelpContent ? `${name}-help` : undefined;
  const additionalHelp = additionalHelpContent && (
    <AdditionalHelpContent
      id={helpId}
      className="es-dropdown__help"
      validationState={validationState}
    >
      {additionalHelpContent}
    </AdditionalHelpContent>
  );
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

  const classNameState = `es-dropdown__select--${validationState}`;

  return (
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
        className={classNameState}
        {...theme.validationInputColor[validationState]}
        {...rest}
      >
        {firstOption}
        {selectOptions}
      </SelectBase>
      {additionalHelp}
    </Label>
  );
}

Dropdown.propTypes = {
  labelText: PropTypes.string,
  /** The name of the select element */
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
  /** Content to display underneath the radio group */
  additionalHelpContent: PropTypes.node,
  /** Function to execute when the dropdown value changes */
  onChange: PropTypes.func,
  /** Function to execute when the dropdown loses focus */
  onBlur: PropTypes.func,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object.isRequired,
  /**
   * class name is applied to top level label
   */
  className: PropTypes.string
};

Dropdown.defaultProps = {
  labelText: undefined,
  name: undefined,
  inline: false,
  options: [],
  includeDefaultFirstOption: true,
  isDefaultFirstOptionDisabled: true,
  firstOptionDisplayText: '--',
  value: '',
  validationState: 'default',
  additionalHelpContent: undefined,
  onChange: noop,
  onBlur: noop,
  className: undefined
};

export default withTheme(Dropdown);
