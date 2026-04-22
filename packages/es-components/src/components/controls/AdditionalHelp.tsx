import React from 'react';
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
  function AdditionalHelp(
    { children, hasValidationIcon = true, ...props },
    ref
  ) {
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

export default AdditionalHelp;
