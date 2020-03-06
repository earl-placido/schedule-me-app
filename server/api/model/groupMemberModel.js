const mysql = require('promise-mysql');

const MYSQLDB = {
    host: process.env.RDS_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.RDS_DB_NAME,
    multipleStatements: true
  };

  
module.exports = {
    getGroupMemberId(groupId, userId) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                SELECT GroupMemberId FROM \`GroupMember\` WHERE GroupId = ? AND UserId = ?;
                `,
                [groupId, userId]
            ).then(res => {
                conn.end();
                return res;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    }
};