import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import DrawerPanel from './DrawerPanel';
import { colors } from '../../theme';
import styled from 'styled-components';

function toArray(activeKeys) {
  let currentActiveKeys = activeKeys;
  if (!Array.isArray(currentActiveKeys)) {
    currentActiveKeys = currentActiveKeys ? [currentActiveKeys] : [];
  }
  return currentActiveKeys;
}

function drawerPanelPropType(props, propName, componentName) {
  const value = props[propName];
  const errMsg = `${componentName} ${propName} contains an element that is not a DrawerPanel.`;

  if (Array.isArray(value) && value.some(({ type }) => type !== DrawerPanel)) {
    return new Error(errMsg);
  }
  if (!Array.isArray(value) && value.type !== DrawerPanel) {
    return new Error(errMsg);
  }
  return null;
}

const StyledDrawer = styled.div`
  background-color: ${colors.white};
  border-top: 1px solid ${colors.grayLight};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
`;

class Drawer extends Component {
  constructor(props) {
    super(props);

    const currentActiveKeys = this.props.defaultActiveKeys;
    this.state = {
      activeKeys: toArray(currentActiveKeys)
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKeys' in nextProps) {
      this.setState({
        activeKeys: toArray(nextProps.activeKeys)
      });
    }
  }

  onClickItem(key) {
    return () => {
      let activeKeys = [...this.state.activeKeys];

      if (this.props.isAccordion) {
        activeKeys = activeKeys[0] === key ? [] : [key];
      } else {
        const index = activeKeys.indexOf(key);
        const isActive = index > -1;

        if (isActive) {
          activeKeys.splice(index, 1);
        } else {
          activeKeys.push(key);
        }
      }

      this.setState({ activeKeys });
    };
  }

  getPanels() {
    const activeKeys = this.state.activeKeys;

    return Children.map(this.props.children, (child, index) => {
      // If there is no key provided, use the panel order as default key
      const key = child.key || String(index);
      const title = child.props.title;
      const noPadding = child.props.noPadding || false;

      let isActive = false;
      if (this.props.isAccordion) {
        isActive = activeKeys[0] === key;
      } else {
        isActive = activeKeys.indexOf(key) > -1;
      }

      const props = {
        key,
        title,
        noPadding,
        isActive,
        children: child.props.children,
        onItemClick: this.onClickItem(key).bind(this),
        closedIconName: this.props.closedIconName,
        openedIconName: this.props.openedIconName
      };

      return React.cloneElement(child, props);
    });
  }

  render() {
    return (
      <StyledDrawer className={this.props.className}>
        {this.getPanels()}
      </StyledDrawer>
    );
  }
}

Drawer.propTypes = {
  /** Should only contain one or more DrawerPanel elements */
  children: drawerPanelPropType,
  /** Add additional CSS classes to the root drawer element */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  /** Override the default plus icon with another OE icon name */
  closedIconName: PropTypes.string,
  /** Specify which panels are opened by default */
  defaultActiveKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /** Only allows one DrawerPanel to be open at a time */
  isAccordion: PropTypes.bool,
  /** Override the default minus icon with another OE icon name */
  openedIconName: PropTypes.string
};

Drawer.defaultProps = {
  isAccordion: false,
  closedIconName: 'plus',
  openedIconName: 'minus'
};

Drawer.Panel = DrawerPanel;

export default Drawer;
