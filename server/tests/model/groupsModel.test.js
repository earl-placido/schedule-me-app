const sqlService = require("../../api/container/services/sqlService");
const groupsModel = require("../../api/model/groupsModel");
const { generateGroup } = require("../test-utils/groupUtil");

jest.mock("../../api/container/services/sqlService");

describe(`newGroup tests `, () => {
  it(`Returns the correct groupId when creating a new group`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([{ insertId: 1 }]);
    });

    const expectedID = 1;
    const currUser = 2;
    return groupsModel(sqlService)
      .newGroup(
        "New Group",
        "New Group Description",
        currUser,
        "01:00",
        "1w",
        "ChIJrTLr-GyuEmsRBfy61i59si0"
      )
      .then(generatedGroupId => {
        expect(generatedGroupId).toBe(expectedID);
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const currUser = 2;
    return groupsModel(sqlService)
      .newGroup(
        "New Group",
        "New Group Description",
        currUser,
        "01:00",
        "1w",
        "ChIJrTLr-GyuEmsRBfy61i59si0"
      )
      .then(result => {
        expect(result.error).toEqual("sql error");
      });
  });
});

describe(`getGroupsFromUserId tests `, () => {
  it(`Returns the correct groups for the user`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          GroupId: 1000000
        }
      ]);
    });

    const currUserId = 1;
    const groupId = 1000000;

    return groupsModel(sqlService)
      .getGroupsFromUserId(currUserId)
      .then(groups => {
        expect(groups).toHaveLength(1);
        expect(groups[0].GroupId).toBe(groupId);
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const currUserId = 2;

    return groupsModel(sqlService)
      .getGroupsFromUserId(currUserId)
      .then(result => {
        expect(result.error).toEqual("sql error");
      });
  });
});

describe(`getGroupFromGroupId tests `, () => {
  it(`Returns the correct group`, () => {
    let generatedGroup = generateGroup();
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          GroupId: 1000001,
          GroupName: generatedGroup.groupName,
          GroupDescription: generatedGroup.groupDesc
        }
      ]);
    });

    return groupsModel(sqlService)
      .getGroupFromGroupId(1000001)
      .then(group => {
        expect(group).toHaveLength(1);
        expect(group[0].GroupId).toBe(1000001);
        expect(group[0].GroupName).toEqual(generatedGroup.groupName);
        expect(group[0].GroupDescription).toEqual(generatedGroup.groupDesc);
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const currGroupId = 1234567;

    return groupsModel(sqlService)
      .getGroupFromGroupId(currGroupId)
      .then(result => {
        expect(result.error).toEqual("sql error");
      });
  });
});

describe("getGroupMemberAvailabilities tests", () => {
  it("return the groupMember format correctly", () => {
    const expectedValue = [
      {
        "CAST(A.EndTime as char)": "2020-03-11 07:00:00",
        AvailabilityId: 1,
        "CAST(A.StartTime as char)": "2020-03-11 05:00:00",
        GroupMemberId: 1
      },
      {
        AvailabilityId: 2,
        "CAST(A.EndTime as char)": "2020-03-12 04:00:00",
        "CAST(A.StartTime as char)": "2020-03-12 01:00:00",
        GroupMemberId: 1
      },
      {
        AvailabilityId: 3,
        "CAST(A.EndTime as char)": "2020-03-12 04:00:00",
        "CAST(A.StartTime as char)": "2020-03-12 01:00:00",
        GroupMemberId: 1
      },
      {
        AvailabilityId: 4,
        "CAST(A.EndTime as char)": "2020-03-12 03:00:00",
        "CAST(A.StartTime as char)": "2020-03-12 02:00:00",
        GroupMemberId: 1
      },
      {
        AvailabilityId: 5,
        "CAST(A.EndTime as char)": "2020-03-14 03:00:00",
        "CAST(A.StartTime as char)": "2020-03-14 01:00:00",
        GroupMemberId: 1
      },
      {
        AvailabilityId: 6,
        "CAST(A.EndTime as char)": "2020-03-14 03:00:00",
        "CAST(A.StartTime as char)": "2020-03-14 02:00:00",
        GroupMemberId: 1
      }
    ];

    sqlService.query.mockImplementation(() => {
      return Promise.resolve(expectedValue);
    });

    return groupsModel(sqlService)
      .getGroupMemberAvailabilities(1000000)
      .then(availabilities => {
        expect(availabilities).toEqual(expectedValue);
      });
  });
});

describe(`deleteGroup tests `, () => {
  it(`Specified group is deleted`, () => {
    sqlService.query
      .mockImplementationOnce(() => {
        return Promise.resolve([{}]);
      })
      .mockImplementationOnce(() => {
        return Promise.resolve([{}]);
      })
      .mockImplementationOnce(() => {
        return Promise.resolve([]);
      });

    const deletedGroupId = 1000000;

    return groupsModel(sqlService)
      .getGroupFromGroupId(deletedGroupId)
      .then(deletedGroup => expect(deletedGroup).toHaveLength(1))
      .then(() => {
        return groupsModel(sqlService).deleteGroup(deletedGroupId);
      })
      .then(() => {
        return groupsModel(sqlService)
          .getGroupFromGroupId(deletedGroupId)
          .then(deletedGroup => expect(deletedGroup).toHaveLength(0));
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const deletedGroupId = 1234567;

    return groupsModel(sqlService)
      .deleteGroup(deletedGroupId)
      .then(result => expect(result.error).toEqual("sql error"));
  });
});

describe(`newMember tests `, () => {
  it(`New member is added to group`, () => {
    sqlService.query
      .mockImplementationOnce(() => {
        return Promise.resolve([{}]);
      })
      .mockImplementationOnce(() => {
        return Promise.resolve([{}]);
      })
      .mockImplementationOnce(() => {
        return Promise.resolve([{}, {}]);
      });

    const currGroupId = 1000001;
    const newMemberId = 2;

    return groupsModel(sqlService)
      .getGroupMembers(currGroupId)
      .then(groupMembers => expect(groupMembers).toHaveLength(1))
      .then(() => {
        return groupsModel(sqlService).newMember(
          currGroupId,
          newMemberId,
          "AD"
        );
      })
      .then(() => {
        return groupsModel(sqlService)
          .getGroupMembers(currGroupId)
          .then(groupMembers => expect(groupMembers).toHaveLength(2));
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const currGroupId = 1000001;
    const newMemberId = 2;
    return groupsModel(sqlService)
      .newMember(currGroupId, newMemberId, "AD")
      .then(result => expect(result.error).toEqual("sql error"));
  });
});

describe(`getGroupMembersFromGroupId tests `, () => {
  it(`Returns the correct groupMembers from group`, () => {
    const currGroupId = 1000001;
    const groupMembers = [
      {
        GroupId: 1000001,
        UserId: 1,
        MemberRole: "AD"
      },
      {
        GroupId: 1000001,
        userId: 2,
        memberRole: "U"
      }
    ];

    sqlService.query.mockImplementation(() => {
      return Promise.resolve(groupMembers);
    });

    return groupsModel(sqlService)
      .getGroupMembers(currGroupId)
      .then(groupMembers => {
        groupMembers.forEach(groupMember => {
          expect(groupMember.GroupId).toBe(currGroupId);
        });
      });
  });

  it(`Returns error`, () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const currGroupId = 1000001;

    return groupsModel(sqlService)
      .getGroupMembers(currGroupId)
      .then(result => expect(result.error).toEqual("sql error"));
  });
});
