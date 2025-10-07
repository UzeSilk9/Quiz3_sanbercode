const { defineConfig } = require('cypress')


module.exports = defineConfig({
e2e: {
baseUrl: 'https://opensource-demo.orangehrmlive.com',
specPattern: 'cypress/e2e/**/*.js',
supportFile: 'cypress/support/e2e.js',
pageLoadTimeout: 120000,
defaultCommandTimeout: 8000,
}
})