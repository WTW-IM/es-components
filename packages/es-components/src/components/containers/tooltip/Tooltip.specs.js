/* eslint-env jest */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import Tooltip from './Tooltip';
import { renderWithTheme } from '../../util/test-utils';

it('displays when the mouse enters the target and hides when the mouse leaves the target', async () => {
  const instance = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip">
      this is the target
    </Tooltip>
  );
  const { queryByText, queryByRole } = instance;

  const target = queryByText('this is the target');
  fireEvent.mouseEnter(target);
  const toolTip = queryByRole('tooltip');

  await waitFor(() => {
    expect(toolTip).toBeVisible();
  });

  fireEvent.mouseLeave(target);
  await waitFor(() => {
    expect(toolTip).not.toBeInTheDocument();
  });
});

it('is displayed on mouseDown if disableHover is true', async () => {
  const { getByText, queryByRole } = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = getByText('this is the target');

  fireEvent.mouseEnter(target);
  await waitFor(() => {
    expect(queryByRole('tooltip')).not.toBeInTheDocument();
  });

  fireEvent.click(target);
  await waitFor(() => {
    expect(queryByRole('tooltip')).toBeInTheDocument();
  });

  fireEvent.click(target);
  await waitFor(() => {
    expect(queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

it('is displayed/hidden on focus/blur of target', async () => {
  const instance = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );
  const { getByText, queryByRole } = instance;

  const target = getByText('this is the target');

  fireEvent.focus(target);

  const toolTip = queryByRole('tooltip');
  await waitFor(() => {
    expect(toolTip).toBeVisible();
  });

  fireEvent.blur(target);
  await waitFor(() => {
    expect(toolTip).not.toBeInTheDocument();
  });
});

it('is hidden when ESC is pressed', async () => {
  const { getByText, queryByRole } = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = getByText('this is the target');
  fireEvent.click(target);

  const toolTip = queryByRole('tooltip');
  await waitFor(() => {
    expect(toolTip).toBeVisible();
  });

  fireEvent.keyDown(target, { keyCode: 27 });
  await waitFor(() => {
    expect(toolTip).not.toBeInTheDocument();
  });
});
