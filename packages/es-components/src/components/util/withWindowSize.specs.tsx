import React from 'react';
import PropTypes from 'prop-types';
import { render, screen, fireEvent } from '@testing-library/react';
import withWindowSize, { WindowSizeProps } from './withWindowSize';

const InnerComponent = ({ windowWidth, windowHeight }: WindowSizeProps) => (
  <div>
    <span id="window-width" data-testid="window-width">
      {windowWidth}
    </span>
    <span data-testid="window-height">{windowHeight}</span>
  </div>
);
InnerComponent.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired
};

const WindowSizeComponent = withWindowSize(InnerComponent);

const triggerResize = () =>
  fireEvent(window, new Event('resize', { bubbles: true, cancelable: true }));

const setClientWidth = (width: number) => {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    writable: true,
    configurable: true,
    value: width
  });
};

const setClientHeight = (height: number) => {
  Object.defineProperty(document.documentElement, 'clientHeight', {
    writable: true,
    configurable: true,
    value: height
  });
};

it('uses a passed windowWidth if one is present', () => {
  render(<WindowSizeComponent defaultWidth={1000} />);
  expect(screen.getByTestId('window-width')).toHaveTextContent('1000');
});

it('uses document windowWidth if no prop is present', () => {
  setClientWidth(500);
  render(React.cloneElement(<WindowSizeComponent />));
  expect(screen.getByTestId('window-width')).toHaveTextContent('500');
});

it('uses a passed windowHeight if one is present', () => {
  render(<WindowSizeComponent defaultHeight={1000} />);
  expect(screen.getByTestId('window-height')).toHaveTextContent('1000');
});

it('uses document windowHeight if no prop is present', () => {
  setClientHeight(500);
  render(<WindowSizeComponent />);
  expect(screen.getByTestId('window-height')).toHaveTextContent('500');
});

it('adjusts the size based on resize', () => {
  // Initial size

  setClientHeight(500);

  render(<WindowSizeComponent />);
  const windowHeightElement = screen.getByTestId('window-height');

  expect(windowHeightElement).toHaveTextContent('500');

  // Resize

  setClientHeight(1000);
  triggerResize();

  expect(windowHeightElement).toHaveTextContent('1000');
});

it('starts with props but will update based on resize', () => {
  // Initial size

  setClientHeight(500);

  render(<WindowSizeComponent defaultHeight={750} />);
  const windowHeightElement = screen.getByTestId('window-height');

  expect(windowHeightElement).toHaveTextContent('750');

  // Resize

  setClientHeight(1000);
  triggerResize();

  expect(windowHeightElement).toHaveTextContent('1000');
});
