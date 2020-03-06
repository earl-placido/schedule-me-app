const users = [
  {
    userName: "User1",
    userEmail: "test@email.com"
  },
  {
    userName: "User2",
    userEmail: "test2@email.com"
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
    groupId: 1000000,
    userId: 1,
    memberRole: "AD"
  },
  {
    groupId: 1000001,
    userId: 1,
    memberRole: ""
  }
];

module.exports = {
  users,
  groups,
  groupMembers
};
