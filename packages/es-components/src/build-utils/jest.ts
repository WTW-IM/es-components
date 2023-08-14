Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: function () {
    return {
      observe: function () {
        // noop
      },
      unobserve: function () {
        // noop
      },
      disconnect: function () {
        // noop
      }
    };
  }
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return */
jest.mock('es-components', () => {
  const esComp = jest.requireActual('es-components');
  let topZIndex = 1000;

  return {
    ...esComp,
    useTopZIndex: jest.fn(() => (topZIndex += 1))
  };
});
/* eslint-enable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return */
