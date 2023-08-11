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
