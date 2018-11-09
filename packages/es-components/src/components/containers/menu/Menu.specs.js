/* eslint-env jest */

import React from 'react';
import { fireEvent } from 'react-testing-library';
import { Menu } from './Menu';

import { renderWithTheme } from '../../util/test-utils';

function buildMenu() {
  return (
    <Menu
      headerContent="Small Menu"
      buttonContent="Open Menu"
      className="test"
    >
      <Menu.MenuSection title="Menu Section" isFirst>
        <a href="#test">Test link</a>
      </Menu.MenuSection>
    </Menu>
  );
}

it('toggles the menu open and closed', () => {
  const { getByText } = renderWithTheme(buildMenu());

  const menuToggleButton = getByText('Open Menu');
  const menuSection = getByText('Menu Section');

  menuToggleButton.click();
  expect(menuSection).toBeVisible();

  menuToggleButton.click();
  expect(menuSection).not.toBeVisible();
});

it('closes open menu when ESC is pressed', () => {
  const { container, getByText } = renderWithTheme(buildMenu());

  getByText('Open Menu').click();

  fireEvent.keyDown(container, { keyCode: 27 });
  expect(getByText('Menu Section')).not.toBeVisible();
});
