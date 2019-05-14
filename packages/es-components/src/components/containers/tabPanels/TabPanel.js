import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop, findIndex } from 'lodash';
import Tab from './Tab';

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: inherit;
  overflow: hidden;
  @media (max-width: ${props => props.theme.screenSize.desktop}) {
    width: 100%;
  }
  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const TabContent = styled.div`
  margin-top: -1px;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray4};
`;

function TabPanel(props) {
  const { children, selectedKey, tabChanged } = props;
  const [value, setValue] = useState(selectedKey);

  let selectedIndex = findIndex(React.Children.toArray(children), child => {
    const key = selectedKey || value || value.key;
    return child.props.name.key
      ? child.props.name.key === key
      : child.props.name === key;
  });

  if (selectedIndex < 0) {
    selectedIndex = 0;
  }

  const elements = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      selected: index === selectedIndex,
      action: header => {
        setValue(header);
        tabChanged(header);
      }
    })
  );

  return (
    <>
      <TabList role="tablist">{elements}</TabList>
      <TabContent role="tabpanel">
        {elements[selectedIndex].props.children}
      </TabContent>
    </>
  );
}

function childrenRule(props, propName, component) {
  let children = props[propName];
  if (!Array.isArray(children)) {
    children = [children];
  }

  if (
    !children.every(
      child => child.type.name === 'Tab' || child.type.target === Tab
    )
  ) {
    return new Error('Tab Panel only accepts Tabs as direct descendants.');
  }

  return null;
}

TabPanel.propTypes = {
  /**
   * Makes sure immediate children are Tabs, as we cannot render anything else in the tab heading.
   */
  children: childrenRule,
  selectedKey: PropTypes.any,
  /**
   * Callback when the selected tab has changed. The callback is given the name of the tab that is active
   */
  tabChanged: PropTypes.func
};

TabPanel.defaultProps = {
  children: undefined,
  selectedKey: '',
  tabChanged: noop
};

TabPanel.Tab = Tab;

export default TabPanel;
