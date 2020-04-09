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
                    SELECT AvailabilityId, CAST(StartTime as char), CAST(EndTime as char) FROM 
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
    // check is made in router to ensure they are all same length
    let query = `
      ${availabilityIds
        .map((availabilityId, index) => {
          let availabilityQuery;
          if (availabilityId === -1) {
            availabilityQuery = mysql.format(
              `INSERT INTO \`Availability\` (GroupMemberId, StartTime, EndTime) VALUES (?, ?, ?);`,
              [groupMemberId, startTimes[index], endTimes[index]]
            );
          } else {
            availabilityQuery = mysql.format(
              `UPDATE \`Availability\` SET StartTime=?, EndTime=? WHERE AvailabilityId=?;`,
              [startTimes[index], endTimes[index], availabilityId]
            );
          }

          return availabilityQuery;
        })
        .join(`\n`)}
      `;

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
    // check is made in router to ensure they are all same length
    let query = `
      ${availabilityIds
        .map(availabilityId =>
          mysql.format(`DELETE FROM \`Availability\` WHERE AvailabilityId=?;`, [
            availabilityId
          ])
        )
        .join(`\n`)}`;

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
  }
};
