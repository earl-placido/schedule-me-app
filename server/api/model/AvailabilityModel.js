const mysql = require("promise-mysql");

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  multipleStatements: true
};

module.exports = {
  getAvailability(groupMemberId) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
                    SELECT AvailabilityId, StartTime, EndTime FROM 
                    \`Availability\` WHERE GroupMemberId = ?;
                `,
          [groupMemberId]
        )
        .then(res => {
          conn.end();
          return res;
        })
        .catch(err => {
          conn.end();
          return err;
        });
    });
  },
  addAvailability(groupMemberId, availabilityIds, startTimes, endTimes) {
    let query = "";
    // check is made in router to ensure they are all same length
    for (let index = 0; index < availabilityIds.length; index++) {
      query +=
        availabilityIds[index] === -1
          ? `INSERT INTO \`Availability\` (GroupMemberId, StartTime, EndTime) VALUES (${groupMemberId}, '${startTimes[index]}', '${endTimes[index]}');`
          : `UPDATE \`Availability\` SET StartTime='${startTimes[index]}', EndTime='${endTimes[index]}' WHERE AvailabilityId=${availabilityIds[index]};`;
    }
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
  },

  deleteAvailability(availabilityIds) {
    let query = "";
    // check is made in router to ensure they are all same length
    for (let index = 0; index < availabilityIds.length; index++) {
      query += `DELETE FROM \`Availability\` WHERE AvailabilityId=${availabilityIds[index]};`;
    }
    return mysql.createConnection(MYSQLDB).then(conn => {
      conn
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
  }
};
