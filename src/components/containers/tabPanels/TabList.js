import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../controls/dropdown/Dropdown';
import defaultTheme from '../../theme/defaultTheme';
import styled from 'styled-components';

/* eslint-disable no-confusing-arrow */
const StyledDropdown = styled(Dropdown)`
  display: flex;
  color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.primary};
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.grayLighter};
  border: 1px solid ${props => props.theme.colors.gray};
  font-size: 18px;
  width: auto;
  padding: 0px;
  margin: 0;

  select {
    border: 0;
    color: ${props =>
      props.selected ? props.theme.colors.black : props.theme.colors.primary};
  }
  select:hover {
    background-color: ${props =>
      props.selected
        ? props.theme.colors.white
        : props.theme.colors.grayLighter};
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    background-color: ${props => props.theme.colors.white};
    border: ${props =>
      props.selected ? `1px solid ${props.theme.colors.gray}` : '0px'};
    border-bottom: ${props => (props.selected ? '0px' : '1px')};
    border-radius: 2px 2px 0 0;
    display: inline-block;
    margin: ${props => (props.selected ? '0px 0px -1px 2px' : '0px')};
    z-index: ${props => (props.selected ? '1' : '0')};
    padding: 10px 15px;
    flex-grow: 1;
    &:hover {
      background-color: ${props =>
        props.selected
          ? props.theme.colors.white
          : props.theme.colors.grayLighter};
    }
  }
`;
/* eslint-enable */

function TabList({
  children,
  name,
  selected,
  selectedName,
  action,
  theme,
  ...props
}) {
  const update = event => {
    const value = event.target.value;
    const filteredChildren = children.filter(
      child => child.props.optionText.replace(/\s/g, '') === value
    );
    action(value, filteredChildren[0].props.children);
  };

  const values = [];
  const selectOptions = React.Children.map(children, (opt, i) => {
    const optionKey = opt.props.optionText.replace(/\s/g, '');
    values.push(optionKey);
    return { optionText: opt.props.optionText, optionValue: optionKey };
  });
  const finalSelection = values.indexOf(selectedName) < 0 ? '' : selectedName;
  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <StyledDropdown
      firstOptionDisplayText={name}
      inline
      value={finalSelection}
      options={selectOptions}
      onChange={update}
      selected={selected}
    />
  );
  /* eslint-enable */
}

function tabListRule(props, propName, component) {
  let children = props[propName];
  if (!Array.isArray(children)) {
    children = [children];
  }
  if (!children.every(child => typeof child.props.optionText !== 'undefined')) {
    return new Error(
      'Tab List direct children must have an optionText property.'
    );
  }

  return null;
}
TabList.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  action: PropTypes.func,
  theme: PropTypes.object,
  children: tabListRule,
  selectedName: PropTypes.string
};

TabList.defaultProps = {
  theme: defaultTheme
};

export default TabList;
