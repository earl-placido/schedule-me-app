const userUtil = require('../util/userUtil');

const createUser = user => {
  $('~HomeContainer').waitForExist();
  $('~SignupButton').click();

  $('~First name').setValue(user.fName);
  $('~Last name').setValue(user.lName);
  $('~Email').setValue(user.email);
  $('~Password').setValue(user.password);
  $('~Confirm password').setValue(user.password);

  $('~SignupSubmitButton').click();
  $('~YourGroupsTitle').waitForDisplayed();
  $('~DrawerButton').click();
  $('~LogoutButton').waitForDisplayed();
  $('~LogoutButton').click();
  $('~SignupButton').waitForDisplayed();
};

const getTextFromToast = () => {
  // wait for the progress bar to appear then disappear then grab all text on screen
  $('android.widget.ProgressBar').waitForDisplayed();
  $('android.widget.ProgressBar').waitForDisplayed(undefined, true);
  let textViews = $$('android.widget.TextView');
  let errorText = 'NaN';
  if (textViews[10] != undefined && textViews[10] != null) {
    errorText = textViews[10].getText();
    // wait for toast to disappear
    browser.pause(4000);
  }
  return errorText;
};

describe('Test register functionality', () => {
  var generatedUser = userUtil.generateUser();

  beforeAll(() => {
    createUser(generatedUser);
  });

  it('Can login', () => {
    $('~Email').isDisplayed();
    $('~Password').isDisplayed();

    $('~Email').setValue(generatedUser.email);
    $('~Password').setValue(generatedUser.password);
    $('~LoginButton').click();

    $('~YourGroupsTitle').waitForDisplayed();
    $('~DrawerButton').click();
    $('~LogoutButton').waitForDisplayed();
    $('~LogoutButton').click();
    $('~SignupButton').waitForDisplayed();
  });

  it('Cannot login with empty form', () => {
    $('~Email').isDisplayed();
    $('~Password').isDisplayed();

    $('~Email').clearValue();
    $('~Password').clearValue();

    $('~LoginButton').click();
    browser.waitUntil(
      () => {
        let textViews = $$('android.widget.TextView');
        return (
          textViews[4].getText() == 'Please input email' &&
          textViews[6].getText() == 'Please input password'
        );
      },
      5000,
      'Expected please input text to appear.',
    );
  });

  it('Cannot login with invalid password', () => {
    let errorText;
    let longPassword =
      'longharactersabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    let shortPassword = 'short';

    $('~Email').isDisplayed();
    $('~Password').isDisplayed();
    $('~Email').setValue(generatedUser.email);

    // incorrect password
    $('~Password').setValue(`${generatedUser.password}2`);
    $('~LoginButton').click();

    errorText = getTextFromToast();
    expect(errorText).toEqual('Incorrect password');

    // password too long
    $('~Password').setValue(longPassword);
    $('~LoginButton').click();

    errorText = getTextFromToast();
    expect(errorText).toEqual('Password must be between 8 and 100 characters');

    // password too short
    $('~Password').setValue(shortPassword);
    $('~LoginButton').click();

    errorText = getTextFromToast();
    expect(errorText).toEqual('Password must be between 8 and 100 characters');

    $('~Email').clearValue();
    $('~Password').clearValue();
  });

  it('Cannot login with invalid email', () => {
    let errorText;
    $('~Email').isDisplayed();
    $('~Password').isDisplayed();

    $('~Password').setValue(generatedUser.password);

    // invalid email format
    $('~Email').setValue('invalidformat');
    $('~LoginButton').click();
    errorText = getTextFromToast();
    expect(errorText).toEqual('Must follow email format');

    // email that is not registered
    $('~Email').setValue(`notregistered_${generatedUser.email}`);
    $('~LoginButton').click();
    errorText = getTextFromToast();
    expect(errorText).toEqual(
      `Account with email notregistered_${generatedUser.email} not found`,
    );
  });
});
