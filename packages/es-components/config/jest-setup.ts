import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import '@testing-library/jest-dom';

beforeEach(() => {
  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(() => 'Mocking works'),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  });
});

export {};
