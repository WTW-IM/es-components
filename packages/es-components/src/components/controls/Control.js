import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { useTheme } from '../util/useTheme';

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

  @media(max-width: ${props => props.theme.screenSize.tablet}) {
    flex-direction: row;
  }
`;

const InlineControl = styled(FlexControl)`
  @media(max-width: ${props => props.theme.screenSize.tablet}) {
    align-items: center;
  }
`;

const StackedControl = styled(FlexControl)`
  flex-direction: column;
`;

function Control({ validationState, orientation, children }) {
  const ControlWrapper =
    orientation === 'inline' ? InlineControl : StackedControl;

  const theme = useTheme();
  const textColor = theme.validationTextColor[validationState];

  return (
    <ControlWrapper
      textColor={textColor}
      {...theme.validationInputColor[validationState]}
    >
      {children}
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

export default withTheme(Control);
