/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Drawer from './Drawer';
import DrawerPanel from './DrawerPanel';

describe('drawer component', () => {
  describe('drawer', () => {
    let drawerInstance;

    beforeEach(() => {
      drawerInstance = mount(<Drawer className="important">
        <DrawerPanel header="collapse 1" key="1" className="first">first</DrawerPanel>
        <DrawerPanel header="collapse 2" key="2" className="second" noPadding>second</DrawerPanel>
        <DrawerPanel header="collapse 3" key="3" className="third">third</DrawerPanel>
      </Drawer>);
    });

    it('renders as expected', () => {
      const tree = renderer.create(
        <Drawer className="important">
          <DrawerPanel header="collapse 1" key="1" className="first">first</DrawerPanel>
          <DrawerPanel header="collapse 2" key="2" className="second" noPadding>second</DrawerPanel>
          <DrawerPanel header="collapse 3" key="3" className="third">third</DrawerPanel>
        </Drawer>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('click should toggle panel state', () => {
      const firstPanel = drawerInstance.find('.first');
      const panelHeader = firstPanel.find({ role: 'tab' });

      expect(panelHeader.prop('aria-expanded')).toBe(false);

      panelHeader.simulate('click');
      expect(panelHeader.prop('aria-expanded')).toBe(true);

      panelHeader.simulate('click');
      expect(panelHeader.prop('aria-expanded')).toBe(false);
    });

    it('should allow more than one drawer to be opened at a time', () => {
      const firstPanel = drawerInstance.find('.first');
      const firstHeader = firstPanel.find({ role: 'tab' });
      const thirdPanel = drawerInstance.find('.third');
      const thirdHeader = thirdPanel.find({ role: 'tab' });

      expect(firstHeader.prop('aria-expanded')).toBe(false);
      expect(thirdHeader.prop('aria-expanded')).toBe(false);

      firstHeader.simulate('click');
      expect(firstHeader.prop('aria-expanded')).toBe(true);
      expect(thirdHeader.prop('aria-expanded')).toBe(false);

      thirdHeader.simulate('click');
      expect(firstHeader.prop('aria-expanded')).toBe(true);
      expect(thirdHeader.prop('aria-expanded')).toBe(true);
    });

    it('should set multiple default panels open at start', () => {
      const drawerKeysInstance = mount(<Drawer defaultActiveKeys={['2', '3']}>
        <DrawerPanel header="collapse 1" key="1">first</DrawerPanel>
        <DrawerPanel header="collapse 2" key="2">second</DrawerPanel>
        <DrawerPanel header="collapse 3" key="3">third</DrawerPanel>
      </Drawer>);

      const panels = drawerKeysInstance.find('[aria-expanded]');
      expect(panels.at(0).prop('aria-expanded')).toBe(false);
      expect(panels.at(1).prop('aria-expanded')).toBe(true);
      expect(panels.at(2).prop('aria-expanded')).toBe(true);
    });
  });

  describe('accordion', () => {
    let accordionInstance;

    beforeEach(() => {
      accordionInstance = mount(<Drawer isAccordion defaultActiveKeys="1">
        <DrawerPanel header="collapse 1" key="1" className="first">first</DrawerPanel>
        <DrawerPanel header="collapse 2" key="2" className="second">second</DrawerPanel>
        <DrawerPanel header="collapse 3" key="3" className="third">third</DrawerPanel>
      </Drawer>);
    });

    it('renders as expected', () => {
      const tree = renderer.create(
        <Drawer isAccordion defaultActiveKeys="1">
          <DrawerPanel header="collapse 1" key="1" className="first">first</DrawerPanel>
          <DrawerPanel header="collapse 2" key="2" className="second">second</DrawerPanel>
          <DrawerPanel header="collapse 3" key="3" className="third">third</DrawerPanel>
        </Drawer>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('default active key should set panel open', () => {
      const panels = accordionInstance.find('[aria-expanded]');

      expect(panels.at(0).prop('aria-expanded')).toBe(true);
      expect(panels.at(1).prop('aria-expanded')).toBe(false);
      expect(panels.at(2).prop('aria-expanded')).toBe(false);
    });

    it('should only allow one drawer to be opened at a time', () => {
      const firstPanel = accordionInstance.find('.first');
      const firstHeader = firstPanel.find({ role: 'tab' });
      const thirdPanel = accordionInstance.find('.third');
      const thirdHeader = thirdPanel.find({ role: 'tab' });

      expect(firstHeader.prop('aria-expanded')).toBe(true);
      expect(thirdHeader.prop('aria-expanded')).toBe(false);

      thirdHeader.simulate('click');
      expect(firstHeader.prop('aria-expanded')).toBe(false);
      expect(thirdHeader.prop('aria-expanded')).toBe(true);
    });
  });
});
