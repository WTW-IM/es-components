import React from 'react';

import { Navigation, NavigationProps } from '../Navigation';
import { NavigationItem, NavigationItemProps } from '../NavigationItem';

export type HorizontalNavProps = Omit<NavigationProps, 'navOrientation'>;

const HorizontalNav = React.forwardRef<HTMLElement, HorizontalNavProps>(
  function ForwardedHorizontalNav(props, ref) {
    return <Navigation ref={ref} {...props} navOrientation="horizontal" />;
  }
);

export type HorizontalNavItemProps = Omit<
  NavigationItemProps,
  'navOrientation'
>;

const HorizontalNavItem = React.forwardRef<
  HTMLLIElement,
  HorizontalNavItemProps
>(function ForwardedHorizontalNavItem(props, ref) {
  return <NavigationItem ref={ref} {...props} navOrientation="horizontal" />;
});

type HorizontalNavComponent = typeof HorizontalNav & {
  Item: typeof NavigationItem;
};

(HorizontalNav as HorizontalNavComponent).Item = HorizontalNavItem;

export default HorizontalNav as HorizontalNavComponent;
