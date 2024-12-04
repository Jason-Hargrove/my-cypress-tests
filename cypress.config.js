const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev.mrcool.work/', // Replace with your app's base URL
    setupNodeEvents(on, config) {
      // Implement Node event listeners here
    },
  },
});
