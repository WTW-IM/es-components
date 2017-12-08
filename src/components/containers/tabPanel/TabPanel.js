import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../theme';
import styled from 'styled-components';

const SelectedButton = styled.button`
  background-color: ${colors.white};
  color: ${colors.black};
  display: inline-block;
  border-top: 1px solid ${colors.gray};
  border-left: 1px solid ${colors.gray};
  border-right: 1px solid ${colors.gray};
`;

const TabButton = styled.button`
  background-color: ${colors.white};
  color: ${colors.linkColor};
  display: inline-block;
  &:hover: {
    background-color: ${colors.grayDarker};
  }
`;

const ContentDiv = styled.div`
  background-color: ${colors.grayLightest};
`;

function Tab({ name, selected, action, value, ...props }) {
  return (
    <span>
      {selected ? (
        <SelectedButton>{name}</SelectedButton>
      ) : (
        <TabButton onClick={() => action(value)}>{name}</TabButton>
      )}
    </span>
  );
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  action: PropTypes.func,
  value: PropTypes.string.isRequired
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

  render() {
    let contentContainer;
    const elements = React.Children.map(this.props.children, (child, i) => {
      let content = null;
      if (child.type === Tab) {
        let selected = false;
        if (
          child.props.value === this.state.value ||
          (!this.state.value && i === 0)
        ) {
          content = child.props.children;
          selected = true;
        }
        if (content) {
          contentContainer = <TabContent>{content}</TabContent>;
        }
        return (
          <Tab action={this.tabChanged} selected={selected} {...child.props} />
        );
      }
      return null;
    });

    return (
      <div>
        {elements}
        {contentContainer}
      </div>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

TabPanel.Tab = Tab;

export default TabPanel;
