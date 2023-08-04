import React from 'react';
import { waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tooltip from './Tooltip';
import { renderWithTheme } from '../../util/test-utils';

it('displays when the mouse enters the target and hides when the mouse leaves the target', async () => {
  renderWithTheme(
    <>
      <Tooltip name="test" content="this is the tooltip">
        this is the target
      </Tooltip>
    </>
  );

  const target = await screen.findByText('this is the target');
  await userEvent.hover(target);

  expect(await screen.findByRole('tooltip')).toBeVisible();

  await userEvent.unhover(target);

  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

it('is displayed on mouseDown if disableHover is true', async () => {
  renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = await screen.findByText('this is the target');
  await userEvent.hover(target);

  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  await userEvent.click(target);
  expect(await screen.findByRole('tooltip')).toBeVisible();

  await userEvent.click(target);
  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

it('is displayed/hidden on focus/blur of target', async () => {
  renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = await screen.findByText('this is the target');
  act(() => target.focus());

  expect(await screen.findByRole('tooltip')).toBeVisible();

  await userEvent.tab();
  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

it('is hidden when ESC is pressed', async () => {
  renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = await screen.findByText('this is the target');
  await userEvent.click(target);

  expect(await screen.findByRole('tooltip')).toBeVisible();

  await userEvent.type(target, '{esc}');
  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
