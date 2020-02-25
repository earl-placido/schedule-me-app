const mysql = require('promise-mysql');

function insertUsersQuery(users) {
    return (
        `
            INSERT INTO schedulemeup.user (UserName) VALUES
            ${users.map(user => mysql.format(`
                (?) 
            `, 
            [
                user.userName
            ])).join(`, `)};
        
        `
    );
}

function insertGroupsQuery(groups) {
    return (
        `
        ${groups.map(group => mysql.format(`
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
        [
            group.meetingDuration,
            group.meetingFrequency,
            group.meetingLocation,
            group.groupName,
            group.groupDescription,
            group.groupOwnerId
        ])).join(`\n`)}
        `
    );
}

function insertGroupMembersQuery(groupMembers) {
    return (
        `
            INSERT INTO schedulemeup.groupmember (GroupId, UserId, MemberRole) VALUES
            ${groupMembers.map(groupMember => mysql.format(`
                (?, ?, ?)
            `, 
            [
                groupMember.groupId,
                groupMember.userId,
                groupMember.memberRole
            ])).join(`, `)};
        
        `
    );
}

module.exports = {
    insertUsersQuery,
    insertGroupsQuery,
    insertGroupMembersQuery
}