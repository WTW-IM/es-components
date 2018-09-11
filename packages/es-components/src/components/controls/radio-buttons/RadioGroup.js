import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Fieldset from '../../containers/fieldset/Fieldset';

import RadioButton from './RadioButton';

function RadioGroup({
  name,
  radioOptions,
  legendContent,
  value,
  hasError = false,
  disableAllOptions = false,
  inline = true,
  onChange = noop,
  extraContent
}) {
  return (
    <Fieldset legendContent={legendContent}>
      {extraContent}
      {radioOptions.map((config, index) => {
        const radioId = `${name}-option-${index + 1}`;
        const isChecked = config.optionValue === value;
        const isDisabled = disableAllOptions || config.isDisabled;
        const radioProps = {
          name,
          isChecked,
          hasError,
          isDisabled,
          inline,
          onChange,
          id: radioId,
          optionText: config.optionText,
          value: config.optionValue
        };
        return <RadioButton key={radioId} {...radioProps} />;
      })}
    </Fieldset>
  );
}

const radioOptionShape = {
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired,
  /** Render this option as disabled */
  isDisabled: PropTypes.bool
};

RadioGroup.propTypes = {
  /** The name of the radio group */
  name: PropTypes.string.isRequired,
  /** The content to render in the legend */
  legendContent: PropTypes.node,
  /** Options for the radio group to display */
  radioOptions: PropTypes.arrayOf(PropTypes.shape(radioOptionShape)).isRequired,
  /** Selected option for the radio group */
  value: PropTypes.any,
  /** Display all radio buttons in an errored state */
  hasError: PropTypes.bool,
  /** Disable all radio buttons */
  disableAllOptions: PropTypes.bool,
  /** Display the radio buttons inline */
  inline: PropTypes.bool,
  /** Function to execute when a radio button is selected */
  onChange: PropTypes.func,
  /** Extra content that can be rendered after the Legend but before the radio buttons, allows
   * content to be put in that will not affect the accessability of the Legend/Radio button relationship.
   */
  extraContent: PropTypes.node
};

RadioGroup.defaultProps = {
  legendContent: null,
  value: null,
  hasError: false,
  disableAllOptions: false,
  inline: false,
  onChange: noop,
  extraContent: null
};

export default RadioGroup;
