/// <reference types="jest" />
import React from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import viaTheme from 'es-components-via-theme';
import Popover, { RenderTriggerParams, PopoverProps } from './Popover';
import OriginalButton from '../../controls/buttons/Button';
import { renderWithTheme } from '../../util/test-utils';

const Button = OriginalButton as ReturnType<
  typeof React.forwardRef<
    HTMLElement | undefined,
    JSX.IntrinsicElements['button'] & {
      styleType: keyof (typeof viaTheme)['buttonStyles']['button']['variant'];
    }
  >
>;

type PossibleProps = Partial<PopoverProps>;

function TestPopover(props?: PossibleProps) {
  const defaults: Omit<PopoverProps, 'renderTrigger'> = {
    name: 'popTest',
    title: 'Popover Title',
    content: 'This is the popover content.'
  };
  const renderTrigger = ({ ref, toggleShow, isOpen }: RenderTriggerParams) => (
    <Button
      onClick={toggleShow}
      aria-expanded={isOpen}
      ref={ref}
      styleType="primary"
    >
      Popover Trigger Button
    </Button>
  );
  const mergedProps: PopoverProps = {
    ...defaults,
    ...props,
    renderTrigger
  };
  return <Popover {...mergedProps} />;
}

it('can be toggled by clicking the button', async () => {
  const user = userEvent.setup();
  renderWithTheme(<TestPopover />);
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
  renderWithTheme(<TestPopover />);
  await user.click(screen.getByText('Popover Trigger Button'));
  await screen.findByText('This is the popover content.');
  expect(await screen.findByText('Popover Title')).toBeInTheDocument();
});

it('can be closed using the close button', async () => {
  const user = userEvent.setup();
  renderWithTheme(<TestPopover hasCloseButton />);
  await user.click(screen.getByText('Popover Trigger Button'));
  const popoverContent = await screen.findByText(
    'This is the popover content.'
  );

  await user.click(await screen.findByRole('button', { name: /Close/ }));

  await waitFor(() => expect(popoverContent).not.toBeInTheDocument());
});

it('can be closed using the alternative close button', async () => {
  const user = userEvent.setup();
  renderWithTheme(<TestPopover hasAltCloseButton />);
  await user.click(screen.getByText('Popover Trigger Button'));
  await user.click(await screen.findByRole('button', { name: /Close/ }));
  await waitFor(() =>
    expect(screen.queryByText('This is the popover content.')).toBeNull()
  );
});

it('sets focus on a focusable element within the content', async () => {
  const user = userEvent.setup();
  const popoverContent = <a href="#test">Test link</a>;
  renderWithTheme(<TestPopover content={popoverContent} />);
  await user.click(await screen.findByText('Popover Trigger Button'));

  const dialog = await screen.findByRole('dialog');
  expect(dialog).toHaveFocus();
});
