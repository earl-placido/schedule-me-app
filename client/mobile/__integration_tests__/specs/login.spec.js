const axios = require('axios');
const {generateUser} = require('../util/userUtil');

const createUser = user => {
  axios({
    url: `http://localhost:8000/api/v1/auth/signup`,
    method: 'POST',
    data: {
      firstName: user.fName,
      lastName: user.lName,
      email: user.email,
      password: user.password,
    },
  });
};

const isTextInToast = text => {
  browser.pause(2000); // wait for toast to fully appear

  let isValid = false;
  let textViews = $$('android.widget.TextView');

  textViews.forEach(textView => {
    let thisText = textView.getText();
    if (thisText == text) {
      isValid = true;
    }
  });
  browser.pause(4000); // wait for toast to fully disappear

  return isValid;
};

describe('Test register functionality', () => {
  let generatedUser = generateUser();

  beforeAll(() => {
    createUser(generatedUser);
  });

  it('Can login', () => {
    $('~Email').isDisplayed();
    $('~Password').isDisplayed();

    $('~Email').setValue(generatedUser.email);
    $('~Password').setValue(generatedUser.password);
    $('~Login Button').click();

    $('~Your Groups').waitForDisplayed();
    $('~Menu').click();
    $('~Logout Button').waitForDisplayed();
    $('~Logout Button').click();
    $('~Sign Up Button').waitForDisplayed();
  });

  it('Cannot login with empty form', () => {
    $('~Email').isDisplayed();
    $('~Password').isDisplayed();

    $('~Email').clearValue();
    $('~Password').clearValue();

    $('~Login Button').click();
    browser.waitUntil(
      () => {
        let textViews = $$('android.widget.TextView');
        return (
          textViews[2].getText() == 'Please enter a valid email address' &&
          textViews[4].getText() == 'Please enter your password'
        );
      },
      5000,
      'Expected please input text to appear.',
    );
  });

  it('Cannot login with invalid password', () => {
    let longPassword =
      'longharactersabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    let shortPassword = 'short';

    $('~Email').isDisplayed();
    $('~Password').isDisplayed();
    $('~Email').setValue(generatedUser.email);

    // incorrect password
    $('~Password').setValue(`${generatedUser.password}2`);
    $('~Login Button').click();

    expect(isTextInToast('Incorrect password')).toBeTruthy();

    // password too long
    $('~Password').setValue(longPassword);
    $('~Login Button').click();

    expect(
      isTextInToast('Password must be between 8 and 100 characters'),
    ).toBeTruthy();

    // password too short
    $('~Password').setValue(shortPassword);
    $('~Login Button').click();

    expect(
      isTextInToast('Password must be between 8 and 100 characters'),
    ).toBeTruthy();

    $('~Email').clearValue();
    $('~Password').clearValue();
  });

  it('Cannot login with invalid email', () => {
    $('~Email').isDisplayed();
    $('~Password').isDisplayed();

    $('~Password').setValue(generatedUser.password);

    // invalid email format
    $('~Email').setValue('invalidformat');
    $('~Login Button').click();

    expect(isTextInToast('Must follow email format')).toBeTruthy();

    // email that is not registered
    $('~Email').setValue(`notregistered_${generatedUser.email}`);
    $('~Login Button').click();

    expect(
      isTextInToast(
        `Account with email notregistered_${generatedUser.email} not found`,
      ),
    ).toBeTruthy();
  });
});
