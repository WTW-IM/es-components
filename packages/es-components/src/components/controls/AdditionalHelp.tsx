import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../util/useTheme';
import ValidationContext from './ValidationContext';
import Icon from '../base/icons/Icon';

export type AdditionalHelpProps = JSXElementProps<'div'> & {
  hasValidationIcon?: boolean;
};

const ValidationIcon = styled(Icon)`
  && {
    align-self: flex-start;
    margin-right: 5px;
    font-size: 35px;
  }
`;

const HelpText = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: inherit;
`;

const AdditionalHelp = React.forwardRef<HTMLDivElement, AdditionalHelpProps>(
  function AdditionalHelp({ children, hasValidationIcon, ...props }, ref) {
    const theme = useTheme();
    const validationState = React.useContext(ValidationContext);

    return (
      <HelpText {...props} ref={ref}>
        {hasValidationIcon && children && validationState !== 'default' && (
          <ValidationIcon
            aria-hidden="true"
            name={theme?.validationIconName[validationState]}
          />
        )}
        {children}
      </HelpText>
    );
  }
);

AdditionalHelp.propTypes = {
  ...HelpText.propTypes,
  children: PropTypes.any,
  /** use to show or hide an associated validation icon */
  hasValidationIcon: PropTypes.bool
};

AdditionalHelp.defaultProps = {
  children: undefined,
  hasValidationIcon: true
};

export default AdditionalHelp;
