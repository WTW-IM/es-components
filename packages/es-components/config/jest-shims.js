/* eslint-env jest */
global.ASSETS_PATH = "https://app.dev.viabenefits.com/static/third-party/"
const originalError = console.error;

beforeAll(() => {
  console.error = (err, ...args) => {
    if ((err.message || err).match(/not implemented: window\.computedStyle/i))
      return;

    originalError.call(console, err, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
