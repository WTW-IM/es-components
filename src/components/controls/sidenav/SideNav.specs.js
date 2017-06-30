/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SideNav from './SideNav';

describe('drawer', () => {
  let instanceToRender;
  const onItemSelected = jest.fn();
  const onNavClick = jest.fn();

  beforeEach(() => {
    onItemSelected.mockClear();
    onNavClick.mockClear();

    instanceToRender = (
      <SideNav
        defaultSelected="home"
        onItemSelected={navId => {
          onItemSelected(navId);
        }}
      >
        <SideNav.Item
          id="home"
          className="home"
          onNavClick={navId => onNavClick(navId)}
        >
          Home
        </SideNav.Item>
        <SideNav.Item id="cart" className="cart">Cart</SideNav.Item>
        <SideNav.Item
          id="info"
          className="info"
          onNavClick={() => onNavClick()}
          isDisabled
        >
          Disabled
        </SideNav.Item>
      </SideNav>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets the selected state', () => {
    const navInstance = mount(instanceToRender);
    expect(navInstance.state('selected')).toBe('home');

    const navItem = navInstance.find('.cart');
    navItem.simulate('click');

    expect(navInstance.state('selected')).toBe('cart');
  });

  it('executes onItemSelected with the id of the nav item clicked', () => {
    const navInstance = mount(instanceToRender);
    const navItem = navInstance.find('.cart');

    navItem.simulate('click');
    expect(onItemSelected).toBeCalledWith('cart');
  });

  it('executes onNavClick when nav item clicked', () => {
    const navInstance = mount(instanceToRender);
    const navItem = navInstance.find('.home');

    navItem.simulate('click');
    expect(onNavClick).toBeCalledWith('home');
  });

  it('disabled item prevents onclick functions', () => {
    const navInstance = mount(instanceToRender);
    const navItem = navInstance.find('.info');

    navItem.simulate('click');
    expect(onNavClick).not.toBeCalled();
    expect(onItemSelected).not.toBeCalled();
  });
});
