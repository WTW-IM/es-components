import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Menu from './Menu';

import { renderWithTheme } from '../../util/test-utils';

function buildMenu() {
  return (
    <Menu headerContent="Small Menu" buttonContent="Open Menu" className="test">
      <Menu.MenuSection title="Menu Section" isFirst>
        <a href="#test">Test link</a>
      </Menu.MenuSection>
    </Menu>
  );
}

it('toggles the menu open and closed', async () => {
  const user = userEvent.setup();
  renderWithTheme(buildMenu());

  const menuToggleButton = await screen.findByRole('button', {
    name: /Open Menu/
  });
  const menuSection = screen.getByText('Menu Section');

  await user.click(menuToggleButton);
  expect(menuSection).toBeVisible();

  await user.click(menuToggleButton);
  expect(menuSection).not.toBeVisible();
});

it('closes open menu when ESC is pressed', async () => {
  const user = userEvent.setup();
  renderWithTheme(buildMenu());

  const menuButton = await screen.findByRole('button', { name: /Open Menu/ });
  await user.click(await screen.findByRole('button', { name: /Open Menu/ }));
  expect(menuButton).toHaveFocus();

  await user.keyboard('[Escape]');
  expect(screen.getByText('Menu Section')).not.toBeVisible();
});
