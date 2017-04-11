/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Drawer from './Drawer';
import DrawerPanel from './DrawerPanel';

jest.mock('../../../styles/variables/colors.less', () => ({}));
jest.mock('./drawer.less', () => ({}));

describe('drawer component', () => {
  describe('drawer', () => {
    let drawerInstance;

    beforeEach(() => {
      drawerInstance = mount(<Drawer className="important">
        <DrawerPanel header="collapse 1" key="1">first</DrawerPanel>
        <DrawerPanel header="collapse 2" noPadding key="2">second</DrawerPanel>
        <DrawerPanel header="collapse 3" key="3" className="alt-drawer">third</DrawerPanel>
      </Drawer>);
    });

    it('renders as expected', () => {
      const tree = renderer.create(
        <Drawer className="important">
          <DrawerPanel header="collapse 1" key="1">first</DrawerPanel>
          <DrawerPanel header="collapse 2" noPadding key="2">second</DrawerPanel>
          <DrawerPanel header="collapse 3" key="3" className="alt-drawer">third</DrawerPanel>
        </Drawer>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('adds additional className to the root element', () => {
      const drawerDiv = drawerInstance.find('.drawer');
      expect(drawerDiv.hasClass('important')).toBe(true);
    });

    it('creates the panels closed by default', () => {
      const panels = drawerInstance
                      .find('[aria-expanded]')
                      .filterWhere(node => !node.prop('aria-expanded'));

      expect(panels.length).toBe(3);
    });

    it('adds className to a panel element', () => {
      const drawerPanel = drawerInstance.find('.drawer-panel').last();
      expect(drawerPanel.hasClass('alt-drawer')).toBe(true);
    });

    it('click should toggle panel state', () => {
      const firstPanel = drawerInstance.find('.drawer-panel').first();
      const panelHeader = firstPanel.find('.drawer-panel__header');

      expect(panelHeader.prop('aria-expanded')).toBe(false);

      panelHeader.simulate('click');
      expect(panelHeader.prop('aria-expanded')).toBe(true);

      panelHeader.simulate('click');
      expect(panelHeader.prop('aria-expanded')).toBe(false);
    });

    it('should allow more than one drawer to be opened at a time', () => {
      const firstPanel = drawerInstance.find('.drawer-panel__header').first();
      const lastPanel = drawerInstance.find('.drawer-panel__header').last();

      expect(firstPanel.prop('aria-expanded')).toBe(false);
      expect(lastPanel.prop('aria-expanded')).toBe(false);

      firstPanel.find('.drawer-panel__header').simulate('click');
      expect(firstPanel.prop('aria-expanded')).toBe(true);
      expect(lastPanel.prop('aria-expanded')).toBe(false);

      lastPanel.find('.drawer-panel__header').simulate('click');
      expect(firstPanel.prop('aria-expanded')).toBe(true);
      expect(lastPanel.prop('aria-expanded')).toBe(true);
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

    it('should remove padding class on panel with noPadding attrib', () => {
      const panels = drawerInstance.find('.drawer-panel__body');
      expect(panels.at(0).find('.drawer-panel__body--padded').length).toBe(1);
      expect(panels.at(1).find('.drawer-panel__body--padded').length).toBe(0);
      expect(panels.at(2).find('.drawer-panel__body--padded').length).toBe(1);
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

    it('renders as expected', () => {
      const tree = renderer.create(
        <Drawer className="important" isAccordion defaultActiveKeys="1">
          <DrawerPanel header="collapse 1" key="1">first</DrawerPanel>
          <DrawerPanel header="collapse 2" key="2">second</DrawerPanel>
          <DrawerPanel header="collapse 3" key="3" className="important">third</DrawerPanel>
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
      const firstPanel = accordionInstance.find('.drawer-panel__header').first();
      const lastPanel = accordionInstance.find('.drawer-panel__header').last();

      expect(firstPanel.prop('aria-expanded')).toBe(true);
      expect(lastPanel.prop('aria-expanded')).toBe(false);

      lastPanel.find('.drawer-panel__header').simulate('click');
      expect(firstPanel.prop('aria-expanded')).toBe(false);
      expect(lastPanel.prop('aria-expanded')).toBe(true);
    });
  });
});
