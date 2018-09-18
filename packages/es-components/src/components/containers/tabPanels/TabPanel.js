import React from 'react';
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

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    const child = Array.isArray(this.props.children)
      ? props.children[0]
      : props.children;
    this.state = {
      value: child.props.name,
      currentContent: child.props.children
    };
    this.tabChanged = this.tabChanged.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.value !== prevState.value) {
      this.props.tabChanged(this.state.value);
    }
  }

  tabChanged(name, child) {
    this.setState({
      value: name,
      currentContent: child
    });
  }

  render() {
    const { children } = this.props;
    const elements = React.Children.map(children, (child, i) => {
      const isSelected = child.props.name === this.state.value;
      return React.cloneElement(child, {
        selected: isSelected,
        action: this.tabChanged
      });
    });

    return (
      <div className="es-tab-panel">
        <TabWrapper className="es-tab-panel__wrapper">
          <TabFormatter className="es-tab-panel__tabs">{elements}</TabFormatter>
        </TabWrapper>
        <TabContent className="es-tab-panel__content">
          {this.state.currentContent}
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
  tabChanged: PropTypes.func
};

TabPanel.defaultProps = {
  children: [],
  tabChanged: noop
};

TabPanel.Tab = Tab;

export default TabPanel;
