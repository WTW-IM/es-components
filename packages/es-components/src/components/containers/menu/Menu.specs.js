/* eslint-env jest */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import { Menu } from './Menu';

function buildMenu() {
  return (
    <ThemeProvider theme={viaTheme}>
      <Menu
        headerContent="Small Menu"
        buttonContent="Open Menu"
        className="test"
      >
        <Menu.MenuSection title="Menu Section" isFirst>
          <a href="#test">Test link</a>
        </Menu.MenuSection>
      </Menu>
    </ThemeProvider>
  );
}

it('toggles the menu open and closed', () => {
  const { getByText } = render(buildMenu());

  const menuToggleButton = getByText('Open Menu');
  const menuSection = getByText('Menu Section');

  menuToggleButton.click();
  expect(menuSection).toBeVisible();

  menuToggleButton.click();
  expect(menuSection).not.toBeVisible();
});

it('closes open menu when ESC is pressed', () => {
  const { container, getByText } = render(buildMenu());

  getByText('Open Menu').click();

  fireEvent.keyDown(container, { keyCode: 27 });
  expect(getByText('Menu Section')).not.toBeVisible();
});
