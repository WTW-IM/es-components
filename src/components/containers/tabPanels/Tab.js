import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../theme/defaultTheme';

/* eslint-disable no-confusing-arrow */
const TabButton = styled.button`
  background-color: ${props => props.theme.colors.white};
  border: ${props =>
    props.selected ? `1px solid ${props.theme.colors.gray}` : '0px'};
  border-bottom: ${props => (props.selected ? '0px' : '1px')};
  color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.linkColor};
  display: inline-block;
  font-size: 18px;
  margin-right: ${props => (props.selected ? '2px' : '0px')};
  padding: 10px 15px;
  width: auto;
  flex-grow: 1;
  text-align: left;
  &:hover: {
    background-color: ${props => props.theme.colors.grayDarker};
  }
`;

/* eslint-enable */

function Tab({ name, selected, action, theme, children, ...props }) {
  return (
    <TabButton
      aria-controls="tab-panel-content"
      onClick={() => action(name, children)}
      selected={selected}
      theme={theme}
      {...props}
    >
      {name}
    </TabButton>
  );
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  action: PropTypes.func,
  theme: PropTypes.object,
  children: PropTypes.node
};

Tab.defaultProps = {
  theme: defaultTheme
};

export default Tab;
