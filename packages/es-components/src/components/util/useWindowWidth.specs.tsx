import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { useWindowWidth } from './useWindowWidth';
import { setClientWidth } from './test-utils';

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

it('uses document clientWidth', async () => {
  setClientWidth(500);
  render(<WindowSizeComponent />);
  expect(await screen.findByTestId('window-width')).toHaveTextContent('500');
});

it('adjusts the size based on resize', async () => {
  // Initial size
  render(<WindowSizeComponent />);
  const windowWidthElement = await screen.findByTestId('window-width');

  expect(windowWidthElement).toHaveTextContent('500');

  // Resize
  act(() => {
    setClientWidth(1000);
    triggerResize();
  });

  await waitFor(() => expect(windowWidthElement).toHaveTextContent('1000'));
});
