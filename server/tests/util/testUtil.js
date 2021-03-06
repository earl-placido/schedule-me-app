const mysql = require("promise-mysql");

function insertUsersQuery(users) {
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
}

function insertGroupsQuery(groups) {
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
}

function insertGroupMembersQuery(groupMembers) {
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
}

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

module.exports = {
  insertUsersQuery,
  insertGroupsQuery,
  insertGroupMembersQuery,
  resetUsersQuery,
  resetGroupsQuery,
  resetGroupMembersQuery
};
