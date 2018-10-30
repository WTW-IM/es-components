/* eslint-env jest */

import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';

import Tooltip from './Tooltip';

beforeEach(cleanup);

it('displays when the mouse enters the target and hides when the mouse leaves the target', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Tooltip name="test" content="this is the tooltip">
        this is the target
      </Tooltip>
    </ThemeProvider>
  );

  const target = queryByText('this is the target');
  fireEvent.mouseEnter(target);

  const toolTip = queryByText('this is the tooltip');

  expect(toolTip).toBeVisible();

  fireEvent.mouseLeave(target);
  expect(toolTip).not.toBeVisible();
});

it('is displayed on mouseDown if disableHover is true', () => {
  const { queryByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Tooltip name="test" content="this is the tooltip" disableHover>
        this is the target
      </Tooltip>
    </ThemeProvider>
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
  const { getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Tooltip name="test" content="this is the tooltip" disableHover>
        this is the target
      </Tooltip>
    </ThemeProvider>
  );

  const target = getByText('this is the target');

  fireEvent.focus(target);

  const toolTip = getByText('this is the tooltip');
  expect(toolTip).toBeVisible();

  fireEvent.blur(target);
  expect(toolTip).not.toBeVisible();
});

it('is hidden when ESC is pressed', () => {
  const { getByText } = render(
    <ThemeProvider theme={viaTheme}>
      <Tooltip name="test" content="this is the tooltip" disableHover>
        this is the target
      </Tooltip>
    </ThemeProvider>
  );

  const target = getByText('this is the target');
  fireEvent.mouseDown(target);

  const toolTip = getByText('this is the tooltip');
  expect(toolTip).toBeVisible();

  fireEvent.keyDown(target, { keyCode: 27 });

  expect(toolTip).not.toBeVisible();
});
