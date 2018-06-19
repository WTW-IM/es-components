/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Menu } from './Menu';
import ToggleButton from '../../controls/buttons/ToggleButton';

describe('MenuTestSuite', () => {
  let instanceToRender;

  beforeEach(() => {
    instanceToRender = (
      <Menu
        headerContent="Small Menu"
        buttonContent="Open Menu"
        className="test"
      >
        <Menu.MenuSection title="Menu Section" isFirst>
          <a href="www.google.com">Go To Google</a>
        </Menu.MenuSection>
      </Menu>
    );
  });

  it('renders as expected', () => {
    const tree = renderer.create(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('toggles menu open/closed on click', () => {
    const instance = mount(instanceToRender);
    const button = instance.find(ToggleButton);

    button.simulate('click');
    expect(instance.state().isMenuOpen).toBe(true);
    button.simulate('click');
    expect(instance.state().isMenuOpen).toBe(false);
  });
});
