/* eslint-env jest */

import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';

import Tooltip from './Tooltip';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

it('displays when the mouse enters the target and hides when the mouse leaves the target', () => {
  const { queryByText } = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip">
      this is the target
    </Tooltip>
  );

  const target = queryByText('this is the target');
  fireEvent.mouseEnter(target);

  const toolTip = queryByText('this is the tooltip');

  expect(toolTip).toBeVisible();

  fireEvent.mouseLeave(target);
  expect(toolTip).not.toBeVisible();
});

it('is displayed on mouseDown if disableHover is true', () => {
  const { queryByText } = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = queryByText('this is the target');

  fireEvent.mouseEnter(target);

  expect(queryByText('this is the tooltip')).toBeNull();

  fireEvent.mouseDown(target);

  expect(queryByText('this is the tooltip')).toBeVisible();
  fireEvent.mouseDown(target);

  expect(queryByText('this is the tooltip')).not.toBeVisible();
});

it('is displayed/hidden on focus/blur of target', () => {
  const { getByText } = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = getByText('this is the target');

  fireEvent.focus(target);

  const toolTip = getByText('this is the tooltip');
  expect(toolTip).toBeVisible();

  fireEvent.blur(target);
  expect(toolTip).not.toBeVisible();
});

it('is hidden when ESC is pressed', () => {
  const { getByText } = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const target = getByText('this is the target');
  fireEvent.mouseDown(target);

  const toolTip = getByText('this is the tooltip');
  expect(toolTip).toBeVisible();

  fireEvent.keyDown(target, { keyCode: 27 });

  expect(toolTip).not.toBeVisible();
});
