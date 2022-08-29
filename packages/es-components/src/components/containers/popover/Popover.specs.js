/* eslint-env jest */
import React from 'react';

import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  const user = userEvent.setup();
  renderWithTheme(buildPopover());
  const trigger = await screen.findByText('Popover Trigger Button');

  await userEvent.click(trigger);
  const popoverContent = await screen.findByText(
    'This is the popover content.'
  );
  expect(popoverContent).toBeVisible();

  await user.click(trigger);
  expect(popoverContent).not.toBeVisible();
});

it('renders the title when provided', async () => {
  const user = userEvent.setup();
  renderWithTheme(buildPopover());
  await user.click(screen.getByText('Popover Trigger Button'));
  await screen.findByText('This is the popover content.');
  expect(await screen.findByText('Popover Title')).toBeInTheDocument();
});

it('can be closed using the close button', async () => {
  const user = userEvent.setup();
  renderWithTheme(buildPopover({ hasCloseButton: true }));
  await user.click(screen.getByText('Popover Trigger Button'));
  const popoverContent = await screen.findByText(
    'This is the popover content.'
  );

  await user.click(await screen.findByRole('button', { name: /Close/ }));

  await waitFor(() => expect(popoverContent).not.toBeInTheDocument());
});

it('can be closed using the alternative close button', async () => {
  const user = userEvent.setup();
  renderWithTheme(buildPopover({ hasAltCloseButton: true }));
  await user.click(screen.getByText('Popover Trigger Button'));
  await user.click(await screen.findByRole('button', { name: /Close/ }));
  await waitFor(() =>
    expect(screen.queryByText('This is the popover content.')).toBeNull()
  );
});

it('sets focus on a focusable element within the content', async () => {
  const user = userEvent.setup();
  const popoverContent = <a href="#test">Test link</a>;
  renderWithTheme(buildPopover({ content: popoverContent }));
  await user.click(screen.getByText('Popover Trigger Button'));

  await waitFor(() =>
    expect(
      screen.getByLabelText('Press escape to close the Popover')
    ).toHaveFocus()
  );
});
