import { environment } from '@app/env';
import { defineConfig } from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: environment.hostLink,
    reporter: 'mochawesome',
  },
  env: {
    baseUrlForEmbedded: 'https://sandbox.embed.adstate.com',
  },
});
