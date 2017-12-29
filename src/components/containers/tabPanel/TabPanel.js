import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled from 'styled-components';
import Tab from './Tab';
import TabList from './TabList';

const ContentDiv = styled.div`
  border-top: 1px solid ${colors.grayLight};
`;

function TabItem({ name, children }) {
  return <span />;
}

TabItem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      allValues: []
    };

    this.tabChanged = this.tabChanged.bind(this);
  }

  componentDidMount() {
    const values = [];
    React.Children.forEach(this.props.children, (child, i) => {
      if (child.type === Tab) {
        values.push(child.props.name);
      }
      if (child.type === TabList) {
        React.Children.forEach(child.props.children, (secondChild, j) => {
          values.push(secondChild.props.name);
        });
      }
      this.setState({ allValues: values });
    });
  }

  setupContent(child) {
    return (
      <ContentDiv id="tab-panel-content" aria-live="polite">
        {child}
      </ContentDiv>
    );
  }

  tabChanged = name => {
    this.setState({ value: name });
  };

  isChildSelected(value, index) {
    return value === this.state.value || (!this.state.value && index === 0);
  }

  handleKeyDown = event => {
    let newIndex = 0;
    const getIndexFromMoreBrowsers = offset => {
      this.state.allValues.some((val, i) => {
        if (val === this.state.value) {
          newIndex = i + offset;
        }
        return false;
      });
    };
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      getIndexFromMoreBrowsers(-1);
      const finalIndex =
        newIndex < 0 ? this.state.allValues.length - 1 : newIndex;
      this.setState({ value: this.state.allValues[finalIndex] });
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      getIndexFromMoreBrowsers(1);
      const finalIndex = newIndex >= this.state.allValues.length ? 0 : newIndex;
      this.setState({ value: this.state.allValues[finalIndex] });
    }
  };

  render() {
    let content = null;
    const elements = React.Children.map(this.props.children, (child, i) => {
      let selected = false;
      if (child.type === Tab) {
        if (this.isChildSelected(child.props.name, i)) {
          content = this.setupContent(child.props.children);
          selected = true;
        }
        return React.cloneElement(child, {
          selected,
          action: this.tabChanged,
          key: child.props.name
        });
      }
      if (child.type === TabList) {
        const options = React.Children.map(
          child.props.children,
          (secondChild, j) => {
            if (this.isChildSelected(secondChild.props.name, i)) {
              content = this.setupContent(secondChild.props.children);
              selected = true;
            }
            return { optionText: secondChild.props.name };
          }
        );
        return React.cloneElement(child, {
          selected,
          action: this.tabChanged,
          options,
          key: child.props.name
        });
      }
      return null;
    });

    return (
      <div onKeyDown={this.handleKeyDown} role="application">
        {elements}
        {content}
      </div>
    );
  }
}

function childrenRule(props, propName, component) {
  if (
    !props[propName].every(
      child => child.type.name === 'Tab' || child.type.name === 'TabList'
    )
  ) {
    return new Error(
      'Tab Panel only accepts Tab or TabList as direct descendants.'
    );
  }
  return null;
}

TabPanel.propTypes = {
  children: childrenRule
};

TabPanel.Tab = Tab;
TabPanel.TabList = TabList;
TabPanel.TabItem = TabItem;

export default TabPanel;
