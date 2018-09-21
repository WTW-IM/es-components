/* eslint react/no-unused-prop-types: 0 */
/* ^^^ We need to declare defaultActiveKeys.
 * It's a prop used by uncontrollable, and needs to be documented */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { noop } from 'lodash';
import uncontrollable from 'uncontrollable';
import classnames from 'classnames';

import DrawerPanel from './DrawerPanel';

function drawerPanelPropType(props, propName, componentName) {
  const value = props[propName];
  const errMsg = `${componentName} ${propName} contains an element that is not a Drawer.Panel.`;

  if (Array.isArray(value) && value.some(({ type }) => type !== DrawerPanel)) {
    return new Error(errMsg);
  }
  if (!Array.isArray(value) && value.type !== DrawerPanel) {
    return new Error(errMsg);
  }
  return null;
}

const StyledDrawer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  box-shadow: 0 1px 1px ${props => props.theme.colors.boxShadowLight};
  margin-bottom: 25px;
`;

export const Drawer = props => {
  const {
    activeKeys,
    children,
    className,
    closedIconName,
    isAccordion,
    onActiveKeysChanged,
    openedIconName
  } = props;

  const onItemClick = key => {
    let nextActiveKeys = [...activeKeys];

    if (isAccordion) {
      nextActiveKeys = nextActiveKeys[0] === key ? [] : [key];
    } else {
      const index = nextActiveKeys.indexOf(key);
      const isOpen = index > -1;

      if (isOpen) {
        nextActiveKeys.splice(index, 1);
      } else {
        nextActiveKeys.push(key);
      }
    }

    onActiveKeysChanged(nextActiveKeys);
  };

  const getPanels = () =>
    Children.map(children, (child, index) => {
      // If there is no key provided, use the panel order as default key
      const key = child.key || String(index + 1);
      const { title, titleAside } = child.props;
      const noPadding = child.props.noPadding || false;

      let isOpen = false;
      if (isAccordion) {
        isOpen = activeKeys[0] === key;
      } else {
        isOpen = activeKeys.indexOf(key) > -1;
      }

      const childProps = {
        key,
        title,
        titleAside,
        noPadding,
        isOpen,
        children: child.props.children,
        onItemClick: () => onItemClick(key),
        closedIconName,
        openedIconName
      };

      return React.cloneElement(child, childProps);
    });

  return (
    <StyledDrawer className={classnames('es-drawer', className)}>
      {getPanels()}
    </StyledDrawer>
  );
};

Drawer.propTypes = {
  /** Set which panels are open */
  activeKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /** Should only contain one or more Drawer.Panel elements */
  children: drawerPanelPropType,
  /** Add additional CSS classes to the root drawer element */
  className: PropTypes.string,
  /** Override the default plus icon with another OE icon name */
  closedIconName: PropTypes.string,
  /** Used in uncontrolled mode to set initial drawer state */
  defaultActiveKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /** Only allows one DrawerPanel to be open at a time */
  isAccordion: PropTypes.bool,
  /** Function called when changing active keys */
  onActiveKeysChanged: PropTypes.func,
  /** Override the default minus icon with another OE icon name */
  openedIconName: PropTypes.string
};

Drawer.defaultProps = {
  activeKeys: [],
  isAccordion: false,
  closedIconName: 'add',
  onActiveKeysChanged: noop,
  openedIconName: 'minus',
  children: null,
  className: undefined,
  defaultActiveKeys: undefined
};

const UncontrolledDrawer = uncontrollable(Drawer, {
  activeKeys: 'onActiveKeysChanged'
});

UncontrolledDrawer.Panel = DrawerPanel;

export default withTheme(UncontrolledDrawer);
