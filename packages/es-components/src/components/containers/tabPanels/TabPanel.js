import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from 'es-components-via-theme';
import Tab from './Tab';

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

const AriaAnnouncer = styled.p`
  position: fixed;
  color: transparent;
  left: -1000px;
  top: 10px;
`;

class TabPanel extends React.Component {
  constructor(props) {
    super(props);
    const child = Array.isArray(this.props.children)
      ? props.children[0]
      : props.children;
    this.state = {
      value: child.props.name,
      currentContent: child.props.children,
      simpleName: child.props.simpleName || child.props.name
    };
    this.tabChanged = this.tabChanged.bind(this);
  }

  tabChanged(name, child, simpleName) {
    this.setState({
      value: name,
      currentContent: child,
      simpleName: simpleName || name
    });
  }

  render() {
    const { theme, children } = this.props;
    const elements = React.Children.map(children, (child, i) => {
      const isSelected = child.props.name === this.state.value;
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
          <AriaAnnouncer id="announcer" aria-live="assertive">{`${
            this.state.simpleName
          } Sub text is now showing`}</AriaAnnouncer>
          <TabWrapper>
            <TabFormatter>{elements}</TabFormatter>
          </TabWrapper>
          <div>{this.state.currentContent}</div>
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
  if (!children.every(child => child.type.name === 'Tab')) {
    return new Error('Tab Panel only accepts Tabs as direct descendants.');
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
  children: childrenRule
};

TabPanel.defaultProps = {
  theme: defaultTheme
};

TabPanel.Tab = Tab;

export default TabPanel;
