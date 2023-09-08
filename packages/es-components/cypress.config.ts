import { defineConfig } from 'cypress';
import * as ciConfig from './cypress-ci.json';

const extraConfig = process.env.CI ? ciConfig : {};

export default defineConfig({
  ...extraConfig,
  scrollBehavior: 'center',
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:6060'
  }
});
