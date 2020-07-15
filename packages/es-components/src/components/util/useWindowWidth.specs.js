/* eslint-env jest */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
  const resizeEvent = document.createEvent('Event');
  resizeEvent.initEvent('resize', true, true);
  window.dispatchEvent(resizeEvent);
};

beforeEach(() => {
  Object.defineProperty(document.body, 'clientWidth', {
    value: 500,
    writable: true
  });
  document.body.clientWidth = 500;
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
    document.body.clientWidth = 1000;
    triggerResize();
  });

  expect(windowWidthElement.textContent).toBe('1000');
});
