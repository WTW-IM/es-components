import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import styled, { withTheme } from 'styled-components';

import { AnswerButton } from './AnswerButton';

const AnswerSet = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    float: left;
  }
`;

function AnswerGroup({
  name,
  radioOptions,
  onChange,
  itemWidth,
  theme,
  ...other
}) {
  return (
    <AnswerSet>
      {radioOptions.map((config, index) => {
        const radioId = `${name}-option-${index + 1}`;
        const radioProps = {
          name,
          onChange,
          id: radioId,
          optionText: config.optionText,
          value: config.optionValue,
          itemWidth,
          theme,
          ...other
        };
        return <AnswerButton key={radioId} {...radioProps} />;
      })}
    </AnswerSet>
  );
}

const radioOptionShape = {
  optionText: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired,
  /** Render this option as disabled */
  disabled: PropTypes.bool
};

AnswerGroup.propTypes = {
  /** The name of the radio group */
  name: PropTypes.string.isRequired,
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
  introContent: PropTypes.node,
  itemWidth: PropTypes.number,
  theme: PropTypes.object.isRequired
};

AnswerGroup.defaultProps = {
  value: undefined,
  disableAllOptions: false,
  inline: true,
  onChange: noop,
  introContent: undefined,
  validationState: 'default',
  itemWidth: 50,
  additionalHelpContent: undefined
};

export default withTheme(AnswerGroup);
