const sqlService = require("../../api/container/services/sqlService");
const { comparePasswordAsync } = require("../../api/util/bcryptHelper");
const userModel = require("../../api/model/userModel");
const { generateUser } = require("../test-utils/userUtil");

jest.mock("../../api/container/services/sqlService");
jest.mock("../../api/util/bcryptHelper");

describe(`createUser tests`, () => {
  it(`Returns correct userId when creating a new user`, () => {
    let newEmail = "correctID@createUser.com";
    let newPassword = "password";
    let newFName = "john";
    let newLName = "doe";

    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        insertId: 1
      });
    });

    const expectedID = 1;
    return userModel(sqlService)
      .createUser(newEmail, newPassword, newFName, newLName)
      .then(generatedUserId => {
        expect(generatedUserId).toBe(expectedID);
      });
  });

  it(`Returns error when given missing data`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    let newEmail = "error@createUser.com";
    let newPassword = "password";
    let newFName = "john";

    return userModel(sqlService)
      .createUser(newEmail, newPassword, newFName)
      .then(err => {
        expect(err).toHaveProperty("error");
      });
  });
});

describe(`createGoogleUser tests`, () => {
  it(`Returns correct userId when creating a new user`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        insertId: 1
      });
    });

    let newEmail = "googleUser@createGoogleUser.com";
    let newFName = "john";
    let newLName = "doe";
    let newOAuthProvider = "google";
    let newOAuthUID = 109614695133908857889;

    const expectedID = 1;

    return userModel(sqlService)
      .createGoogleUser(
        newEmail,
        newFName,
        newLName,
        newOAuthProvider,
        newOAuthUID
      )
      .then(generatedUserId => {
        expect(generatedUserId).toBe(expectedID);
      });
  });

  it(`Returns error when given missing data`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    let newEmail = "error@createUser.com";
    let newPassword = "password";
    let newFName = "john";

    return userModel(sqlService)
      .createGoogleUser(newEmail, newPassword, newFName)
      .then(err => {
        expect(err).toHaveProperty("error");
      });
  });
});

describe(`getUserByEmail tests`, () => {
  it(`Returns the correct user`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          UserFName: generatedUser.fName,
          UserLName: generatedUser.lName,
          UserEmail: generatedUser.email,
          UserPassword: generatedUser.password,
          OAuthProvider: "google"
        }
      ]);
    });

    let generatedUser = generateUser();

    return userModel(sqlService)
      .getUserByEmail(generatedUser.email)
      .then(receivedUser => {
        expect(receivedUser[0].UserFName).toBe(generatedUser.fName);
        expect(receivedUser[0].UserLName).toBe(generatedUser.lName);
        expect(receivedUser[0].UserEmail).toBe(generatedUser.email);
        expect(receivedUser[0].UserPassword).toBe(generatedUser.password);
        expect(receivedUser[0].OAuthProvider).toBe("google");
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    let generatedUser = generateUser();

    return userModel(sqlService)
      .getUserByEmail(generatedUser.email)
      .then(err => {
        expect(err).toHaveProperty("error");
      });
  });
});

describe(`getUserByUserId tests`, () => {
  it(`Returns the correct user information`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          UserFName: generatedUser.fName,
          UserLName: generatedUser.lName,
          UserEmail: generatedUser.email
        }
      ]);
    });

    let generatedUser = generateUser();

    return userModel(sqlService)
      .getUserByUserId(1)
      .then(receivedUser => {
        expect(receivedUser[0].UserFName).toBe(generatedUser.fName);
        expect(receivedUser[0].UserLName).toBe(generatedUser.lName);
        expect(receivedUser[0].UserEmail).toBe(generatedUser.email);
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    return userModel(sqlService)
      .getUserByUserId(1)
      .then(err => {
        expect(err).toHaveProperty("error");
      });
  });
});

describe(`validateUser tests`, () => {
  let generatedUser = generateUser();

  it(`Returns email not found`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({});
    });

    let email = "notFound@email.com";
    let password = "password";

    return userModel(sqlService)
      .validateUser(email, password)
      .then(response => {
        expect(response.isValid).toBe(false);
        expect(response.msg).toBe(`Account with email ${email} not found`);
      });
  });

  it(`Returns account attached to oAuth provider`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          OAuthProvider: "google",
          Email: generatedUser.email
        }
      ]);
    });

    return userModel(sqlService)
      .validateUser(generatedUser.email, generatedUser.password)
      .then(response => {
        expect(response.isValid).toBe(false);
        expect(response.msg).toBe(
          `${generatedUser.email} is attached to a google user. Please login through google`
        );
      });
  });

  it(`Returns incorrect password`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          UserFName: generatedUser.fName,
          UserLName: generatedUser.lName,
          UserEmail: generatedUser.email,
          UserPassword: generatedUser.password,
          OAuthProvider: "none"
        }
      ]);
    });

    comparePasswordAsync.mockImplementation(() => {
      return Promise.resolve(false);
    });

    let password = "incorrectpassword";

    return userModel(sqlService, comparePasswordAsync)
      .validateUser(generatedUser.email, password)
      .then(response => {
        expect(response.isValid).toBe(false);
        expect(response.msg).toBe(`Incorrect password`);
      });
  });

  it(`Returns login successful`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          UserFName: generatedUser.fName,
          UserLName: generatedUser.lName,
          UserEmail: generatedUser.email,
          UserPassword: generatedUser.password,
          OAuthProvider: "none"
        }
      ]);
    });

    comparePasswordAsync.mockImplementation(() => {
      return Promise.resolve(true);
    });

    return userModel(sqlService, comparePasswordAsync)
      .validateUser(generatedUser.email, generatedUser.password)
      .then(response => {
        expect(response.isValid).toBe(true);
        expect(response.msg).toBe(`Login successful`);
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    return userModel(sqlService)
      .validateUser(generatedUser.email, generatedUser.password)
      .then(response => {
        expect(response.error).toEqual("sql error");
      });
  });
});
