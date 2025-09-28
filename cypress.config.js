const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    pageLoadTimeout: 300000,        // 5 menit
    defaultCommandTimeout: 20000,   // 20 detik
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,       // cegah block cross-origin
    setupNodeEvents(on, config) {
      return config;
    },
  },
});