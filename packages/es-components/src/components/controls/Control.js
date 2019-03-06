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

  select {
    border-color: ${props => props.borderColor};
  }

  input:focus,
  select:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }
`;

const InlineControl = styled(FlexControl)`
  align-items: center;
  flex-direction: row;

  @media (max-width: ${props => props.theme.screenSize.tablet}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

function Control(props) {
  const { validationState, orientation, children } = props;
  const ControlWrapper = orientation === 'inline' ? InlineControl : FlexControl;

  const theme = useTheme();
  const textColor = theme.validationTextColor[validationState];

  return (
    <ControlWrapper
      textColor={textColor}
      {...theme.validationInputColor[validationState]}
      className={props.className}
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
