/* eslint-env jest */

import React from 'react';
import { mountWithTheme, renderWithTheme } from '../../../testing';
import SideNav from './SideNav';

describe('drawer', () => {
  let instanceToRender;
  const onItemSelected = jest.fn();
  const onClick = jest.fn();

  beforeEach(() => {
    onItemSelected.mockClear();
    onClick.mockClear();

    instanceToRender = (
      <SideNav
        onItemSelected={navId => {
          onItemSelected(navId);
        }}
      >
        <SideNav.Item
          id="home"
          className="home"
          onClick={navId => onClick(navId)}
          targetUrl="/home"
        >
          Home
        </SideNav.Item>
        <SideNav.Item id="cart" className="cart">
          Cart
        </SideNav.Item>
        <SideNav.Item
          id="external"
          className="external"
          targetUrl="http://www.google.com"
          isExternalLink
        >
          External Link
        </SideNav.Item>
        <SideNav.Item
          id="info"
          className="info"
          onClick={() => onClick()}
          isDisabled
        >
          Disabled
        </SideNav.Item>
      </SideNav>
    );
  });

  it('renders as expected', () => {
    const tree = renderWithTheme(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('executes onItemSelected with the id of the nav item clicked', () => {
    const navInstance = mountWithTheme(instanceToRender);
    const navItem = navInstance.find('.cart').hostNodes();

    navItem.simulate('click');
    expect(onItemSelected).toBeCalledWith('cart');
  });

  it('executes onClick when nav item clicked', () => {
    const navInstance = mountWithTheme(instanceToRender);
    const navItem = navInstance.find('.home').hostNodes();

    navItem.simulate('click');
    expect(onClick).toBeCalledWith('home');
  });

  it('disabled item prevents onclick functions', () => {
    const navInstance = mountWithTheme(instanceToRender);
    const navItem = navInstance.find('.info').hostNodes();

    navItem.simulate('click');
    expect(onClick).not.toBeCalled();
    expect(onItemSelected).not.toBeCalled();
  });
});
