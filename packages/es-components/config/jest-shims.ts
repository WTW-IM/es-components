type esGlobal = typeof global & {
  ASSETS_PATH: string;
};

(global as esGlobal).ASSETS_PATH =
  'https://app.dev.viabenefits.com/static/third-party/';
const originalError = console.error;

beforeAll(() => {
  console.error = (...[err, ...args]: Parameters<typeof console.error>) => {
    if (
      ((err as Error).message || (err as string)).match(
        /not implemented: window\.computedStyle/i
      )
    )
      return;

    originalError.call(console, err, ...(args as unknown[]));
  };
});

afterAll(() => {
  console.error = originalError;
});

export {};
