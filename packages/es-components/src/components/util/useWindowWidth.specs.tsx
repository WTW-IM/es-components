import React from 'react';
import { render, screen, act } from '@testing-library/react';
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
  Object.defineProperty(window, 'innerWidth', {
    value: 500,
    writable: true
  });
  window.innerWidth = 500;
});

it('uses document clientWidth', async () => {
  render(React.cloneElement(<WindowSizeComponent />));
  expect(await screen.findByTestId('window-width')).toHaveTextContent('500');
});

it('adjusts the size based on resize', async () => {
  // Initial size
  render(<WindowSizeComponent />);
  const windowWidthElement = await screen.findByTestId('window-width');

  expect(windowWidthElement).toHaveTextContent('500');

  // Resize
  act(() => {
    window.innerWidth = 1000;
    triggerResize();
  });

  expect(windowWidthElement).toHaveTextContent('1000');
});
