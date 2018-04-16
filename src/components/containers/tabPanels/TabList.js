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
    background-color: ${props =>
      props.selected
        ? props.theme.colors.white
        : props.theme.colors.grayLighter};
    box-shadow: ${props =>
      props.selected ? `0px 0px 10px ${props.theme.colors.gray}` : 'unset'};
    color: ${props =>
      props.selected ? props.theme.colors.black : props.theme.colors.primary};
    display: inline-block;
    margin: 0;
    font-size: inherit;
    padding: 10px;
    &:active {
      margin: 0;
    }
  }

  div button {
    padding: 5px 10px;
    text-align: left;
    box-shadow: unset;
  }

  @media (max-width: ${props => props.theme.screenSize.desktop}) {
    position: relative;
    button {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    button span {
      margin: 10px 5px 0 0;
    }
    div {
      width: 100%;
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
    margin-bottom: -1px;
    button {
      background-color: ${props => props.theme.colors.white};
      border-radius: 2px 2px 0 0;
      color: ${props =>
        props.selected ? props.theme.colors.black : props.theme.colors.primary};
      height: 100%;
      padding: 0 3px;
      box-shadow: unset;
      z-index: 1;
      &:active {
        margin: 0;
      }
      &:hover {
        background-color: ${props => props.theme.colors.grayLighter};
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
      <DisplayButton
        name={optionKey}
        handleOnClick={update}
        aria-expanded={optionKey === selectedName}
      >
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
