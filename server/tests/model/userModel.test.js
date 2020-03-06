require("dotenv").config();
const mysql = require("promise-mysql");
const testUtil = require("../util/testUtil");
const userModel = require("../../api/model/userModel");
const data = require("../util/testdata/userModel.testdata");

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  multipleStatements: true
};

let numOfUsersAdded = 0;

beforeAll(() => {
  return mysql.createConnection(MYSQLDB).then(conn => {
    const query = testUtil.insertUsersQuery(data.users);
    const result = conn.query(query);
    conn.end();
    return result;
  });
});

afterAll(() => {
  return mysql.createConnection(MYSQLDB).then(conn => {
    const query = `
      SET FOREIGN_KEY_CHECKS=0;
      ${testUtil.resetUsersQuery}
      SET FOREIGN_KEY_CHECKS=1;
    `;
    const result = conn.query(query);
    conn.end();
    return result;
  });
});

describe(`createUser tests`, () => {
  it(`Returns correct userId when creating a new user`, () => {
    let newEmail = "correctID@createUser.com";
    let newPassword = "password";
    let newFName = "john";
    let newLName = "doe";

    numOfUsersAdded++;
    const expectedID = data.users.length + numOfUsersAdded;
    return userModel
      .createUser(newEmail, newPassword, newFName, newLName)
      .then(generatedUserId => {
        expect(generatedUserId).toBe(expectedID);
      });
  });

  it(`Returns error when given missing data`, () => {
    let newEmail = "error@createUser.com";
    let newPassword = "password";
    let newFName = "john";

    return userModel
      .createUser(newEmail, newPassword, newFName)
      .then(err => {
        expect(err).toHaveProperty("error");
      });
  });
});

describe(`createGoogleUser tests`, () => {
  it(`Returns correct userId when creating a new user`, () => {
    let newEmail = "googleUser@createGoogleUser.com";
    let newFName = "john";
    let newLName = "doe";
    let newOAuthProvider = "google";
    let newOAuthUID = 109614695133908857889;

    numOfUsersAdded++;
    const expectedID = data.users.length + numOfUsersAdded;
    return userModel
      .createGoogleUser(newEmail, newFName, newLName, newOAuthProvider, newOAuthUID)
      .then(generatedUserId => {
        expect(generatedUserId).toBe(expectedID);
      });
  });

  it(`Returns error when given missing data`, () => {
    let newEmail = "googleUser@createGoogleUser.com";
    let newFName = "john";
    let newLName = "doe";
    let newOAuthProvider = "google";

    return userModel
      .createGoogleUser(newEmail, newFName, newLName, newOAuthProvider)
      .then(err => {
        expect(err).toHaveProperty("error");
      });
  });
});

describe(`getUserByEmail tests`, () => {
  it(`Returns the correct user`, () => {
    let user = data.users[0];
    return userModel
      .getUserByEmail(user.email)
      .then(receivedUser => {
        expect(receivedUser[0].UserFName).toBe(user.firstName);
        expect(receivedUser[0].UserLName).toBe(user.lastName);
        expect(receivedUser[0].UserEmail).toBe(user.email);
        expect(receivedUser[0].UserPassword).toBe(user.password);
        expect(receivedUser[0].OAuthProvider).toBe(user.oAuthProvider);
      });
  });
});

describe(`validateUser tests`, () => {
  it(`Returns email not found`, () => {
    let email = 'notFound@email.com';
    let password = 'password';

    return userModel
      .validateUser(email, password)
      .then(response => {
        expect(response.isValid).toBe(false);
        expect(response.msg).toBe(`Account with email ${email} not found`);
      });
  });

  it(`Returns account attached to oAuth provider`, () => {
    let email = data.users[1].email;
    let password = '';
    let expectedOAuthProvider = data.users[1].oAuthProvider;

    return userModel
      .validateUser(email, password)
      .then(response => {
        expect(response.isValid).toBe(false);
        expect(response.msg).toBe(`${email} is attached to a ${expectedOAuthProvider} user. Please login through ${expectedOAuthProvider}`);
      });
  });

  it(`Returns incorrect password`, () => {
    let email = data.users[0].email;
    let password = 'incorrectpassword';

    return userModel
      .validateUser(email, password)
      .then(response => {
        expect(response.isValid).toBe(false);
        expect(response.msg).toBe(`Incorrect password`);
      });
  });

  it(`Returns login successful`, () => {
    let email = data.users[0].email;
    let password = 'password';

    return userModel
      .validateUser(email, password)
      .then(response => {
        expect(response.isValid).toBe(true);
        expect(response.msg).toBe(`Login successful`);
      });
  });
});