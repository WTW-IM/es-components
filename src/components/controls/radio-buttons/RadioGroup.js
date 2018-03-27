import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import Fieldset from '../../containers/fieldset/Fieldset';

import RadioButton from './RadioButton';
import defaultTheme from '../../theme/defaultTheme';
import { ThemeProvider } from 'styled-components';

function RadioGroup({
  name,
  radioOptions,
  legendContent,
  value,
  hasError = false,
  disableAllOptions = false,
  inline = true,
  onClick = noop,
  theme
}) {
  return (
    <ThemeProvider theme={theme}>
      <Fieldset legendContent={legendContent}>
        {radioOptions.map((config, index) => {
          const radioId = `${name}-option-${index + 1}`;
          const checked = config.optionValue === value;
          const isDisabled = disableAllOptions || config.isDisabled;
          const radioProps = {
            name,
            checked,
            hasError,
            isDisabled,
            inline,
            onClick,
            id: radioId,
            optionText: config.optionText,
            value: config.optionValue,
            theme
          };
          return <RadioButton key={radioId} {...radioProps} />;
        })}
      </Fieldset>
    </ThemeProvider>
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
  onClick: PropTypes.func,
  theme: PropTypes.object
};

RadioGroup.defaultProps = {
  theme: defaultTheme
};

export default RadioGroup;
