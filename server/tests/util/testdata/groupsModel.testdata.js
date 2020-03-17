const users = [
  {
    email: "catto@email.com",
    password: "$2b$12$t9A5pwXCGRAk7mMxlkKZuuePuBNDrh75knRUPliFyWUdL1.Q4cyPW",
    firstName: "John",
    lastName: "Doe",
    oAuthProvider: "none",
    oAuthUID: null
  },
  {
    email: "doggo@gmail.com",
    password: "$2b$12$t9A5pwXCGRAk7mMxlkKZuuePuBNDrh75knRUPliFyWUdL1.Q4cyPW",
    firstName: "NotJohn",
    lastName: "NotDoe",
    oAuthProvider: "google",
    oAuthUID: 109614695133908857889
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

const availabilities = [
  [1, ["2020-03-11 5:00", "2020-03-11 7:00"]],
  [1, ["2020-03-12 1:00", "2020-03-12 4:00"]],
  [1, ["2020-03-12 1:00", "2020-03-12 4:00"]],
  [1, ["2020-03-12 2:00", "2020-03-12 3:00"]],
  [1, ["2020-03-14 1:00", "2020-03-14 3:00"]],
  [1, ["2020-03-14 2:00", "2020-03-14 3:00"]],
];

module.exports = {
  users,
  groups,
  groupMembers,
  availabilities
};
