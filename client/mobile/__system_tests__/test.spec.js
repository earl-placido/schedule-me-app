Feature('Test');

Scenario('Test', I => {
  I.runOnAndroid(() => {
    I.seeAppIsInstalled('com.schedulemeup');
  });

  // Wait for app to start
  I.wait(10);
});
