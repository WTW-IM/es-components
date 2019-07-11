/* eslint-env jest */

import React from 'react';
import { cleanup, waitForElement } from 'react-testing-library';

import Popover from './Popover';
import Button from '../../controls/buttons/Button';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

function buildPopover(props) {
  const defaults = {
    name: 'popTest',
    title: 'Popover Title',
    content: 'This is the popover content.'
  };
  const mergedProps = Object.assign({}, defaults, props);
  return (
    <Popover
      {...mergedProps}
      renderTrigger={({ ref, toggleShow, isOpen }) => (
        <Button
          onClick={toggleShow}
          aria-expanded={isOpen}
          ref={ref}
          styleType="primary"
        >
          Popover Trigger Button
        </Button>
      )}
    />
  );
}

it('can be toggled by clicking the button', async () => {
  const { getByText, queryByText } = renderWithTheme(buildPopover());
  const trigger = getByText('Popover Trigger Button');

  trigger.click();
  const popoverContent = queryByText('This is the popover content.');
  expect(popoverContent).not.toBeVisible();

  trigger.click();
  expect(popoverContent).not.toBeVisible();
});

it('renders the title when provided', async () => {
  const { getByText, queryByText } = renderWithTheme(buildPopover());
  getByText('Popover Trigger Button').click();
  await waitForElement(() => getByText('Popover Title'));
  expect(queryByText('Popover Title')).not.toBeNull();
});

it('can be closed using the close button', async () => {
  const { getByText, queryByText } = renderWithTheme(
    buildPopover({ hasCloseButton: true })
  );
  getByText('Popover Trigger Button').click();

  const popoverContent = () => queryByText('This is the popover content.');
  popoverContent()
    .parentElement.querySelector('button')
    .click();

  await waitForElement(() => popoverContent() === null);
  expect(popoverContent()).toBeNull();
});

it('can be closed using the alternative close button', async () => {
  const { getByText, queryByText } = renderWithTheme(
    buildPopover({ hasAltCloseButton: true })
  );
  getByText('Popover Trigger Button').click();
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
  const { getByText, getByLabelText } = renderWithTheme(
    buildPopover({ content: popoverContent })
  );
  getByText('Popover Trigger Button').click();
  jest.runOnlyPendingTimers();

  expect(getByLabelText('Press escape to close the Popover')).toHaveFocus();
});
