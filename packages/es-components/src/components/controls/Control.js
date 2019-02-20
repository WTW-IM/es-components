import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useTheme } from '../util/useTheme';
import ValidationContext from './ValidationContext';

const FlexControl = styled.div`
  color: ${props => props.textColor};
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  flex-direction: column;

  input:focus,
  select:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    flex-direction: row;
  }
`;

const InlineControl = styled(FlexControl)`
  flex-direction: row;

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    align-items: center;
  }
`;

function Control({ validationState, orientation, children }) {
  const ControlWrapper = orientation === 'inline' ? InlineControl : FlexControl;

  const theme = useTheme();
  const textColor = theme.validationTextColor[validationState];

  return (
    <ControlWrapper
      textColor={textColor}
      {...theme.validationInputColor[validationState]}
    >
      <ValidationContext.Provider value={validationState}>
        {children}
      </ValidationContext.Provider>
    </ControlWrapper>
  );
}

Control.propTypes = {
  orientation: PropTypes.oneOf(['stacked', 'inline']),
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  children: PropTypes.node
};

Control.defaultProps = {
  orientation: 'stacked',
  validationState: 'default',
  children: null
};

export default Control;
