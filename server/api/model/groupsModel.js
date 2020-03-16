const mysql = require("promise-mysql");

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  multipleStatements: true
};

module.exports = {
  newGroup(gName, gDesc, gOwnerId, mDuration, mFrequency, mLocation) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
                INSERT INTO \`Group\`
                (GroupName,
                GroupDescription,
                GroupOwnerId)
                VALUES (?, ?, ?);
                
                INSERT INTO \`Meeting\`
                (MeetingDuration,
                MeetingFrequency, 
                MeetingLocation,
                GroupId)
                VALUES (?, ?, ?,  LAST_INSERT_ID());
            `,
          [gName, gDesc, gOwnerId, mDuration, mFrequency, mLocation]
        )
        .then(res => {
          conn.end();
          return res[0].insertId;
        })
        .catch(err => {
          conn.end();
          return err;
        });
    });
  },

  getGroupsFromUserId(userId) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
                    SELECT *
                    FROM \`Group\` as G, \`Meeting\` as M, \`GroupMember\` as GM
                    WHERE G.GroupId = M.GroupId AND GM.GroupId = G.GroupId AND GM.UserId = ?;
                `,
          [userId]
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

  getGroupFromGroupId(groupId) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
                    SELECT *
                    FROM \`Group\` as G, \`Meeting\` as M 
                    WHERE G.GroupId = M.GroupId AND G.GroupId = ?;
                `,
          [groupId]
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

  deleteGroup(groupId) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
                DELETE FROM \`Group\`
                WHERE GroupId = ?;
            `,
          [groupId]
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

  newMember(groupId, userId, role) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
                    INSERT INTO \`GroupMember\` (GroupId, UserId, MemberRole) 
                    SELECT ?, ?, ? FROM DUAL 
                    WHERE NOT EXISTS (SELECT * FROM \`GroupMember\`
                        WHERE GroupId = ? AND UserId = ? LIMIT 1)
                `,
          [groupId, userId, role, groupId, userId]
        )
        .then(res => {
          conn.end();
          return res.insertId;
        })
        .catch(err => {
          conn.end();
          return err;
        });
    });
  },

  getGroupMembers(groupId) {
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
            SELECT G.GroupId, G.GroupMemberId, U.UserFName, U.UserLName, U.UserEmail
            FROM \`User\` as U RIGHT JOIN \`GroupMember\` as G
            ON G.UserId = U.UserId
            WHERE G.GroupId = ? 
                `,
          [groupId]
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

  getGroupMemberAvailabilities(groupId){
    return mysql.createConnection(MYSQLDB).then(conn => {
      return conn
        .query(
          `
            SELECT G.GroupMemberId, A.AvailabilityId, CAST(A.StartTime as char), CAST(A.EndTime as char)
            FROM \`GroupMember\` as G INNER JOIN \`Availability\` as A
            ON G.GroupMemberId = A.GroupMemberId
            WHERE G.GroupId = ? 
                `,
          [groupId]
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
  }
};
