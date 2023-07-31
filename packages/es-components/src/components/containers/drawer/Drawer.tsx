import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DrawerContext } from './DrawerContext';
import { DrawerItem, DrawerItemBody, DrawerItemOpener } from './DrawerItem';
import DrawerPanel from './DrawerPanel';
import { IconName, iconNames } from 'es-components-shared-types';

export { useDrawerItemContext, DrawerItemContext } from './DrawerItem';

const StyledDrawer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray3};
  box-shadow: 0 1px 1px ${props => props.theme.colors.boxShadowLight};
  margin-bottom: 25px;
`;

const UnstyledDrawer = styled.div``;

const keysAsArray = (activeKeys?: string | string[]) =>
  activeKeys === undefined
    ? []
    : Array.isArray(activeKeys)
    ? activeKeys
    : [activeKeys];

const simpleArraysEqual = (arr1: string[], arr2: string[]) =>
  arr1.length === arr2.length && arr1.every(item => arr2.includes(item));

const addKey = (key: string, keysList: string[]) => {
  if (keysList?.includes(key)) return keysList;

  const newKeys = [...new Set([key, ...keysList])];
  return newKeys;
};

const removeKey = (key: string, keysList: string[]) => {
  if (!keysList?.includes(key)) return keysList;

  const newKeys = keysList?.filter(k => k !== key);
  return newKeys;
};

export type DrawerProps = JSXElementProps<'div'> & {
  activeKeys?: string | string[];
  children?:
    | React.ReactComponentElement<typeof DrawerPanel>
    | React.ReactComponentElement<typeof DrawerPanel>[];
  closedIconName?: IconName;
  isAccordion?: boolean;
  onActiveKeysChanged?: (keys: string | string[]) => void;
  openedIconName?: IconName;
  useDefaultStyles?: boolean;
};

export function Drawer({
  activeKeys: activeKeysProp,
  children,
  closedIconName = 'add',
  isAccordion = false,
  onActiveKeysChanged = () => {
    // noop
  },
  openedIconName = 'minus',
  useDefaultStyles = true,
  ...other
}: DrawerProps) {
  const keysChangedCallback = useRef(onActiveKeysChanged);
  keysChangedCallback.current = onActiveKeysChanged;
  const currentActiveKeysProp = useRef(activeKeysProp);
  currentActiveKeysProp.current = activeKeysProp;

  const [activeKeys, setActiveKeys] = useState(activeKeysProp || []);

  const resetActiveKeys = useCallback(
    (keymaker: (oldKeys: string | string[]) => string | string[]) =>
      setActiveKeys(oldKeys => {
        const oldKeysArray = keysAsArray(oldKeys);
        const keys = keymaker(oldKeysArray);
        const newKeys = keys.length && isAccordion ? [keys[0]] : keys;
        return simpleArraysEqual(oldKeysArray, keysAsArray(newKeys))
          ? oldKeys
          : newKeys;
      }),
    [isAccordion]
  );
  const resetActiveKeysCallback = useRef(resetActiveKeys);
  resetActiveKeysCallback.current = resetActiveKeys;

  const setActiveKey = useCallback(
    (key: string) =>
      resetActiveKeysCallback.current(oldActiveKeys =>
        addKey(key, keysAsArray(oldActiveKeys))
      ),
    []
  );

  const unsetActiveKey = useCallback(
    (key: string) =>
      resetActiveKeysCallback.current(oldActiveKeys =>
        removeKey(key, keysAsArray(oldActiveKeys))
      ),
    []
  );

  const toggleActiveKey = useCallback((key: string) => {
    resetActiveKeysCallback.current(oldActiveKeys => {
      const isOpen = oldActiveKeys.includes(key);
      return (isOpen ? removeKey : addKey)(key, keysAsArray(oldActiveKeys));
    });
  }, []);

  const [drawerState, setDrawerState] = useState({
    activeKeys,
    setActiveKey,
    unsetActiveKey,
    toggleActiveKey
  });

  useEffect(() => {
    if (
      simpleArraysEqual(
        keysAsArray(activeKeys),
        keysAsArray(currentActiveKeysProp.current)
      )
    )
      return;

    keysChangedCallback.current(activeKeys);
  }, [activeKeys]);

  useEffect(() => {
    if (!activeKeysProp) return;

    resetActiveKeysCallback.current(oldKeys =>
      simpleArraysEqual(keysAsArray(oldKeys), keysAsArray(activeKeysProp))
        ? oldKeys
        : activeKeysProp
    );
  }, [activeKeysProp]);

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
          if (!child) return child;

          /*Handle styled-component*/
          const targetType = child.type as unknown as {
            target: Maybe<typeof DrawerPanel>;
          };

          const isDrawerPanel =
            child.type === DrawerPanel || targetType.target === DrawerPanel;
          if (!isDrawerPanel) return child;

          const childKey = child.key?.toString();
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
  closedIconName: PropTypes.oneOf<IconName>([...iconNames]),
  /** Only allows one DrawerPanel to be open at a time */
  isAccordion: PropTypes.bool,
  /** Function called when changing active keys */
  onActiveKeysChanged: PropTypes.func,
  /** Override the default minus icon with another OE icon name */
  openedIconName: PropTypes.oneOf<IconName>([...iconNames]),
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
