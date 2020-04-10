const {generateUser} = require('../util/userUtil');

describe('Test register functionality', () => {
  let generatedUser = generateUser();

  it('Cannot create user with empty form', () => {
    $('~Home').waitForExist();
    $('~Sign Up Button').click();

    $('~First name').clearValue();
    $('~Last name').clearValue();
    $('~Email').clearValue();
    $('~Password').clearValue();
    // keyboard blocks appium from finding the form input
    driver.hideKeyboard();
    $('~Confirm password').clearValue();

    // Need to click twice
    $('~Sign Up Submit Button').click();
    $('~Sign Up Submit Button').click();
    $('~Create Account Form').isDisplayed();
    browser.back();
    $('~Sign Up Button').isDisplayed();
  });

  it('Cannot create user with invalid passwords', () => {
    let alertMessages;
    let longPassword =
      'longharactersabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    let shortPassword = 'short';

    $('~Home').waitForExist();
    $('~Sign Up Button').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Email').setValue(generatedUser.email);

    // length over 100
    $('~Password').setValue(longPassword);
    // keyboard blocks appium from finding the form input
    driver.hideKeyboard();
    $('~Confirm password').setValue(longPassword);

    // Need to click twice the first time
    $('~Sign Up Submit Button').click();
    $('~Sign Up Submit Button').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual("Couldn't sign you up ");
    expect(alertMessages[1].getText()).toEqual(
      'Password must be between 8 and 100 characters',
    );
    $('android.widget.Button').click();
    $('~Sign Up Submit Button').waitForDisplayed();

    // length less than 8
    $('~Password').setValue(shortPassword);
    $('~Confirm password').setValue(shortPassword);
    $('~Sign Up Submit Button').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual("Couldn't sign you up ");
    expect(alertMessages[1].getText()).toEqual(
      'Password must be between 8 and 100 characters',
    );
    $('android.widget.Button').click();
    $('~Sign Up Submit Button').waitForDisplayed();

    // passwords not matching
    $('~Password').setValue(generatedUser.password);
    $('~Confirm password').setValue(`${generatedUser.password}2`);
    $('~Sign Up Submit Button').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual("Couldn't sign you up ");
    expect(alertMessages[1].getText()).toEqual('Password mismatch');
    $('android.widget.Button').click();
    $('~Sign Up Submit Button').waitForDisplayed();

    browser.back();
    $('~Sign Up Button').isDisplayed();
  });

  it('Cannot create user with invalid email', () => {
    let invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      '.email@example.com',
      '”(),:;<>[]@example.com',
      'this is"really"notallowed@example.com',
    ];

    $('~Home').waitForExist();
    $('~Sign Up Button').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Password').setValue(generatedUser.password);
    // keyboard blocks appium from finding the form input
    driver.hideKeyboard();
    $('~Confirm password').setValue(generatedUser.password);
    $('~Sign Up Submit Button').click();

    invalidEmails.forEach(email => {
      $('~Email').setValue(email);
      $('~Sign Up Submit Button').click();

      // Android alert
      $('android.widget.Button').waitForDisplayed();
      let alertMessages = $$('android.widget.TextView');
      expect(alertMessages[0].getText()).toEqual("Couldn't sign you up ");
      expect(alertMessages[1].getText()).toEqual('Must follow email format');
      $('android.widget.Button').click();
      $('~Sign Up Submit Button').waitForDisplayed();
    });

    browser.back();
    $('~Sign Up Button').isDisplayed();
  });

  it('Can register', () => {
    $('~Home').waitForExist();
    $('~Sign Up Button').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Email').setValue(generatedUser.email);
    $('~Password').setValue(generatedUser.password);
    // keyboard blocks appium from finding the form input
    driver.hideKeyboard();
    $('~Confirm password').setValue(generatedUser.password);

    $('~Sign Up Submit Button').click();
    $('~Sign Up Submit Button').click();
    $('~Your Groups').waitForDisplayed();
    $('~Menu').click();
    $('~Logout Button').waitForDisplayed();
    $('~Logout Button').click();
    $('~Sign Up Button').waitForDisplayed();
  });

  it('Cannot create user with same email', () => {
    $('~Home').waitForExist();
    $('~Sign Up Button').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Email').setValue(generatedUser.email);
    $('~Password').setValue(generatedUser.password);
    // keyboard blocks appium from finding the form input
    driver.hideKeyboard();
    $('~Confirm password').setValue(generatedUser.password);

    $('~Sign Up Submit Button').click();
    $('~Sign Up Submit Button').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    let alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual("Couldn't sign you up ");
    expect(alertMessages[1].getText()).toEqual(
      'Email address entered is taken.',
    );

    $('android.widget.Button').click();

    browser.pause(2000);
    browser.back();
    $('~Sign Up Button').waitForDisplayed();
  });
});
