import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled from 'styled-components';

const SelectedButton = styled.button`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray};
  border-bottom: 1px transparent;
  border-radius: 2px 2px 0 0;
  color: ${colors.black};
  display: inline-block;
  font-size: 18px;
  font-family: Arial, sans-serif;
  margin-right: 2px;
  margin-bottom: -1px;
  padding: 10px 15px;
`;

const TabButton = styled.button`
  background-color: ${colors.white};
  border: 0px;
  border-bottom: 1px;
  color: ${colors.linkColor};
  display: inline-block;
  font-size: 18px;
  font-family: Arial, sans-serif;
  padding: 10px 15px;
  &:hover: {
    background-color: ${colors.grayDarker};
  }
`;

const SelectedDropdown = styled.select`
  background-color: ${colors.white};
  border: 1px solid ${colors.gray};
  border-bottom: 1px transparent;
  border-radius: 2px 2px 0 0;
  box-shadow: 0px;
  color: ${colors.black};
  display: inline-block;
  font-family: Arial, sans-serif;
  font-size: 18px;
  margin-right: 2px;
  padding: 10px 15px;
`;

const OtherDropdown = styled.select`
  background-color: ${colors.white};
  border: 0px;
  border-bottom: 1px;
  color: ${colors.linkColor};
  display: inline-block;
  font-size: 18px;
  font-family: Arial, sans-serif;
  padding: 10px 15px;
  &:hover: {
    background-color: ${colors.grayDarker};
  }
`;

const ContentDiv = styled.div`
  border-top: 1px solid ${colors.grayLight};
`;

function Tab({ name, selected, action, ...props }) {
  return selected ? (
    <SelectedButton>{name}</SelectedButton>
  ) : (
    <TabButton onClick={() => action(name)}>{name}</TabButton>
  );
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  action: PropTypes.func
};

function TabList({ options, name, selected, action, ...props }) {
  const update = event => {
    const value = event.target.value;
    action(value);
  };

  const Title = <option disabled>{name}</option>;

  const selectOptions = options.map(opt => {
    const optionKey = opt.optionText.replace(/\s/g, '');
    return (
      <option key={optionKey} value={optionKey}>
        {opt.optionText}
      </option>
    );
  });

  return selected ? (
    <SelectedDropdown value={name} onChange={update}>
      {Title}
      {selectOptions}
    </SelectedDropdown>
  ) : (
    <OtherDropdown value={name} onChange={update}>
      {Title}
      {selectOptions}
    </OtherDropdown>
  );
}

TabList.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  action: PropTypes.func
};

function TabItem({ name, children }) {
  return <span />;
}

TabItem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

function TabContent({ children, ...props }) {
  return <ContentDiv>{children}</ContentDiv>;
}

TabContent.propTypes = {
  children: PropTypes.any.isRequired
};

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.tabChanged = this.tabChanged.bind(this);
  }

  tabChanged = name => {
    this.setState({ value: name });
  };

  isChildSelected(value, index) {
    return value === this.state.value || (!this.state.value && index === 0);
  }

  render() {
    let content = null;
    const elements = React.Children.map(this.props.children, (child, i) => {
      let selected = false;
      if (child.type === Tab) {
        if (this.isChildSelected(child.props.name, i)) {
          content = <ContentDiv>{child.props.children}</ContentDiv>;
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
              content = <ContentDiv>{secondChild.props.children}</ContentDiv>;
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
      <div>
        {elements}
        {content}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: (props, propName, component) => {
    let badChild;
    const isTabItem = child => {
      const isTab = child.type.name === 'Tab' || child.type.name === 'TabList';
      if (!isTab) {
        badChild = child;
      }
      return isTab;
    };
    if (!props[propName].every(isTabItem)) {
      return new Error(
        `Tab Panel only accepts Tab or TabList as direct descendants. You gave a ${badChild
          .type.name || badChild.type}`
      );
    }
    return true;
  }
};

TabPanel.Tab = Tab;
TabPanel.TabList = TabList;
TabPanel.TabItem = TabItem;

export default TabPanel;
