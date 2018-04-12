import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../controls/dropdown/Dropdown';
import defaultTheme from '../../theme/defaultTheme';
import styled from 'styled-components';
import { some, find } from 'lodash';

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
    align-self: center;
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
    display: flex;
    margin: ${props =>
      props.selected ? '0px 2px -1px 2px' : '1px 4px 0px  2px'};
    z-index: ${props => (props.selected ? '1' : '0')};
    padding: 0;
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
  optionKeyFunc,
  ...props
}) {
  const update = event => {
    const value = event.target.value;
    const filteredChildren = Array.isArray(children)
      ? find(children, child => optionKeyFunc(child.props.optiontext) === value)
      : children;
    action(value, filteredChildren.props.children);
  };

  const selectOptions = React.Children.map(children, (opt, i) => {
    const optionKey = optionKeyFunc(opt.props.optiontext);
    return { optionText: opt.props.optiontext, optionValue: optionKey };
  });
  const finalSelection = some(selectOptions, ['optionValue', selectedName])
    ? selectedName
    : '';
  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <StyledDropdown
      firstOptionDisplayText={name}
      inline
      value={finalSelection}
      options={selectOptions}
      onChange={update}
      selected={selected}
      aria-expanded={selected}
    />
  );
  /* eslint-enable */
}

function tabListRule(props, propName, component) {
  let children = props[propName];
  if (!Array.isArray(children)) {
    children = [children];
  }
  if (!children.every(child => typeof child.props.optiontext !== 'undefined')) {
    return new Error(
      'Tab List direct children must have an optiontext property.'
    );
  }

  return null;
}
TabList.propTypes = {
  /**
   * The name of the tab, and the default display value.
   */
  name: PropTypes.string.isRequired,
  /**
   * Whether to format this tab as selected, according to the tabPanel.
   */
  selected: PropTypes.bool,
  /**
   * The action to be taken upon changing the selection in the dropdown
   */
  action: PropTypes.func,
  /**
   * The theme to be used
   */
  theme: PropTypes.object,
  /**
   * the children to be displayed in the content area
   */
  children: tabListRule,
  /**
   * The value of the tab that is currently selected
   */
  selectedName: PropTypes.string,
  /**
   * A function to generate a key from option text in a tab list. Is passed from the TabPanel
   */
  optionKeyFunc: PropTypes.func.isRequired
};

TabList.defaultProps = {
  theme: defaultTheme
};

export default TabList;
