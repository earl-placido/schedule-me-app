describe('Test register functionality', () => {
  var generatedUser;

  beforeAll(() => {
    // generate a random user
    generatedUser = {
      fName: `fName_${Math.random()
        .toString(36)
        .slice(2)}`,
      lName: `Name_${Math.random()
        .toString(36)
        .slice(2)}`,
      email: `${Math.random()
        .toString(36)
        .slice(2)}@email.com`,
      password: Math.random()
        .toString(36)
        .slice(2),
    };
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
    $('~LogoutButton').click();
  });

  it('Cannot create user with empty form', () => {
    $('~HomeContainer').waitForExist();
    $('~SignupButton').click();

    $('~First name').clearValue();
    $('~Last name').clearValue();
    $('~Email').clearValue();
    $('~Password').clearValue();
    $('~Confirm password').clearValue();

    $('~SignupSubmitButton').click();
  });
});
