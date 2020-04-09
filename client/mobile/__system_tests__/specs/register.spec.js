const userUtil = require('../util/userUtil');

describe('Test register functionality', () => {
  var generatedUser = userUtil.generateUser();

  it('Cannot create user with empty form', () => {
    $('~HomeContainer').waitForExist();
    $('~SignupButton').click();

    $('~First name').clearValue();
    $('~Last name').clearValue();
    $('~Email').clearValue();
    $('~Password').clearValue();
    $('~Confirm password').clearValue();

    $('~SignupSubmitButton').click();
    $('~CreateAccountForm').isDisplayed();
    browser.back();
    $('~SignupButton').isDisplayed();
  });

  it('Cannot create user with invalid passwords', () => {
    let alertMessages;
    let longPassword =
      'longharactersabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    let shortPassword = 'short';

    $('~HomeContainer').waitForExist();
    $('~SignupButton').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Email').setValue(generatedUser.email);

    // length over 100
    $('~Password').setValue(longPassword);
    $('~Confirm password').setValue(longPassword);
    $('~SignupSubmitButton').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual('Invalid input');
    expect(alertMessages[1].getText()).toEqual(
      'Password must be between 8 and 100 characters',
    );
    $('android.widget.Button').click();
    $('~SignupSubmitButton').waitForDisplayed();

    // length less than 8
    $('~Password').setValue(shortPassword);
    $('~Confirm password').setValue(shortPassword);
    $('~SignupSubmitButton').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual('Invalid input');
    expect(alertMessages[1].getText()).toEqual(
      'Password must be between 8 and 100 characters',
    );
    $('android.widget.Button').click();
    $('~SignupSubmitButton').waitForDisplayed();

    // passwords not matching
    $('~Password').setValue(generatedUser.password);
    $('~Confirm password').setValue(`${generatedUser.password}2`);
    $('~SignupSubmitButton').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual('Invalid input');
    expect(alertMessages[1].getText()).toEqual('Password mismatch');
    $('android.widget.Button').click();
    $('~SignupSubmitButton').waitForDisplayed();

    browser.back();
    $('~SignupButton').isDisplayed();
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

    $('~HomeContainer').waitForExist();
    $('~SignupButton').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Password').setValue(generatedUser.password);
    $('~Confirm password').setValue(generatedUser.password);

    invalidEmails.forEach(email => {
      $('~Email').setValue(email);
      $('~SignupSubmitButton').click();

      // Android alert
      $('android.widget.Button').waitForDisplayed();
      let alertMessages = $$('android.widget.TextView');
      expect(alertMessages[0].getText()).toEqual('Invalid input');
      expect(alertMessages[1].getText()).toEqual('Must follow email format');
      $('android.widget.Button').click();
      $('~SignupSubmitButton').waitForDisplayed();
    });

    browser.back();
    $('~SignupButton').isDisplayed();
  });

  it('Can register', () => {
    $('~HomeContainer').waitForExist();
    $('~SignupButton').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Email').setValue(generatedUser.email);
    $('~Password').setValue(generatedUser.password);
    $('~Confirm password').setValue(generatedUser.password);

    $('~SignupSubmitButton').click();
    $('~YourGroupsTitle').waitForDisplayed();
    $('~DrawerButton').click();
    $('~LogoutButton').waitForDisplayed();
    $('~LogoutButton').click();
    $('~SignupButton').waitForDisplayed();
  });

  it('Cannot create user with same email', () => {
    $('~HomeContainer').waitForExist();
    $('~SignupButton').click();

    $('~First name').setValue(generatedUser.fName);
    $('~Last name').setValue(generatedUser.lName);
    $('~Email').setValue(generatedUser.email);
    $('~Password').setValue(generatedUser.password);
    $('~Confirm password').setValue(generatedUser.password);

    $('~SignupSubmitButton').click();

    // Android alert
    $('android.widget.Button').waitForDisplayed();
    let alertMessages = $$('android.widget.TextView');
    expect(alertMessages[0].getText()).toEqual('Invalid input');
    expect(alertMessages[1].getText()).toEqual(
      'Email address entered is taken.',
    );

    $('android.widget.Button').click();

    browser.back();
    $('~SignupButton').waitForDisplayed();
  });
});
