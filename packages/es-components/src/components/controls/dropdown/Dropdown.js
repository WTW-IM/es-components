import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Label, LabelText, SelectBase } from '../BaseControls';
import { useTheme } from '../../util/useTheme';

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

function Dropdown(props) {
  const {
    labelText,
    name,
    options,
    inline,
    includeDefaultFirstOption,
    isDefaultFirstOptionDisabled,
    firstOptionDisplayText,
    validationState,
    additionalHelpContent,
    ...other
  } = props;
  const theme = useTheme();
  const helpId = additionalHelpContent ? `${name}-help` : undefined;
  const additionalHelp = additionalHelpContent && (
    <AdditionalHelpContent id={helpId} validationState={validationState}>
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

  return (
    <Label inline={inline}>
      {labelText && (
        <LabelText
          foregroundColor={theme.validationTextColor[validationState]}
          inline={inline}
        >
          {labelText}
        </LabelText>
      )}
      <SelectBase {...theme.validationInputColor[validationState]} {...other}>
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
  name: PropTypes.string.isRequired,
  /** Display label inline with dropdown */
  inline: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape(optionsShape)),
  /** Display a default first option */
  includeDefaultFirstOption: PropTypes.bool,
  /** Prevent default first option from being selected */
  isDefaultFirstOptionDisabled: PropTypes.bool,
  /** The text of the first option displayed */
  firstOptionDisplayText: PropTypes.string,
  /** Display label and text with contextual state colorings */
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Content to display underneath the radio group */
  additionalHelpContent: PropTypes.node
};

Dropdown.defaultProps = {
  labelText: undefined,
  inline: false,
  options: [],
  includeDefaultFirstOption: true,
  isDefaultFirstOptionDisabled: true,
  firstOptionDisplayText: '--',
  validationState: 'default',
  additionalHelpContent: undefined
};

export default Dropdown;
