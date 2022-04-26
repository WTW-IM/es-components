import React, { useCallback } from 'react';
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

function Drawer(props) {
  const {
    activeKeys,
    children,
    closedIconName,
    isAccordion,
    onActiveKeysChanged,
    openedIconName,
    defaultStyles,
    ...other
  } = props;

  const setActiveKey = useCallback(
    key => {
      const isOpen = Boolean(activeKeys.find(k => k === key));

      if (isAccordion) {
        onActiveKeysChanged(isOpen ? [] : [key]);
        return;
      }

      onActiveKeysChanged(
        isOpen ? activeKeys.filter(k => k !== key) : [...activeKeys, key]
      );
    },
    [isAccordion, activeKeys]
  );

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
  activeKeys: [],
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
