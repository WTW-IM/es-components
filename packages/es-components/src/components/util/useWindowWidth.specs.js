/* eslint-env jest */
import React from 'react';
import { render } from 'react-testing-library';
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
  resizeEvent.initEvent('resize', true, true);
  global.window.dispatchEvent(resizeEvent);
};

beforeEach(() => {
  Object.defineProperty(global.document.body, 'clientWidth', {
    value: 500,
    writable: true
  });

  const { body } = global.document;
  if (body.firstChild) body.removeChild(body.firstChild);
});

it('uses document clientWidth', () => {
  global.document.body.clientWidth = 500;
  const { getByTestId } = render(React.cloneElement(<WindowSizeComponent />));
  expect(getByTestId('window-width').textContent).toBe('500');
});

it('adjusts the size based on resize', () => {
  // Initial size

  global.document.body.clientWidth = 500;

  const { getByTestId } = render(<WindowSizeComponent />);
  const windowWidthElement = getByTestId('window-width');

  expect(windowWidthElement.textContent).toBe('500');

  // Resize

  global.document.body.clientWidth = 1000;
  triggerResize();

  expect(windowWidthElement.textContent).toBe('1000');
});
