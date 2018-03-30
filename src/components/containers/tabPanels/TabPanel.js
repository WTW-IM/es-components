import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import viaTheme from '../../theme/viaTheme';
import TabList from './TabList';
import Tab from './Tab';

const TabWrapper = styled('div')`
  display: flex;
  justify-content: center;
  font-size: 24px;

  @media (min-width: 899px) {
    justify-content: flex-start;
  }
`;

const TabFormatter = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 899px) {
    flex-direction: row;
  }
`;

const TabContent = styled('div')`
  border-top: 1px solid #ddd;
`;

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentContent: ''
    };
    this.tabChanged = this.tabChanged.bind(this);
  }

  componentWillMount() {
    if (this.state.value === '') {
      const child = this.props.children[0];
      const selectedChild = this.getFirstValueChild(child);
      this.tabChanged(
        selectedChild.props.name ||
          selectedChild.props.optionText.replace(/\s/g, ''),
        selectedChild.props.children
      );
    }
  }

  getFirstValueChild(child) {
    if (Array.isArray(child.props.children)) {
      return child.props.children[0];
    }
    return child;
  }

  listIsSelected(list) {
    if (Array.isArray(list.props.children)) {
      return (
        list.props.children.filter(child => {
          if (child.props.optionText) {
            return (
              child.props.optionText.replace(/\s/g, '') === this.state.value
            );
          }
          return false;
        }).length > 0
      );
    }
    return false;
  }

  tabChanged(name, child) {
    this.setState({ value: name, currentContent: child });
  }

  render() {
    const { theme, children } = this.props;
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
        theme
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

TabPanel.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node
};

TabPanel.defaultProps = {
  theme: viaTheme
};

TabPanel.TabList = TabList;
TabPanel.Tab = Tab;

export default TabPanel;
