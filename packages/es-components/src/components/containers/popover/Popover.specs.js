/* eslint-env jest */

import React from 'react';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';

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
  const { getByText, findByText } = renderWithTheme(buildPopover());
  const trigger = getByText('Popover Trigger Button');

  fireEvent.click(trigger);
  const popoverContent = await findByText('This is the popover content.');
  expect(popoverContent).toBeVisible();

  trigger.click();
  expect(popoverContent).not.toBeVisible();
});

it('renders the title when provided', async () => {
  const { getByText, queryByText, findByText } = renderWithTheme(
    buildPopover()
  );
  fireEvent.click(getByText('Popover Trigger Button'));
  await findByText('This is the popover content.');
  await waitFor(() => expect(queryByText('Popover Title')).not.toBeNull());
});

it('can be closed using the close button', async () => {
  const { getByText, queryByText, findByText } = renderWithTheme(
    buildPopover({ hasCloseButton: true })
  );
  fireEvent.click(getByText('Popover Trigger Button'));
  await findByText('This is the popover content.');

  const popoverContent = () => queryByText('This is the popover content.');
  popoverContent()
    .parentElement.querySelector('button')
    .click();

  await waitFor(() => expect(popoverContent()).toBeNull());
});

it('can be closed using the alternative close button', async () => {
  const { getByText, queryByText } = renderWithTheme(
    buildPopover({ hasAltCloseButton: true })
  );
  fireEvent.click(getByText('Popover Trigger Button'));
  fireEvent.click(
    getByText('Popover Title').parentElement.querySelector('button')
  );
  await waitFor(() =>
    expect(queryByText('This is the popover content.')).toBeNull()
  );
});

it('sets focus on a focusable element within the content', async () => {
  const popoverContent = <a href="#test">Test link</a>;
  const { getByText, getByLabelText } = renderWithTheme(
    buildPopover({ content: popoverContent })
  );
  fireEvent.click(getByText('Popover Trigger Button'));

  await waitFor(() =>
    expect(getByLabelText('Press escape to close the Popover')).toHaveFocus()
  );
});
