/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Drawer from './Drawer';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

describe('drawer component', () => {
  describe('drawer', () => {
    let instanceToRender;

    beforeEach(() => {
      instanceToRender = (
        <Drawer className="important">
          <Drawer.Panel
            title="collapse 1"
            key="1"
            className="first"
            titleAside="side text"
          >
            first
          </Drawer.Panel>
          <Drawer.Panel title="collapse 2" key="2" className="second" noPadding>
            second
          </Drawer.Panel>
          <Drawer.Panel title="collapse 3" key="3" className="third">
            third
          </Drawer.Panel>
        </Drawer>
      );
    });

    it('renders as expected', () => {
      const tree = renderer.create(instanceToRender).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('click should toggle panel state', () => {
      const drawerInstance = mount(instanceToRender);
      const firstPanel = drawerInstance.find('.first');
      const panelButton = firstPanel.find('button');

      expect(panelButton.prop('aria-expanded')).toBe(false);

      panelButton.simulate('click');
      expect(panelButton.prop('aria-expanded')).toBe(true);

      panelButton.simulate('click');
      expect(panelButton.prop('aria-expanded')).toBe(false);
    });

    it('should allow more than one drawer to be opened at a time', () => {
      const drawerInstance = mount(instanceToRender);
      const firstPanel = drawerInstance.find('.first');
      const firstButton = firstPanel.find('button');
      const thirdPanel = drawerInstance.find('.third');
      const thirdButton = thirdPanel.find('button');

      expect(firstButton.prop('aria-expanded')).toBe(false);
      expect(thirdButton.prop('aria-expanded')).toBe(false);

      firstButton.simulate('click');
      expect(firstButton.prop('aria-expanded')).toBe(true);
      expect(thirdButton.prop('aria-expanded')).toBe(false);

      thirdButton.simulate('click');
      expect(firstButton.prop('aria-expanded')).toBe(true);
      expect(thirdButton.prop('aria-expanded')).toBe(true);
    });

    it('should set multiple default panels open at start', () => {
      const drawerInstance = mount(
        <Drawer defaultActiveKeys={['2', '3']}>
          <Drawer.Panel title="collapse 1" key="1">first</Drawer.Panel>
          <Drawer.Panel title="collapse 2" key="2">second</Drawer.Panel>
          <Drawer.Panel title="collapse 3" key="3">third</Drawer.Panel>
        </Drawer>
      );

      const panels = drawerInstance.find('[aria-expanded]');
      expect(panels.at(0).prop('aria-expanded')).toBe(false);
      expect(panels.at(1).prop('aria-expanded')).toBe(true);
      expect(panels.at(2).prop('aria-expanded')).toBe(true);
    });
  });

  describe('accordion', () => {
    let instanceToRender;

    beforeEach(() => {
      instanceToRender = (
        <Drawer isAccordion defaultActiveKeys="1">
          <Drawer.Panel title="collapse 1" key="1" className="first">
            first
          </Drawer.Panel>
          <Drawer.Panel title="collapse 2" key="2" className="second">
            second
          </Drawer.Panel>
          <Drawer.Panel title="collapse 3" key="3" className="third">
            third
          </Drawer.Panel>
        </Drawer>
      );
    });

    it('renders as expected', () => {
      const tree = renderer.create(instanceToRender).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('default active key should set panel open', () => {
      const accordionInstance = mount(instanceToRender);
      const panels = accordionInstance.find('[aria-expanded]');

      expect(panels.at(0).prop('aria-expanded')).toBe(true);
      expect(panels.at(1).prop('aria-expanded')).toBe(false);
      expect(panels.at(2).prop('aria-expanded')).toBe(false);
    });

    it('should only allow one drawer to be opened at a time', () => {
      const accordionInstance = mount(instanceToRender);
      const firstPanel = accordionInstance.find('.first');
      const firstButton = firstPanel.find('button');
      const thirdPanel = accordionInstance.find('.third');
      const thirdButton = thirdPanel.find('button');

      expect(firstButton.prop('aria-expanded')).toBe(true);
      expect(thirdButton.prop('aria-expanded')).toBe(false);

      thirdButton.simulate('click');
      expect(firstButton.prop('aria-expanded')).toBe(false);
      expect(thirdButton.prop('aria-expanded')).toBe(true);
    });
  });
});
