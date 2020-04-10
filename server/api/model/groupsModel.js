module.exports = mysql => {
  const groupsModel = {};

  groupsModel.newGroup = (
    gName,
    gDesc,
    gOwnerId,
    mDuration,
    mFrequency,
    mLocation
  ) => {
    return mysql
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
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res[0].insertId;
        }
      });
  };

  groupsModel.getGroupsFromUserId = userId => {
    return mysql
      .query(
        `
                    SELECT *
                    FROM \`Group\` as G, \`Meeting\` as M, \`GroupMember\` as GM
                    WHERE G.GroupId = M.GroupId AND GM.GroupId = G.GroupId AND GM.UserId = ?;
                `,
        [userId]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  groupsModel.getGroupFromGroupId = groupId => {
    return mysql
      .query(
        `
                    SELECT *
                    FROM \`Group\` as G, \`Meeting\` as M 
                    WHERE G.GroupId = M.GroupId AND G.GroupId = ?;
                `,
        [groupId]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  groupsModel.deleteGroup = groupId => {
    return mysql
      .query(
        `
                DELETE FROM \`Group\`
                WHERE GroupId = ?;
            `,
        [groupId]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  groupsModel.newMember = (groupId, userId, role) => {
    return mysql
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
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res.insertId;
        }
      });
  };

  groupsModel.getGroupMembers = groupId => {
    return mysql
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
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  groupsModel.getGroupMemberAvailabilities = groupId => {
    return mysql
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
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  groupsModel.getMeetingByGroupId = groupId => {
    return mysql
      .query(
        `SELECT MeetingId, MeetingDuration FROM \`Meeting\` WHERE GroupId=?`,
        [groupId]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  groupsModel.getOptimalTimeForMeeting = meetingIds => {
    return mysql
      .query(
        `
        SELECT MeetingId, CAST(StartTime as char), CAST(EndTime as char), LastUpdated FROM OptimalAvailability WHERE ${meetingIds
          .map(meetingId => `MeetingId=${meetingId}`)
          .join(" OR ")};
        `,
        [meetingIds]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  groupsModel.setOptimalTimeForMeeting = (meetingId, startTime, endTime) => {
    return mysql
      .query(
        `
        SELECT * FROM OptimalAvailability WHERE Meetingid=?;
        `,
        [meetingId]
      )
      .then(res => {
        let query = "";
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          if (res.length === 0) {
            query = `INSERT into \`OptimalAvailability\` (StartTime, EndTime, MeetingId) VALUES (?, ?, ?)`;
          } else {
            query = `UPDATE \`OptimalAvailability\` SET StartTime=?, EndTime=? WHERE MeetingId=?`;
          }
          return mysql
            .query(query, [startTime, endTime, meetingId])
            .then(res => {
              if (res.errno) {
                return { error: res.sqlMessage };
              } else {
                return res;
              }
            });
        }
      });
  };

  return groupsModel;
};
