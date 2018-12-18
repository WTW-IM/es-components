import React from 'react';
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

class TabPanel extends React.Component {
  static parentTabChanged(header, tabChanged) {
    tabChanged(header);
  }

  constructor(props) {
    super(props);
    this.tabChanged = this.parentTabChanged.bind(this);
  }

  render() {
    const { children, selectedKey, tabChanged } = this.props;
    let displayIndex = findIndex(children, (child) => 
      child.props.header.key
        ? child.props.header.key === selectedKey
        : child.props.header === selectedKey
      );
      if(displayIndex < 0){
        displayIndex = 0;
      }
    const elements = React.Children.map(children, (child, i) => React.cloneElement(child, {
        selected: i === displayIndex,
        action: (header) => {this.parentTabChanged(header, tabChanged)}
    }));
    
    return (
      <div className="es-tab-panel">
        <TabWrapper className="es-tab-panel__wrapper">
          <TabFormatter className="es-tab-panel__tabs">{elements}</TabFormatter>
        </TabWrapper>
        <TabContent className="es-tab-panel__content">
          {elements[displayIndex].props.children}
        </TabContent>
      </div>
    );
  }
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
  tabChanged: PropTypes.func,
  /**
   * The key for the selected tab
   */
  selectedKey: PropTypes.string
};

TabPanel.defaultProps = {
  children: [],
  tabChanged: noop,
  selectedKey: ''
};

TabPanel.Tab = Tab;

export default TabPanel;
