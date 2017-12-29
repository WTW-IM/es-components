import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled from 'styled-components';

const StyledDropdown = styled.select`
  background-color: ${colors.white};
  border: ${props => (props.selected ? '1px solid ${colors.gray}' : '0px')};
  border-bottom: ${props => (props.selected ? '0px' : '1px')};
  border-radius: 2px 2px 0 0;
  color: ${props => (props.selected ? colors.black : colors.linkColor)};
  display: inline-block;
  font-size: 18px;
  margin-right: ${props => (props.selected ? '2px' : '0px')};
  padding: 10px 15px;
`;

function TabList({ options, name, selected, action, ...props }) {
  const update = event => {
    const value = event.target.value;
    action(value);
  };

  const Title = <option disabled>{name}</option>;
  const selectOptions = options.map(opt => {
    const optionKey = opt.optionText.replace(/\s/g, '');
    return (
      <option key={optionKey} value={optionKey}>
        {opt.optionText}
      </option>
    );
  });

  return (
    <StyledDropdown
      value={name}
      onChange={update}
      selected={selected}
      {...props}
    >
      {Title}
      {selectOptions}
    </StyledDropdown>
  );
}

TabList.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  action: PropTypes.func
};

export default TabList;
