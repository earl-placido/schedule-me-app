const mysql = require("promise-mysql");

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME
};

module.exports = {
    newGroup(gOwnerId, gName, gDesc, mDuration, mFrequency, mLocation) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    INSERT INTO schedulemeup.groups
                    (GroupName,
                     GroupDescription,
                     GroupOwnerId,
                     MeetingDuration,
                     MeetingFrequency,
                     MeetingLocation)
                    VALUES (?, ?, ?, ?, ?, ?)
                `,
                [gName, gDesc, gOwnerId, mDuration, mFrequency, mLocation]
            ).then(res => {
                conn.end();
                return res.insertId;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    getGroupsFromUserId(userId) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    SELECT * 
                    FROM schedulemeup.groupmembers as GM, schedulemeup.groups as G 
                    WHERE GM.GroupId = G.GroupId AND GM.UserId = ?;
                `,
                [userId]
            ).then(res => {
                conn.end();
                return res;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    getGroupFromGroupId(groupId) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    SELECT * 
                    FROM schedulemeup.groups
                    WHERE GroupId = ?;
                `,
                [groupId]
            ).then(res => {
                conn.end();
                return res;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    deleteGroup(groupId) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    DELETE FROM schedulemeup.groups
                    WHERE GroupId = ?
                `,
                [groupId]
            ).then(res => {
                conn.end();
                return res;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    newMember(groupId, userId, role) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    INSERT INTO schedulemeup.groupmembers
                    (GroupId, UserId, MemberRole)
                    VALUES
                    (?, ?, ?)
                `,
                [groupId, userId, role]
            ).then(res => {
                conn.end();
                return res.insertId;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    }
};