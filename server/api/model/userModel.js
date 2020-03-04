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
            return bcrypt.hash(userPassword, SALT_ROUNDS, (err, hash) => {
                return conn.query(
                `
                    INSERT INTO schedulemeup.user
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
            console.log(`${userName} ${userEmail} ${OAuthProvider}`)
            return conn.query(
                `
                    INSERT INTO schedulemeup.user
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
                    SELECT * FROM schedulemeup.user WHERE UserEmail = ?
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
}