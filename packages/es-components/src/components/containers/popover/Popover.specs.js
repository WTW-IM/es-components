/* eslint-env jest */

import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Popover from './Popover';

beforeEach(cleanup);

function buildPopover(props) {
  const defaults = {
    name: 'popTest',
    title: 'Popover Title',
    content: 'This is the popover content.'
  };
  const mergedProps = Object.assign({}, defaults, props);
  return (
    <ThemeProvider theme={viaTheme}>
      <Popover {...mergedProps}>Popover Text</Popover>
    </ThemeProvider>
  );
}

it('can be toggled by clicking the button', async () => {
  const { getByText, queryByText } = render(buildPopover());
  const trigger = getByText('Popover Text');

  trigger.click();
  const popoverContent = queryByText('This is the popover content.');
  expect(popoverContent).not.toBeVisible();

  trigger.click();
  expect(popoverContent).not.toBeVisible();
});

it('renders the title when provided', async () => {
  const { getByText, queryByText } = render(buildPopover());
  getByText('Popover Text').click();
  await waitForElement(() => getByText('Popover Title'));
  expect(queryByText('Popover Title')).not.toBeNull();
});

it('can be closed using the close button', async () => {
  const { getByText, queryByText } = render(
    buildPopover({ hasCloseButton: true })
  );
  getByText('Popover Text').click();

  const popoverContent = () => queryByText('This is the popover content.');
  popoverContent()
    .parentElement.querySelector('button')
    .click();

  await waitForElement(() => popoverContent() === null);
  expect(popoverContent()).toBeNull();
});

it('can be closed using the alternative close button', async () => {
  const { getByText, queryByText } = render(
    buildPopover({ hasAltCloseButton: true })
  );
  getByText('Popover Text').click();
  getByText('Popover Title')
    .parentElement.querySelector('button')
    .click();

  await waitForElement(
    () => queryByText('This is the popover content.') === null
  );
  expect(queryByText('This is the popover content.')).toBeNull();
});

it('sets focus on a focusable element within the content', () => {
  jest.useFakeTimers();
  const popoverContent = <a href="#test">Test link</a>;
  const { getByText } = render(buildPopover({ content: popoverContent }));
  getByText('Popover Text').click();
  jest.runOnlyPendingTimers();

  expect(getByText('Test link')).toHaveFocus();
});
