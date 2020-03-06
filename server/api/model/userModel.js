const mysql = require("promise-mysql");
const bcrypt = require("bcrypt");

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME
};

const SALT_ROUNDS = 12;

module.exports = {
  createUser(email, password, firstName, lastName) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return bcrypt.hash(password, SALT_ROUNDS).then(hash => {
        return conn
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
            conn.end();
            return res.insertId;
          })
          .catch(err => {
            conn.end();
            return { error: err };
          });
      });
    });
  },

  createGoogleUser(userEmail, firstName, lastName, OAuthProvider, OAuthUID) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
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
          conn.end();
          return res.insertId;
        })
        .catch(err => {
          conn.end();
          return { error: err };
        });
    });
  },

  getUserByEmail(email) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
            SELECT * FROM \`User\` WHERE UserEmail = ?
          `,
          [email]
        )
        .then(res => {
          conn.end();
          return res;
        })
        .catch(err => {
          conn.end();
          return { error: err };
        });
    });
  },

  validateUser(email, password) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
            SELECT *
            FROM \`User\`   
            WHERE UserEmail = ?;
          `,
          [email]
        )
        .then(res => {
          conn.end();
          return res;
        })
        .then(async user => {
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
        })
        .catch(err => {
          conn.end();
          return { error: err };
        });
    });
  }
};

async function comparePasswordAsync(password, saltedPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, saltedPassword, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
