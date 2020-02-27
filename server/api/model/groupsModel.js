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
            return conn.query(
                `
                    INSERT INTO schedulemeup.meeting
                    (MeetingDuration,
                    MeetingFrequency, 
                    MeetingLocation)
                    VALUES (?, ?, ?);
                    
                    INSERT INTO schedulemeup.group
                    (GroupName,
                    GroupDescription,
                    GroupOwnerId,
                    MeetingId)
                    VALUES (?, ?, ?, LAST_INSERT_ID());
                `,
                [mDuration, mFrequency, mLocation, gName, gDesc, gOwnerId]
            ).then(res => {
                conn.end();
                return res[1].insertId;
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
                    FROM schedulemeup.group as G, schedulemeup.meeting as M, schedulemeup.groupmember as GM
                    WHERE G.MeetingId = M.MeetingId AND GM.GroupId = G.GroupId AND GM.UserId = ?;
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
                    FROM schedulemeup.group as G, schedulemeup.meeting as M 
                    WHERE G.MeetingId = M.MeetingId AND G.GroupId = ?;
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
                    SET @meetingId = (SELECT MeetingId FROM schedulemeup.group WHERE GroupId = ?);

                    DELETE FROM schedulemeup.group
                    WHERE GroupId = ?;

                    DELETE FROM schedulemeup.meeting
                    WHERE MeetingId = @meetingId;
                `,
                [groupId, groupId]
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
                    INSERT INTO schedulemeup.groupmember (GroupId, UserId, MemberRole) 
                    SELECT ?, ?, ? FROM DUAL 
                    WHERE NOT EXISTS (SELECT * FROM schedulemeup.groupmember
                        WHERE GroupId = ? AND UserId = ? LIMIT 1)
                `,
                [groupId, userId, role, groupId, userId]
            ).then(res => {
                conn.end();
                return res.insertId;
            }).catch(err => {
                conn.end();
                return err;
            });
        });
    },

    getGroupMembers(groupId) {
        return mysql.createConnection(MYSQLDB).then(conn => {
            return conn.query(
                `
                    SELECT *
                    FROM schedulemeup.groupmember
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
    }
};