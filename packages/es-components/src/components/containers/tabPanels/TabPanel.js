import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';
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
  overflow: auto;
  border-top: 1px solid ${props => props.theme.colors.gray4};
`;

function TabPanel(props) {
  const content = Array.isArray(props.children)
    ? props.children[0]
    : props.children;

  const [value, setValue] = useState(content.props.name);
  const [currentContent, setCurrentContent] = useState(content.props.children);

  function tabChanged(name, child) {
    if (name !== value) {
      setValue(name);
      setCurrentContent(child);
      props.tabChanged(value);
    }
  }

  const { children } = props;
  const elements = React.Children.map(children, (child, i) => {
    const isSelected = child.props.name.key
      ? child.props.name.key === value.key
      : child.props.name === value.name;
    return React.cloneElement(child, {
      selected: isSelected,
      action: tabChanged
    });
  });

  return (
    <div>
      <TabWrapper>
        <TabFormatter>{elements}</TabFormatter>
      </TabWrapper>
      <TabContent>{currentContent}</TabContent>
    </div>
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
  /**
   * Callback when the selected tab has changed. The callback is given the name of the tab that is active
   */
  tabChanged: PropTypes.func
};

TabPanel.defaultProps = {
  children: [],
  tabChanged: noop
};

TabPanel.Tab = Tab;

export default TabPanel;
