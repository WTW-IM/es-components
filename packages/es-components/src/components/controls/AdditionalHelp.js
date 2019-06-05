import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../util/useTheme';
import ValidationContext from './ValidationContext';
import { ValidationIcon } from './textbox/TextAddons';

const HelpText = styled.div`
  align-items: center;
  color: inherit;
  display: inline-flex;
  margin-top: 5px;
  margin-bottom: 10px;
  flex-basis: 100%;
`;

function AdditionalHelp({ children, hasValidationIcon, ...props }) {
  const theme = useTheme();
  const validationState = React.useContext(ValidationContext);

  return (
    <HelpText {...props}>
      {hasValidationIcon &&
        children &&
        validationState !== 'default' && (
          <ValidationIcon
            aria-hidden="true"
            name={theme.validationIconName[validationState]}
          />
        )}
      {children}
    </HelpText>
  );
}

AdditionalHelp.propTypes = {
  /** use to show or hide an associated validation icon */
  hasValidationIcon: PropTypes.bool
};

AdditionalHelp.defaultProps = {
  hasValidationIcon: true
};

export default AdditionalHelp;
