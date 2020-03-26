exports.config = {
  specs: ['./__system_tests__/specs/*.spec.js'],
  exclude: [],
  maxInstances: 10,
  port: 4723,
  capabilities: [
    {
      maxInstances: 1,
      browserName: '',
      platformName: 'Android',
      appPackage: 'com.schedulemeup',
      appActivity: '.MainActivity',
    },
  ],
  sync: true,
  coloredLogs: true,
  logLevel: 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    expectationResultHandler: function(passed, assertion) {
      if (passed) {
        return;
      }
      browser.saveScreenshot(
        `./__system_tests_errors__/assertionError_${assertion.error.message}.png`,
      );
    },
  },
};
