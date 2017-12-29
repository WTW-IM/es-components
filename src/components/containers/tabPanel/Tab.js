import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled from 'styled-components';

const TabButton = styled.button`
  background-color: ${colors.white};
  border: ${props => (props.selected ? '1px solid ${colors.gray}' : '0px')};
  border-bottom: ${props => (props.selected ? '0px' : '1px')};
  color: ${props => (props.selected ? colors.black : colors.linkColor)};
  display: inline-block;
  font-size: 18px;
  margin-right: ${props => (props.selected ? '2px' : '0px')};
  padding: 10px 15px;
  &:hover: {
    background-color: ${colors.grayDarker};
  }
`;

function Tab({ name, selected, action, ...props }) {
  return (
    <TabButton
      aria-controls="tab-panel-content"
      onClick={() => action(name)}
      selected={selected}
      {...props}
    >
      {name}
    </TabButton>
  );
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  action: PropTypes.func
};

export default Tab;
