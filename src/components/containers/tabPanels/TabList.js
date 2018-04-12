import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../controls/buttons/DropdownButton';
import Button from '../../controls/buttons/Button';
import defaultTheme from '../../theme/defaultTheme';
import styled from 'styled-components';
import { some, find } from 'lodash';

/* eslint-disable no-confusing-arrow */
const StyledDropdown = styled(Dropdown)`
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.grayLighter};
  border: 1px solid ${props => props.theme.colors.grayLighter};
  button {
    display: inline-block;
    color: ${props =>
      props.selected ? props.theme.colors.black : props.theme.colors.primary};
    background-color: ${props =>
      props.selected
        ? props.theme.colors.white
        : props.theme.colors.grayLighter};
    font-size: 18px;
    padding: 0px;
    margin: 0;

    @media (max-width: ${props => props.theme.screenSize.desktop}) {
      width: 100%;
    }
    &:active {
      margin: 0;
    }
  }

  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    border: 1px solid
      ${props =>
        props.selected ? props.theme.colors.grayLighter : 'transparent'};
    border-bottom: 1px solid
      ${props =>
        props.selected ? ' transparent' : props.theme.colors.grayLighter};
    background-color: ${props => props.theme.colors.white};
    margin: 0px 2px -1px 2px;

    button {
      height: 100%;
      color: ${props =>
        props.selected ? props.theme.colors.black : props.theme.colors.primary};
      background-color: ${props => props.theme.colors.white};
      border-radius: 2px 2px 0 0;
      z-index: ${props => (props.selected ? '1' : '0')};
      padding: 0;
      flex-grow: 1;
      box-shadow: none;
      padding: 0px 5px;
      &:hover {
        background-color: ${props => props.theme.colors.grayLighter};
      }
      &:active {
        margin: 0;
      }
    }
  }
`;

const DisplayButton = styled(Button)``;

/* eslint-enable */

function TabList({
  children,
  name,
  selected,
  selectedName,
  action,
  optionKeyFunc,
  ...props
}) {
  const update = event => {
    const value = event.target.name;
    const filteredChildren = Array.isArray(children)
      ? find(children, child => optionKeyFunc(child.props.optiontext) === value)
      : children;
    action(value, filteredChildren.props.children);
  };

  const selectOptions = React.Children.map(children, opt => {
    const optionKey = optionKeyFunc(opt.props.optiontext);
    return (
      <DisplayButton name={optionKey} handleOnClick={update}>
        {opt.props.optiontext}
      </DisplayButton>
    );
  });
  const finalSelection = some(
    selectOptions,
    option => option.props.name === selectedName
  )
    ? selectedName
    : name;
  /* eslint-disable jsx-a11y/use-onblur-not-onchange */
  return (
    <StyledDropdown
      buttonValue={name}
      manualButtonValue={finalSelection}
      shouldCloseOnButtonClick
      shouldUpdateButtonValue
      rootClose
      selected={selected}
      aria-expanded={selected}
      {...props}
    >
      {selectOptions}
    </StyledDropdown>
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
  selectedName: PropTypes.node,
  /**
   * A function to generate a key from option text in a tab list. Is passed from the TabPanel
   */
  optionKeyFunc: PropTypes.func.isRequired
};

TabList.defaultProps = {
  theme: defaultTheme
};

export default TabList;
