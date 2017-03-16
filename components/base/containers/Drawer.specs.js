/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import Drawer from './Drawer';
import DrawerPanel from './DrawerPanel';

jest.mock('rc-animate', () => 'Animate');
jest.mock('../../../styles/variables/colors.less', () => ({}));
jest.mock('../icons/oe-icons.less', () => ({}));
jest.mock('./drawer.less', () => ({}));

describe('drawer component', () => {
  describe('drawer', () => {
    let drawerInstance;

    beforeEach(() => {
      drawerInstance = mount(<Drawer className="important">
        <DrawerPanel header="collapse 1" key="1">first</DrawerPanel>
        <DrawerPanel header="collapse 2" key="2">second</DrawerPanel>
        <DrawerPanel header="collapse 3" key="3" className="alt-drawer">third</DrawerPanel>
      </Drawer>);
    });

    it('adds additional className to the root element', () => {
      const drawerDiv = drawerInstance.find('.drawer');
      expect(drawerDiv.hasClass('important')).toBe(true);
    });

    it('creates the panels closed by default', () => {
      const panels = drawerInstance.find('.drawer-panel');
      const panelsOpen = drawerInstance.find('.drawer-panel-body');

      expect(panels.length).toBe(3);
      expect(panelsOpen.length).toBe(0);
    });

    it('adds className to a panel element', () => {
      const drawerPanel = drawerInstance.find('.drawer-panel').last();
      expect(drawerPanel.hasClass('alt-drawer')).toBe(true);
    });

    it('click should toggle panel state', () => {
      const firstPanel = drawerInstance.find('.drawer-panel').first();
      const panelHeader = firstPanel.find('.drawer-panel-header');

      expect(firstPanel.find('.drawer-panel-body--active').length).toBe(0);

      panelHeader.simulate('click');
      expect(firstPanel.find('.drawer-panel-body--active').length).toBe(1);

      panelHeader.simulate('click');
      expect(firstPanel.find('.drawer-panel-body--inactive').length).toBe(1);
    });

    it('should allow more than one drawer to be opened at a time', () => {
      const firstPanel = drawerInstance.find('.drawer-panel').first();
      const lastPanel = drawerInstance.find('.drawer-panel').last();

      expect(firstPanel.find('.drawer-panel-body--active').length).toBe(0);
      expect(lastPanel.find('.drawer-panel-body--active').length).toBe(0);

      firstPanel.find('.drawer-panel-header').simulate('click');
      expect(firstPanel.find('.drawer-panel-body--active').length).toBe(1);

      lastPanel.find('.drawer-panel-header').simulate('click');
      expect(lastPanel.find('.drawer-panel-body--active').length).toBe(1);
    });

    it('should set multiple default panels open at start', () => {
      const drawerKeysInstance = mount(<Drawer defaultActiveKeys={['2', '3']}>
        <DrawerPanel header="collapse 1" key="1">first</DrawerPanel>
        <DrawerPanel header="collapse 2" key="2">second</DrawerPanel>
        <DrawerPanel header="collapse 3" key="3">third</DrawerPanel>
      </Drawer>);

      const panelsOpen = drawerKeysInstance.find('.drawer-panel-body');

      expect(panelsOpen.length).toBe(2);
    });
  });

  describe('accordion', () => {
    let accordionInstance;

    beforeEach(() => {
      accordionInstance = mount(<Drawer className="important" isAccordion defaultActiveKeys="1">
        <DrawerPanel header="collapse 1" key="1">first</DrawerPanel>
        <DrawerPanel header="collapse 2" key="2">second</DrawerPanel>
        <DrawerPanel header="collapse 3" key="3" className="important">third</DrawerPanel>
      </Drawer>);
    });

    it('default active key should set panel open', () => {
      const firstPanel = accordionInstance.find('.drawer-panel').first();
      expect(firstPanel.find('.drawer-panel-body--active').length).toBe(1);
    });

    it('should only allow one drawer to be opened at a time', () => {
      const firstPanel = accordionInstance.find('.drawer-panel').first();
      const lastPanel = accordionInstance.find('.drawer-panel').last();

      expect(firstPanel.find('.drawer-panel-body--active').length).toBe(1);
      expect(lastPanel.find('.drawer-panel-body--active').length).toBe(0);

      lastPanel.find('.drawer-panel-header').simulate('click');
      expect(firstPanel.find('.drawer-panel-body--active').length).toBe(0);
      expect(lastPanel.find('.drawer-panel-body--active').length).toBe(1);
    });
  });
});
