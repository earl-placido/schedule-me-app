const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12;

module.exports = (mysql, comparePasswordAsync) => {
  const userModel = {};

  userModel.createUser = (email, password, firstName, lastName) => {
    return bcrypt.hash(password, SALT_ROUNDS).then(hash => {
      return mysql
        .query(
          `
              INSERT INTO \`User\`
              (UserEmail, 
                UserPassword,
                UserFName,
                UserLName)
              VALUES (?, ?, ?, ?)
            `,
          [email, hash, firstName, lastName]
        )
        .then(res => {
          if (res.errno) {
            return { error: res.sqlMessage };
          } else {
            return res.insertId;
          }
        });
    });
  };

  userModel.createGoogleUser = (
    userEmail,
    firstName,
    lastName,
    OAuthProvider,
    OAuthUID
  ) => {
    return mysql
      .query(
        `
            INSERT INTO \`User\`
            (UserEmail,
              UserFName,
              UserLName,
              OAuthProvider,
              OAuthUID)
            VALUES (?, ?, ?, ?, ?)
          `,
        [userEmail, firstName, lastName, OAuthProvider, OAuthUID]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res.insertId;
        }
      });
  };

  userModel.getUserByEmail = email => {
    return mysql
      .query(
        `
            SELECT * FROM \`User\` WHERE UserEmail = ?
          `,
        [email]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  userModel.getUserByUserId = userId => {
    return mysql
      .query(
        `
            SELECT UserFName, UserLName, UserEmail FROM \`User\` WHERE UserId = ?
          `,
        [userId]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  userModel.validateUser = (email, password) => {
    return mysql
      .query(
        `
            SELECT *
            FROM \`User\`   
            WHERE UserEmail = ?;
          `,
        [email]
      )
      .then(async user => {
        if (user.errno) {
          return { error: user.sqlMessage };
        } else {
          let response = {};

          const userData = user[0];

          // check if there is a user with specified email exists
          if (userData === undefined || userData.length == 0) {
            response = {
              isValid: false,
              msg: `Account with email ${email} not found`
            };
          } //check if email is attached to a social login user
          else if (userData.OAuthProvider != "none") {
            response = {
              isValid: false,
              msg: `${email} is attached to a ${userData.OAuthProvider} user. Please login through ${userData.OAuthProvider}`
            };
          } else {
            let isPasswordValid = await comparePasswordAsync(
              password,
              userData.UserPassword
            );

            response = {
              userId: userData.UserId,
              email: userData.UserEmail,
              firstName: userData.UserFName,
              lastName: userData.UserLName,
              isValid: isPasswordValid,
              msg: isPasswordValid ? "Login successful" : "Incorrect password"
            };
          }

          return response;
        }
      });
  };

  return userModel;
};
