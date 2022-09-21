/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { render, screen, fireEvent } from '@testing-library/react';
import withWindowSize from './withWindowSize';

const InnerComponent = ({ windowWidth, windowHeight }) => (
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

const triggerResize = async () =>
  await fireEvent(
    window,
    new Event('resize', { bubbles: true, cancelable: true })
  );

Object.defineProperty(document.body, 'clientWidth', {
  value: 500,
  writable: true
});

Object.defineProperty(document.body, 'clientHeight', {
  value: 500,
  writable: true
});

beforeEach(() => {
  document.body.clientWidth = 500;
  document.body.clientHeight = 500;
});

it('uses a passed windowWidth if one is present', () => {
  render(<WindowSizeComponent defaultWidth={1000} />);
  expect(screen.getByTestId('window-width').textContent).toBe('1000');
});

it('uses document windowWidth if no prop is present', () => {
  document.body.clientWidth = 500;
  render(React.cloneElement(<WindowSizeComponent />));
  expect(screen.getByTestId('window-width').textContent).toBe('500');
});

it('uses a passed windowHeight if one is present', () => {
  render(<WindowSizeComponent defaultHeight={1000} />);
  expect(screen.getByTestId('window-height').textContent).toBe('1000');
});

it('uses document windowHeight if no prop is present', () => {
  document.body.clientHeight = 500;
  render(<WindowSizeComponent />);
  expect(screen.getByTestId('window-height').textContent).toBe('500');
});

it('adjusts the size based on resize', async () => {
  // Initial size

  document.body.clientHeight = 500;

  render(<WindowSizeComponent />);
  const windowHeightElement = screen.getByTestId('window-height');

  expect(windowHeightElement.textContent).toBe('500');

  // Resize

  document.body.clientHeight = 1000;
  await triggerResize();

  expect(windowHeightElement.textContent).toBe('1000');
});

it('starts with props but will update based on resize', async () => {
  // Initial size

  document.body.clientHeight = 500;

  render(<WindowSizeComponent defaultHeight={750} />);
  const windowHeightElement = screen.getByTestId('window-height');

  expect(windowHeightElement.textContent).toBe('750');

  // Resize

  document.body.clientHeight = 1000;
  await triggerResize();

  expect(windowHeightElement.textContent).toBe('1000');
});
