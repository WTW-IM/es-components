/* eslint-env jest */

import React from 'react';
import { fireEvent, cleanup, wait } from 'react-testing-library';

import Tooltip from './Tooltip';
import { renderWithTheme } from '../../util/test-utils';

beforeEach(cleanup);

function getTooltip({ queryAllByText }, text) {
  return (
    queryAllByText(text).find(node => node.hasAttribute('aria-hidden')) || null
  );
}

it('displays when the mouse enters the target and hides when the mouse leaves the target', () => {
  const instance = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip">
      this is the target
    </Tooltip>
  );
  const { queryByText } = instance;

  const target = queryByText('this is the target');
  fireEvent.mouseEnter(target);
  const toolTip = getTooltip(instance, 'this is the tooltip');

  wait(() => {
    expect(toolTip).toBeVisible();
  });

  fireEvent.mouseLeave(target);
  wait(() => {
    expect(toolTip).not.toBeVisible();
  });
});

it('is displayed on mouseDown if disableHover is true', () => {
  const instance = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );

  const { queryByText } = instance;

  const target = queryByText('this is the target');

  fireEvent.mouseEnter(target);
  wait(() => {
    expect(getTooltip(instance, 'this is the tooltip')).toBeNull();
  });

  fireEvent.mouseDown(target);
  wait(() => {
    expect(getTooltip(instance, 'this is the tooltip')).toBeVisible();
  });

  fireEvent.mouseDown(target);
  wait(() => {
    expect(getTooltip(instance, 'this is the tooltip')).not.toBeVisible();
  });
});

it('is displayed/hidden on focus/blur of target', () => {
  const instance = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );
  const { getByText } = instance;

  const target = getByText('this is the target');

  fireEvent.focus(target);

  const toolTip = getTooltip(instance, 'this is the tooltip');
  wait(() => {
    expect(toolTip).toBeVisible();
  });

  fireEvent.blur(target);
  wait(() => {
    expect(toolTip).not.toBeVisible();
  });
});

it('is hidden when ESC is pressed', () => {
  const instance = renderWithTheme(
    <Tooltip name="test" content="this is the tooltip" disableHover>
      this is the target
    </Tooltip>
  );
  const { getByText } = instance;

  const target = getByText('this is the target');
  fireEvent.mouseDown(target);

  const toolTip = getTooltip(instance, 'this is the tooltip');
  wait(() => {
    expect(toolTip).toBeVisible();
  });

  fireEvent.keyDown(target, { keyCode: 27 });
  wait(() => {
    expect(toolTip).not.toBeVisible();
  });
});
