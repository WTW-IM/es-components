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
      const panelTitle = firstPanel.find({ role: 'tab' });

      expect(panelTitle.prop('aria-expanded')).toBe(false);

      panelTitle.simulate('click');
      expect(panelTitle.prop('aria-expanded')).toBe(true);

      panelTitle.simulate('click');
      expect(panelTitle.prop('aria-expanded')).toBe(false);
    });

    it('should allow more than one drawer to be opened at a time', () => {
      const drawerInstance = mount(instanceToRender);
      const firstPanel = drawerInstance.find('.first');
      const firstTitle = firstPanel.find({ role: 'tab' });
      const thirdPanel = drawerInstance.find('.third');
      const thirdTitle = thirdPanel.find({ role: 'tab' });

      expect(firstTitle.prop('aria-expanded')).toBe(false);
      expect(thirdTitle.prop('aria-expanded')).toBe(false);

      firstTitle.simulate('click');
      expect(firstTitle.prop('aria-expanded')).toBe(true);
      expect(thirdTitle.prop('aria-expanded')).toBe(false);

      thirdTitle.simulate('click');
      expect(firstTitle.prop('aria-expanded')).toBe(true);
      expect(thirdTitle.prop('aria-expanded')).toBe(true);
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
      const firstTitle = firstPanel.find({ role: 'tab' });
      const thirdPanel = accordionInstance.find('.third');
      const thirdTitle = thirdPanel.find({ role: 'tab' });

      expect(firstTitle.prop('aria-expanded')).toBe(true);
      expect(thirdTitle.prop('aria-expanded')).toBe(false);

      thirdTitle.simulate('click');
      expect(firstTitle.prop('aria-expanded')).toBe(false);
      expect(thirdTitle.prop('aria-expanded')).toBe(true);
    });
  });
});
