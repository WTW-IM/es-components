import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from 'es-components-via-theme';
import TabList from './TabList';
import Tab from './Tab';
import { some } from 'lodash';

const TabWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.gray4};
`;

const TabFormatter = styled.div`
  display: flex;
  flex-direction: column;
  font-size: inherit;
  @media (max-width: ${props => props.theme.screenSize.desktop}) {
    width: 100%;
  }
  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const TabContent = styled('div')``;

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    const child = Array.isArray(this.props.children)
      ? props.children[0]
      : props.children;
    const selectedChild = this.getFirstValueChild(child);
    this.state = {
      value:
        selectedChild.props.name ||
        props.optionKeyFunc(selectedChild.props.optiontext),
      currentContent: selectedChild.props.children
    };
    this.tabChanged = this.tabChanged.bind(this);
  }

  getFirstValueChild(child) {
    if (Array.isArray(child.props.children)) {
      return child.props.children[0];
    }
    return child;
  }

  listIsSelected(list) {
    if (Array.isArray(list.props.children)) {
      /* eslint-disable no-confusing-arrow */
      return some(
        list.props.children,
        child =>
          this.props.optionKeyFunc(child.props.optiontext) === this.state.value
      );
      /* eslint-enable */
    }
    return false;
  }

  tabChanged(name, child) {
    this.setState({ value: name, currentContent: child });
  }

  render() {
    const { theme, children, optionKeyFunc } = this.props;
    const elements = React.Children.map(children, (child, i) => {
      const isSelected =
        child.props.name === this.state.value ||
        this.listIsSelected(child) ||
        (i === 0 && this.state.value === '');
      return React.cloneElement(child, {
        key: child.props.name,
        selected: isSelected,
        action: this.tabChanged,
        selectedName: this.state.value,
        theme,
        optionKeyFunc
      });
    });

    return (
      <ThemeProvider theme={theme}>
        <div>
          <TabWrapper>
            <TabFormatter>{elements}</TabFormatter>
          </TabWrapper>
          <TabContent>{this.state.currentContent}</TabContent>
        </div>
      </ThemeProvider>
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
  /**
   * Theme to be applied to the tab panel. Can be used to style the Tab and Tab List
   */
  theme: PropTypes.object,
  /**
   * Makes sure immediate children are Tab or Tab List, as we cannot render anything else in the tab heading.
   */
  children: childrenRule,

  /**
   * A function to generate a key from option text in a tab list.
   */
  optionKeyFunc: PropTypes.func.isRequired
};

TabPanel.defaultProps = {
  theme: defaultTheme
};

TabPanel.TabList = TabList;
TabPanel.Tab = Tab;

export default TabPanel;
