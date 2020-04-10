const mysql = require("promise-mysql");
const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  multipleStatements: true
};

module.exports = {
  query(query, params) {
    if (params === undefined) {
      return mysql.createConnection(MYSQLDB).then(conn => {
        return conn
          .query(query)
          .then(res => {
            conn.end();
            return res;
          })
          .catch(err => {
            conn.end();
            return err;
          });
      });
    } else {
      return mysql.createConnection(MYSQLDB).then(conn => {
        return conn
          .query(query, [...params])
          .then(res => {
            conn.end();
            return res;
          })
          .catch(err => {
            conn.end();
            return err;
          });
      });
    }
  },

  format(query, params) {
    return mysql.format(query, [...params]);
  }
};
