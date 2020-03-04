const mysql = require("promise-mysql");

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME
};

module.exports = {
    newUser(userName, userEmail) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    INSERT INTO schedulemeup.user
                    (UserName,
                     UserEmail)
                    VALUES (?, ?)
                `,
                [userName, userEmail]
            ).then(res => {
                conn.end();
                return res.insertId;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    getUser(userEmail) {
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
    }
}