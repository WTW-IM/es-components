/* eslint-env jest */

import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';

import DropdownButton from './DropdownButton';
import { renderWithTheme } from '../../util/test-utils';

const onClick = jest.fn();

beforeEach(cleanup);

it('opens/closes dropdown on click', () => {
  const { getByText } = renderWithTheme(
    <DropdownButton buttonValue="Button">
      <DropdownButton.Button onClick={onClick}>Inner</DropdownButton.Button>
    </DropdownButton>
  );

  const button = getByText('Button');
  expect(getByText('Inner')).not.toBeVisible();

  button.click();
  expect(getByText('Inner')).toBeVisible();

  button.click();
  expect(getByText('Inner')).not.toBeVisible();
});

it('updates buttonValue on child click when shouldUpdateButtonValue is true', () => {
  const innerContents = 'Inner';
  const { container, getByText } = renderWithTheme(
    <DropdownButton buttonValue="Button" shouldUpdateButtonValue>
      <DropdownButton.Button onClick={onClick}>
        {innerContents}
      </DropdownButton.Button>
    </DropdownButton>
  );

  getByText('Button').click();
  getByText('Inner').click();

  expect(container.querySelectorAll('button')[0]).toHaveTextContent('Inner');
});

it('closes dropdown on child click when shouldCloseOnButtonClick', () => {
  const { getByText } = renderWithTheme(
    <DropdownButton buttonValue="Button" shouldCloseOnButtonClick>
      <DropdownButton.Button onClick={onClick}>Content</DropdownButton.Button>
    </DropdownButton>
  );

  getByText('Button').click();
  getByText('Content').click();
  expect(getByText('Content')).not.toBeVisible();
});

it('allows arrow movement and traps focus when dropdown is opened', () => {
  const { getByText } = renderWithTheme(
    <DropdownButton buttonValue="Button" shouldCloseOnButtonClick>
      <DropdownButton.Button onClick={onClick}>Item 1</DropdownButton.Button>
      <DropdownButton.Button onClick={onClick}>Item 2</DropdownButton.Button>
    </DropdownButton>
  );

  const firstButton = getByText('Button').closest('button');
  firstButton.focus();
  firstButton.click();
  expect(firstButton).toHaveFocus();

  const pressArrowKey = key =>
    fireEvent.keyDown(getByText('Button'), {
      keyCode: key
    });

  function verifyFocusAfterKeydown(key, button) {
    pressArrowKey(key);
    waitFor(() => {
      expect(button).toHaveFocus();
    });
  }

  const firstItemButton = getByText('Item 1');
  const secondItemButton = getByText('Item 2');

  const downArrow = 40;
  const upArrow = 38;
  verifyFocusAfterKeydown(downArrow, firstItemButton);
  verifyFocusAfterKeydown(downArrow, secondItemButton);
  verifyFocusAfterKeydown(downArrow, firstButton);
  // pressing the up arrow key while focused on the first button
  // will verify focus trap is working as expected
  verifyFocusAfterKeydown(upArrow, secondItemButton);
});
