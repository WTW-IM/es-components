import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import 'jest-styled-components';

beforeAll(() => {
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
