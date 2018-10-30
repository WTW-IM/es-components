/* eslint-env jest */

import React from 'react';
import { render, cleanup, fireEvent, getByRole } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import { DropdownButton } from './DropdownButton';

const onClick = jest.fn();

beforeEach(cleanup);

it('opens/closes dropdown on click', () => {
  const { getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <DropdownButton buttonValue="Button">
        <DropdownButton.Button handleOnClick={onClick}>
          Inner
        </DropdownButton.Button>
      </DropdownButton>
    </ThemeProvider>
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
  const { container, getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <DropdownButton buttonValue="Button" shouldUpdateButtonValue>
        <DropdownButton.Button handleOnClick={onClick}>
          {innerContents}
        </DropdownButton.Button>
      </DropdownButton>
    </ThemeProvider>
  );

  getByText('Button').click();
  getByText('Inner').click();

  expect(container.querySelectorAll('button')[0]).toHaveTextContent('Inner');
});

it('closes dropdown on child click when shouldCloseOnButtonClick', () => {
  const { getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <DropdownButton buttonValue="Button" shouldCloseOnButtonClick>
        <DropdownButton.Button handleOnClick={onClick}>
          Content
        </DropdownButton.Button>
      </DropdownButton>
    </ThemeProvider>
  );

  getByText('Button').click();
  getByText('Content').click();
  expect(getByText('Content')).not.toBeVisible();
});

it('allows arrow movement and traps focus when dropdown is opened', () => {
  const { container, getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <DropdownButton buttonValue="Button" shouldCloseOnButtonClick>
        <DropdownButton.Button handleOnClick={onClick}>
          Item 1
        </DropdownButton.Button>
        <DropdownButton.Button handleOnClick={onClick}>
          Item 2
        </DropdownButton.Button>
      </DropdownButton>
    </ThemeProvider>
  );

  const firstButton = getByText('Button');
  firstButton.click();
  expect(firstButton).toHaveFocus();

  const pressArrowKey = key =>
    fireEvent.keyDown(getByRole(container, 'combobox'), {
      keyCode: key
    });

  function verifyFocusAfterKeydown(key, button) {
    pressArrowKey(key);
    expect(button).toHaveFocus();
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
