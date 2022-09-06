/* eslint-env jest */

import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DropdownButton from './DropdownButton';
import { renderWithTheme } from '../../util/test-utils';

const onClick = jest.fn();

it('opens/closes dropdown on click', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <DropdownButton buttonValue="Button">
      <DropdownButton.Button onClick={onClick}>Inner</DropdownButton.Button>
    </DropdownButton>
  );

  const button = await screen.findByRole('button', { name: /Button/ });
  expect(screen.getByText('Inner')).not.toBeVisible();

  await user.click(button);
  expect(screen.getByText('Inner')).toBeVisible();

  await user.click(button);
  expect(screen.getByText('Inner')).not.toBeVisible();
});

it('updates buttonValue on child click when shouldUpdateButtonValue is true', async () => {
  const user = userEvent.setup();
  const innerContents = 'Inner';
  renderWithTheme(
    <DropdownButton buttonValue="Button" shouldUpdateButtonValue>
      <DropdownButton.Button onClick={onClick}>
        {innerContents}
      </DropdownButton.Button>
    </DropdownButton>
  );

  await user.click(await screen.findByRole('button', { name: /Button/ }));
  await user.click(await screen.findByRole('option', { name: /Inner/ }));

  expect(
    await screen.findByRole('button', { name: /Inner/ })
  ).toBeInTheDocument();
});

it('closes dropdown on child click when shouldCloseOnButtonClick', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <DropdownButton buttonValue="Button" shouldCloseOnButtonClick>
      <DropdownButton.Button onClick={onClick}>Content</DropdownButton.Button>
    </DropdownButton>
  );

  await user.click(await screen.findByRole('button', { name: /Button/ }));
  const contentOption = await screen.findByRole('option', { name: /Content/ });
  await user.click(contentOption);
  expect(contentOption).not.toBeVisible();
});

it('allows arrow movement and traps focus when dropdown is opened', async () => {
  const user = userEvent.setup();
  renderWithTheme(
    <DropdownButton buttonValue="Button" shouldCloseOnButtonClick>
      <DropdownButton.Button onClick={onClick}>Item 1</DropdownButton.Button>
      <DropdownButton.Button onClick={onClick}>Item 2</DropdownButton.Button>
    </DropdownButton>
  );

  const firstButton = await screen.findByRole('button', 'Button');
  await user.click(firstButton);
  expect(firstButton).toHaveFocus();

  const verifyFocusAfterKeydown = async (key, itemName) => {
    await user.keyboard(key);
    await waitFor(async () =>
      expect(
        await screen.findByRole('button', { name: itemName })
      ).toHaveFocus()
    );
  };

  const firstItemName = /Item 1/;
  const secondItemName = /Item 2/;

  verifyFocusAfterKeydown('[ArrowDown]', firstItemName);
  verifyFocusAfterKeydown('[ArrowDown]', secondItemName);
  verifyFocusAfterKeydown('[ArrowDown]', firstItemName);
  // pressing the up arrow key while focused on the first button
  // will verify focus trap is working as expected
  verifyFocusAfterKeydown('[ArrowUp]', secondItemName);
});
