/* eslint-env jest */
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { act } from 'react-dom/test-utils';
import { useWindowWidth } from './useWindowWidth';

const WindowSizeComponent = () => {
  const windowWidth = useWindowWidth();
  return (
    <div>
      <span id="window-width" data-testid="window-width">
        {windowWidth}
      </span>
    </div>
  );
};

const triggerResize = () => {
  const resizeEvent = global.document.createEvent('Event');
  act(() => {
    resizeEvent.initEvent('resize', true, true);
    global.window.dispatchEvent(resizeEvent);
  });
};

Object.defineProperty(global.document.body, 'clientWidth', {
  value: 500,
  writable: true
});

beforeEach(() => {
  global.document.body.clientWidth = 500;
});

afterEach(cleanup);

it('uses document clientWidth', () => {
  const { getByTestId } = render(React.cloneElement(<WindowSizeComponent />));
  expect(getByTestId('window-width').textContent).toBe('500');
});

it('adjusts the size based on resize', () => {
  // Initial size

  const { getByTestId } = render(<WindowSizeComponent />);
  const windowWidthElement = getByTestId('window-width');

  expect(windowWidthElement.textContent).toBe('500');

  // Resize

  act(() => {
    global.document.body.clientWidth = 1000;
    triggerResize();
  });

  expect(windowWidthElement.textContent).toBe('1000');
});
