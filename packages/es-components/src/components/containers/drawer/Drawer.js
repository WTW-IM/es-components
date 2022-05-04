import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DrawerContext } from './DrawerContext';
import { DrawerItem, DrawerItemBody, DrawerItemOpener } from './DrawerItem';
import DrawerPanel from './DrawerPanel';

export { useDrawerItemContext, DrawerItemContext } from './DrawerItem';

const StyledDrawer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  box-shadow: 0 1px 1px ${props => props.theme.colors.boxShadowLight};
  margin-bottom: 25px;
`;

const UnstyledDrawer = styled.div``;

const simpleArraysEqual = (arr1, arr2) =>
  arr1?.length === arr2?.length && arr1?.every(item => arr2?.includes(item));

const addKey = (key, keysList) => {
  if (keysList?.includes(key)) return keysList;

  const newKeys = [...new Set([key, ...keysList])];
  return newKeys;
};

const removeKey = (key, keysList) => {
  if (!keysList?.includes(key)) return keysList;

  const newKeys = keysList?.filter(k => k !== key);
  return newKeys;
};

export function Drawer(props) {
  const {
    activeKeys: activeKeysProp,
    children,
    closedIconName,
    isAccordion,
    onActiveKeysChanged,
    openedIconName,
    useDefaultStyles,
    ...other
  } = props;

  const [activeKeys, setActiveKeys] = useState(activeKeysProp || []);
  const resetActiveKeys = useCallback(
    keymaker =>
      setActiveKeys(oldKeys => {
        const keys = keymaker(oldKeys);
        const newKeys = keys.length && isAccordion ? [keys[0]] : keys;
        return simpleArraysEqual(oldKeys, newKeys) ? oldKeys : newKeys;
      }),
    [isAccordion]
  );

  const setActiveKey = useCallback(
    key => resetActiveKeys(oldActiveKeys => addKey(key, oldActiveKeys)),
    [resetActiveKeys]
  );

  const unsetActiveKey = useCallback(
    key => resetActiveKeys(oldActiveKeys => removeKey(key, oldActiveKeys)),
    [resetActiveKeys]
  );

  const toggleActiveKey = useCallback(
    key => {
      resetActiveKeys(oldActiveKeys => {
        const isOpen = oldActiveKeys.includes(key);
        return (isOpen ? removeKey : addKey)(key, oldActiveKeys);
      });
    },
    [resetActiveKeys]
  );

  const [drawerState, setDrawerState] = useState({
    activeKeys,
    setActiveKey,
    unsetActiveKey,
    toggleActiveKey
  });

  useEffect(() => {
    if (!activeKeysProp) return;

    resetActiveKeys(oldKeys =>
      simpleArraysEqual(oldKeys, activeKeysProp) ? oldKeys : activeKeysProp
    );
  }, [activeKeysProp, resetActiveKeys]);

  useEffect(() => {
    onActiveKeysChanged(activeKeys);
  }, [onActiveKeysChanged, activeKeys]);

  useEffect(() => {
    setDrawerState({
      activeKeys,
      setActiveKey,
      unsetActiveKey,
      toggleActiveKey
    });
  }, [activeKeys, setActiveKey, unsetActiveKey, toggleActiveKey]);

  const DrawerContainer = useDefaultStyles ? StyledDrawer : UnstyledDrawer;

  return (
    <DrawerContext.Provider value={drawerState}>
      <DrawerContainer {...other}>
        {React.Children.map(children, (child, ind) => {
          if (!child || child.type !== DrawerPanel) return child;

          const childKey = child.key;
          const activeIndex = `${ind + 1}`;
          const panelKey = childKey || activeIndex;

          return React.cloneElement(child, {
            ...child.props,
            openedIconName,
            closedIconName,
            panelKey
          });
        })}
      </DrawerContainer>
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
  onActiveKeysChanged: PropTypes.func,
  /** Override the default minus icon with another OE icon name */
  openedIconName: PropTypes.string,
  /** Include default container styles */
  useDefaultStyles: PropTypes.bool
};

Drawer.defaultProps = {
  activeKeys: undefined,
  isAccordion: false,
  closedIconName: 'add',
  openedIconName: 'minus',
  children: undefined,
  useDefaultStyles: true,
  onActiveKeysChanged: () => {
    // noop
  }
};

Drawer.Panel = DrawerPanel;
Drawer.Item = DrawerItem;
Drawer.ItemOpener = DrawerItemOpener;
Drawer.ItemBody = DrawerItemBody;
