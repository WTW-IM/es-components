/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';
import { render, cleanup } from '@testing-library/react';
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

const triggerResize = () => {
  const resizeEvent = global.document.createEvent('Event');
  resizeEvent.initEvent('resize', true, true);
  global.window.dispatchEvent(resizeEvent);
};

Object.defineProperty(global.document.body, 'clientWidth', {
  value: 500,
  writable: true
});

Object.defineProperty(global.document.body, 'clientHeight', {
  value: 500,
  writable: true
});

beforeEach(() => {
  global.document.body.clientWidth = 500;
  global.document.body.clientHeight = 500;
});

afterEach(cleanup);

it('uses a passed windowWidth if one is present', () => {
  const { getByTestId } = render(<WindowSizeComponent defaultWidth={1000} />);
  expect(getByTestId('window-width').textContent).toBe('1000');
});

it('uses document windowWidth if no prop is present', () => {
  global.document.body.clientWidth = 500;
  const { getByTestId } = render(React.cloneElement(<WindowSizeComponent />));
  expect(getByTestId('window-width').textContent).toBe('500');
});

it('uses a passed windowHeight if one is present', () => {
  const { getByTestId } = render(<WindowSizeComponent defaultHeight={1000} />);
  expect(getByTestId('window-height').textContent).toBe('1000');
});

it('uses document windowHeight if no prop is present', () => {
  global.document.body.clientHeight = 500;
  const { getByTestId } = render(<WindowSizeComponent />);
  expect(getByTestId('window-height').textContent).toBe('500');
});

it('adjusts the size based on resize', () => {
  // Initial size

  global.document.body.clientHeight = 500;

  const { getByTestId } = render(<WindowSizeComponent />);
  const windowHeightElement = getByTestId('window-height');

  expect(windowHeightElement.textContent).toBe('500');

  // Resize

  global.document.body.clientHeight = 1000;
  triggerResize();

  expect(windowHeightElement.textContent).toBe('1000');
});

it('starts with props but will update based on resize', () => {
  // Initial size

  global.document.body.clientHeight = 500;

  const { getByTestId } = render(<WindowSizeComponent defaultHeight={750} />);
  const windowHeightElement = getByTestId('window-height');

  expect(windowHeightElement.textContent).toBe('750');

  // Resize

  global.document.body.clientHeight = 1000;
  triggerResize();

  expect(windowHeightElement.textContent).toBe('1000');
});
