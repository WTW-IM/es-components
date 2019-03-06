import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop, findIndex } from 'lodash';
import Tab from './Tab';

const TabWrapper = styled.div`
  display: flex;
`;

const TabFormatter = styled.div`
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

  let displayIndex = findIndex(React.Children.toArray(children), child => {
    const key = selectedKey || value || value.key;
    return child.props.name.key
      ? child.props.name.key === key
      : child.props.name === key;
  });

  if (displayIndex < 0) {
    displayIndex = 0;
  }

  const elements = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      selected: index === displayIndex,
      action: header => {
        setValue(header);
        tabChanged(header);
      }
    })
  );

  return (
    <>
      <TabWrapper>
        <TabFormatter>{elements}</TabFormatter>
      </TabWrapper>
      <TabContent>{elements[displayIndex].props.children}</TabContent>
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
   * Makes sure immediate children are Tab or Tab List, as we cannot render anything else in the tab heading.
   */
  children: childrenRule,
  selectedKey: PropTypes.any,
  /**
   * Callback when the selected tab has changed. The callback is given the name of the tab that is active
   */
  tabChanged: PropTypes.func
};

TabPanel.defaultProps = {
  children: [],
  selectedKey: '',
  tabChanged: noop
};

TabPanel.Tab = Tab;

export default TabPanel;
