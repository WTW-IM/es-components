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
  const { children, selectedKey, tabChanged, canTabChange, className } = props;
  const [value, setValue] = useState(selectedKey);

  let selectedIndex = findIndex(React.Children.toArray(children), child => {
    const key = selectedKey || value;
    return child.props.name && child.props.name.key
      ? child.props.name.key === key
      : child.props.name === key;
  });

  if (selectedIndex < 0) {
    selectedIndex = 0;
  }

  const elements = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      selected: index === selectedIndex,
      action: async header => {
        /*
        We may want to display some interstitial UI to show that we're waiting to determine if we can get to the next tab.
        Being the first implementation of async support, this is fine for now.
        But were async support to grow and spread to other components, concerns like the above should definately be addressed for consistency.
        */

        const canChange = await canTabChange(header);
        if (canChange) {
          setValue(header);
          tabChanged(header);
        }
      }
    })
  );

  return (
    <div className={className}>
      <TabList role="tablist" className='tab-list'>{elements}</TabList>
      <TabContent role="tabpanel" className="tab-content" >
        {elements[selectedIndex].props.children}
      </TabContent>
    </div >
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
   * Callback run before the selected tab has changed. The callback is given the name of the tab that is active and returns whether the tab change event should fire.
   */
  canTabChange: PropTypes.func,
  /**
   * Callback when the selected tab has changed. The callback is given the name of the tab that is active
   */
  tabChanged: PropTypes.func
};

TabPanel.defaultProps = {
  children: undefined,
  selectedKey: '',
  tabChanged: noop,
  canTabChange: () => true
};

TabPanel.Tab = Tab;

export default TabPanel;
