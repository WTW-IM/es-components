import React from 'react';

import { Navigation, NavigationProps } from '../Navigation';
import { NavigationItem, NavigationItemProps } from '../NavigationItem';

export type SideNavProps = Omit<NavigationProps, 'navOrientation'>;

const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  function ForwardedSideNav(props, ref) {
    return <Navigation ref={ref} {...props} navOrientation="vertical" />;
  }
);

export type SideNavItemProps = Omit<NavigationItemProps, 'navOrientation'>;
const SideNavItem = React.forwardRef<HTMLLIElement, SideNavItemProps>(
  function ForwardedSideNavItem(props, ref) {
    return <NavigationItem ref={ref} {...props} navOrientation="vertical" />;
  }
);

type SideNavComponent = typeof SideNav & {
  Item: typeof SideNavItem;
};

(SideNav as SideNavComponent).Item = SideNavItem;

export default SideNav as SideNavComponent;
