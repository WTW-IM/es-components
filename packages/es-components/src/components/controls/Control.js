import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { useTheme } from '../util/useTheme';
import ValidationContext from './ValidationContext';

const DangerBorder = css`
  ${props =>
    props.useDangerBorder &&
    props.validationState === 'danger' &&
    css`
      border-bottom: 2px solid ${props.theme.colors.gray4};
      box-shadow: inset 0 7px 6px -6px ${props.theme.colors.danger};
      padding: 15px;
      margin-left: -15px;
      margin-right: -15px;
    `}
  }
`;

const FlexControl = styled.div`
  ${DangerBorder}
  color: ${props => props.textColor};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 25px;

  select {
    border-color: ${props => props.borderColor};
    box-shadow: ${props => props.boxShadow};
  }

  input:focus,
  select:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }
`;

const InlineControl = styled(FlexControl)`
  ${DangerBorder}

  @media (min-width: ${props => props.theme.screenSize.tablet}) {
    align-items: baseline;
    flex-direction: row;
  }
`;

function Control(props) {
  const { validationState, orientation, useDangerBorder, children } = props;
  const ControlWrapper = orientation === 'inline' ? InlineControl : FlexControl;

  const theme = useTheme();
  const textColor = theme.validationTextColor[validationState];

  return (
    <ControlWrapper
      textColor={textColor}
      useDangerBorder={useDangerBorder}
      validationState={validationState}
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
  children: PropTypes.node,
  useDangerBorder: PropTypes.bool
};

Control.defaultProps = {
  orientation: 'stacked',
  validationState: 'default',
  children: null,
  useDangerBorder: false
};

export default Control;
