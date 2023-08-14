import rewire from 'rewire';

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

jest.mock('es-components', () => {
  let topZIndex = 1000;
  const newUseTopZIndex = jest.fn(() => (topZIndex += 1));

  const rewiredESComp = rewire('es-components');
  rewiredESComp.__set__('useTopZIndex', newUseTopZIndex);

  return rewiredESComp;
});
