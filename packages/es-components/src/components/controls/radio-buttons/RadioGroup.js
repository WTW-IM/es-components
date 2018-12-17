import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled from 'styled-components';

import RadioButton from './RadioButton';
import Fieldset from '../../containers/fieldset/Fieldset';
import { useTheme } from '../../util/useTheme';

const RadioFieldset = styled(Fieldset)`
  legend {
    border: none;
    font-size: 22px;
    margin-bottom: 0;
  }
`;

const AdditionalHelpContent = styled.div`
  color: ${props => props.theme.colors[props.validationState]};
  font-size: ${props => props.theme.sizes.baseFontSize};
  font-weight: 400;
  margin-bottom: 10px;
  text-transform: none;
`;

function RadioGroup({
  name,
  radioOptions,
  legendContent,
  value,
  disableAllOptions,
  inline,
  onChange,
  introContent,
  validationState,
  additionalHelpContent
}) {
  const theme = useTheme();
  const helpId = additionalHelpContent ? `${name}-help` : undefined;
  const additionalHelp = additionalHelpContent && (
    <AdditionalHelpContent id={helpId} validationState={validationState}>
      {additionalHelpContent}
    </AdditionalHelpContent>
  );
  return (
    <RadioFieldset legendContent={legendContent}>
      {introContent}
      {radioOptions.map((config, index) => {
        const radioId = `${name}-option-${index + 1}`;
        const checked = config.optionValue === value;
        const disabled = disableAllOptions || config.disabled;
        const radioProps = {
          name,
          checked,
          disabled,
          inline,
          onChange,
          validationState,
          id: radioId,
          optionText: config.optionText,
          value: config.optionValue,
          theme
        };
        return <RadioButton key={radioId} {...radioProps} />;
      })}
      {additionalHelp}
    </RadioFieldset>
  );
}

const radioOptionShape = {
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired,
  /** Render this option as disabled */
  disabled: PropTypes.bool
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
  /** Display all radio options with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Disable all radio buttons */
  disableAllOptions: PropTypes.bool,
  /** Display the radio buttons inline */
  inline: PropTypes.bool,
  /** Function to execute when a radio button is selected */
  onChange: PropTypes.func,
  /** Content to display underneath the radio group */
  additionalHelpContent: PropTypes.node,
  /** Intro content that can be rendered after the Legend but before the radio buttons, allows
   * content to be put in that will not affect the accessability of the Legend/Radio button relationship.
   */
  introContent: PropTypes.node
};

RadioGroup.defaultProps = {
  legendContent: undefined,
  value: undefined,
  disableAllOptions: false,
  inline: true,
  onChange: noop,
  introContent: undefined,
  validationState: 'default',
  additionalHelpContent: undefined
};

export default RadioGroup;
