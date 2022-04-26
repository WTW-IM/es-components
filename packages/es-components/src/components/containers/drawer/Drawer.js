import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DrawerContext } from './DrawerContext';
import { DrawerItem, DrawerItemBody, DrawerItemOpener } from './DrawerItem';
import DrawerPanel from './DrawerPanel';

const StyledDrawer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  box-shadow: 0 1px 1px ${props => props.theme.colors.boxShadowLight};
  margin-bottom: 25px;
`;

const UnstyledDrawer = styled.div``;

const simpleSetsEqual = (set1, set2) =>
  set1.size === set2.size && [...set1].every(item => set2.has(item));

function Drawer(props) {
  const {
    activeKeys: activeKeysProp,
    children,
    closedIconName,
    isAccordion,
    onActiveKeysChanged,
    openedIconName,
    defaultStyles,
    ...other
  } = props;

  const [activeKeys, setActiveKeys] = useState(activeKeysProp || []);

  const setActiveKey = useCallback(
    key => {
      const isOpen = activeKeys.includes(key);
      let newKeys = isOpen
        ? activeKeys.filter(k => k !== key)
        : [...activeKeys, key];

      if (isAccordion) newKeys = isOpen ? [] : [key];

      setActiveKeys(Array.from(new Set(newKeys)));
    },
    [isAccordion, activeKeys]
  );

  useEffect(() => {
    setActiveKeys(oldActiveKeys => {
      const oldKeysSet = new Set(oldActiveKeys);
      const newKeysSet = new Set(activeKeysProp);
      return simpleSetsEqual(oldKeysSet, newKeysSet)
        ? oldActiveKeys
        : Array.from(newKeysSet);
    });
  }, [activeKeysProp]);

  useEffect(() => {
    onActiveKeysChanged(activeKeys);
  }, [onActiveKeysChanged, activeKeys]);

  const DrawerContainer = defaultStyles ? StyledDrawer : UnstyledDrawer;

  return (
    <DrawerContext.Provider
      value={{ openedIconName, closedIconName, activeKeys, setActiveKey }}
    >
      <DrawerContainer {...other}>{children}</DrawerContainer>
    </DrawerContext.Provider>
  );
}

Drawer.propTypes = {
  /** Set which panels are open */
  activeKeys: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /** Usually only one or more Drawer.Panel elements */
  children: PropTypes.node,
  /** Override the default plus icon with another OE icon name */
  closedIconName: PropTypes.string,
  /** Only allows one DrawerPanel to be open at a time */
  isAccordion: PropTypes.bool,
  /** Function called when changing active keys */
  onActiveKeysChanged: PropTypes.func.isRequired,
  /** Override the default minus icon with another OE icon name */
  openedIconName: PropTypes.string,
  /** Include default container styles */
  defaultStyles: PropTypes.bool
};

Drawer.defaultProps = {
  activeKeys: undefined,
  isAccordion: false,
  closedIconName: 'add',
  openedIconName: 'minus',
  children: undefined,
  defaultStyles: true
};

Drawer.Panel = DrawerPanel;
Drawer.Item = DrawerItem;
Drawer.ItemOpener = DrawerItemOpener;
Drawer.ItemBody = DrawerItemBody;

export default Drawer;
