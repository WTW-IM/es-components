import React from 'react';
import styled from 'styled-components';

const DropdownBase = styled.select`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray5};
  border-radius: 2px;
  box-shadow: ${props => props.boxShadow};
  box-sizing: border-box;
  color: ${props => props.theme.colors.black};
  flex: auto;
  font-size: ${props => props.theme.font.baseFontSize};
  font-weight: normal;
  height: 39px;
  min-width: 100px;
  padding: 6px 12px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
    outline: 0;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray2};
    cursor: not-allowed;
  }
`;

function Dropdown(props) {
  return <DropdownBase {...props} />;
}

export default Dropdown;
