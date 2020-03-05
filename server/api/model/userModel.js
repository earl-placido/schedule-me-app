const mysql = require("promise-mysql");
const bcrypt = require('bcrypt');

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME
};

const SALT_ROUNDS = 12;

module.exports = {
    createUser(userEmail, userPassword) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return bcrypt.hash(userPassword, SALT_ROUNDS).then(hash => {
                return conn.query(
                    `
                        INSERT INTO \`User\`
                        (UserEmail, UserPassword)
                        VALUES (?, ?)
                    `, 
                    [userEmail, hash]
                ).then(res => {
                    conn.end();
                    return res.insertId;
                }).catch(err => {
                    conn.end();
                    return err;
                });
            });
        });
    },

    createGoogleUser(userName, userEmail, OAuthProvider, OAuthUID) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    INSERT INTO \`User\`
                    (UserName,
                     UserEmail,
                     OAuthProvider,
                     OAuthUID)
                    VALUES (?, ?, ?, ?)
                `,
                [userName, userEmail, OAuthProvider, OAuthUID]
            ).then(res => {
                conn.end();
                return res.insertId;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    getUserByEmail(userEmail) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    SELECT * FROM \`User\` WHERE UserEmail = ?
                `, 
                [userEmail]
            ).then(res => {
                conn.end();
                return res;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    validateUser(userEmail, userPassword) {
        return mysql
            .createConnection(MYSQLDB)
            .then(conn => {
                const result = conn.query(
                    `
                        SELECT UserId, UserEmail, UserPassword, OAuthProvider
                        FROM \`User\`   
                        WHERE UserEmail = ?;
                    `, [userEmail]);
                conn.end();
                return result;
            }).then( async (user) => {
                let returnObject = {};

                const userData = user[0];
                if (userData === undefined || userData.length == 0) {
                    returnObject = {
                        isValid: false,
                        msg: `Account with email ${userEmail} not found`
                    };
                }
                else if (userData.OAuthProvider != 'none') {
                    returnObject = {
                        isValid: false,
                        msg: `User is a ${userData.OAuthProvider} user. Please login through ${userData.OAuthProvider}`
                    }
                }
                else {
                    let res = await comparePasswordAsync(userPassword, userData.UserPassword);

                    returnObject = {
                        userId: userData.UserId,
                        isValid: res,
                        msg: res ? 'Login successful' : 'Incorrect password'
                    };
                }

                return returnObject;
        });
    }
}

async function comparePasswordAsync(userPassword, saltedPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(userPassword, saltedPassword, function(err, res) {
            if (err) {
                reject(err);
            } 
            else {
                resolve(res);
            }
        });
    });
}