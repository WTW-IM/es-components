/* eslint-env jest */

import React from 'react';
import { mountWithTheme, renderWithTheme } from '../../../testing';
import Drawer from './Drawer';

jest.mock('../../util/generateAlphaName', () => () => 'abcdef');

const buildDrawer = props => (
  <Drawer className="important" {...props}>
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

describe('drawer component', () => {
  describe('drawer', () => {
    it('renders as expected', () => {
      const tree = renderWithTheme(buildDrawer()).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('clicking a closed panel should add panel key to activeKeys', () => {
      const onActiveKeysChanged = jest.fn();
      const drawerInstance = mountWithTheme(
        buildDrawer({ onActiveKeysChanged })
      );
      const firstPanel = drawerInstance.find('.first');
      const panelButton = firstPanel.find('button');

      expect(panelButton.prop('aria-expanded')).toBe(false);

      panelButton.simulate('click');
      expect(onActiveKeysChanged).toBeCalledWith(['1']);
    });

    it('clicking an open panel should remove panel key from activeKeys', () => {
      const onActiveKeysChanged = jest.fn();
      const drawerInstance = mountWithTheme(
        buildDrawer({ activeKeys: ['1'], onActiveKeysChanged })
      );
      const firstPanel = drawerInstance.find('.first');
      const panelButton = firstPanel.find('button');

      expect(panelButton.prop('aria-expanded')).toBe(true);

      panelButton.simulate('click');
      expect(onActiveKeysChanged).toBeCalledWith([]);
    });

    it('should allow a second drawer to be opened', () => {
      const onActiveKeysChanged = jest.fn();
      const drawerInstance = mountWithTheme(
        buildDrawer({ activeKeys: ['1'], onActiveKeysChanged })
      );
      const firstPanel = drawerInstance.find('.first');
      const firstButton = firstPanel.find('button');
      const thirdPanel = drawerInstance.find('.third');
      const thirdButton = thirdPanel.find('button');

      expect(firstButton.prop('aria-expanded')).toBe(true);
      expect(thirdButton.prop('aria-expanded')).toBe(false);

      thirdButton.simulate('click');
      expect(onActiveKeysChanged).toBeCalledWith(['1', '3']);
    });

    it('should allow rendering more than one active drawer', () => {
      const onActiveKeysChanged = jest.fn();
      const drawerInstance = mountWithTheme(
        buildDrawer({ activeKeys: ['1', '3'], onActiveKeysChanged })
      );
      const firstPanel = drawerInstance.find('.first');
      const firstButton = firstPanel.find('button');
      const thirdPanel = drawerInstance.find('.third');
      const thirdButton = thirdPanel.find('button');

      expect(firstButton.prop('aria-expanded')).toBe(true);
      expect(thirdButton.prop('aria-expanded')).toBe(true);
    });
  });

  describe('accordion', () => {
    const isAccordion = true;

    it('renders as expected', () => {
      const tree = renderWithTheme(buildDrawer({ isAccordion })).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should only allow one drawer to be opened at a time', () => {
      const onActiveKeysChanged = jest.fn();
      const accordionInstance = mountWithTheme(
        buildDrawer({ isAccordion, onActiveKeysChanged, activeKeys: ['1'] })
      );
      const firstPanel = accordionInstance.find('.first');
      const firstButton = firstPanel.find('button');
      const thirdPanel = accordionInstance.find('.third');
      const thirdButton = thirdPanel.find('button');

      expect(firstButton.prop('aria-expanded')).toBe(true);
      expect(thirdButton.prop('aria-expanded')).toBe(false);

      thirdButton.simulate('click');
      expect(onActiveKeysChanged).toBeCalledWith(['3']);
    });
  });
});
