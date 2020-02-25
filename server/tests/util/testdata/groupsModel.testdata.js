

const users = [
    {
        userName: "User1"
    },
    {
        userName: "User2"
    },
    {
        userName: "User3"
    }
];

const groups = [
    {
        groupName: "TestGroup1",
        groupDescription: "Group description",
        groupOwnerId: 1,
        meetingDuration: "01:00:00",
        meetingFrequency: "1w",
        meetingLocation: "ChIJrTLr-GyuEmsRBfy61i59si0"
    },
    {
        groupName: "TestGroup2",
        groupDescription: "Group description",
        groupOwnerId: 2,
        meetingDuration: "01:00:00",
        meetingFrequency: "1w",
        meetingLocation: "ChIJrTLr-GyuEmsRBfy61i59si0"
    }
];

const groupMembers = [
    {
        groupId: 1000001,
        userId: 1,
        memberRole: 'AD'   
    }
];

module.exports = {
    users,
    groups,
    groupMembers
}