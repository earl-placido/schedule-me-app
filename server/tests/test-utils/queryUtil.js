const mysql = require("promise-mysql");

const insertUsersQuery = users => {
  return `
    INSERT INTO \`User\`
    (UserEmail,
      UserPassword,
      UserFName,
      UserLName,
      OAuthProvider,
      OAuthUID)
    VALUES 
    ${users
      .map(user =>
        mysql.format(`(?, ?, ?, ?, ?, ?)`, [
          user.email,
          user.password,
          user.firstName,
          user.lastName,
          user.oAuthProvider,
          user.oAuthUID
        ])
      )
      .join(`, `)}; 
  `;
};

const insertGroupsQuery = groups => {
  return `
        ${groups
          .map(group =>
            mysql.format(
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
              [
                group.groupName,
                group.groupDescription,
                group.groupOwnerId,
                group.meetingDuration,
                group.meetingFrequency,
                group.meetingLocation
              ]
            )
          )
          .join(`\n`)}
        `;
};

const insertGroupMembersQuery = groupMembers => {
  return `
    INSERT INTO \`GroupMember\` (GroupId, UserId, MemberRole) VALUES
    ${groupMembers
      .map(groupMember =>
        mysql.format(`(?, ?, ?)`, [
          groupMember.groupId,
          groupMember.userId,
          groupMember.memberRole
        ])
      )
      .join(`, `)};
  `;
};

const insertAvailabilityQuery = availabilities => {
  return `
  INSERT INTO \`Availability\` (GroupMemberId, StartTime, EndTime) VALUES 
  ${availabilities
    .map(availability =>
      mysql.format(`(?, ?, ?)`, [
        availability[0],
        availability[1][0],
        availability[1][1]
      ])
    )
    .join(`, `)};
  `;
};

const resetUsersQuery = `
  TRUNCATE TABLE \`User\`;
`;

const resetGroupsQuery = `
  TRUNCATE TABLE \`Group\`;
  ALTER TABLE \`Group\` AUTO_INCREMENT = 1000000;
`;

const resetGroupMembersQuery = `
  TRUNCATE TABLE \`GroupMember\`;
`;

const resetAvailabilityQuery = `
  TRUNCATE TABLE \`Availability\`;
`;

const resetMeetingQuery = `
  TRUNCATE TABLE \`Meeting\`;
`;

const resetOptimalAvailabilityQuery = `
  TRUNCATE TABLE \`OptimalAvailability\`;
`;

module.exports = {
  insertUsersQuery,
  insertGroupsQuery,
  insertGroupMembersQuery,
  insertAvailabilityQuery,
  resetUsersQuery,
  resetGroupsQuery,
  resetGroupMembersQuery,
  resetAvailabilityQuery,
  resetMeetingQuery,
  resetOptimalAvailabilityQuery
};
