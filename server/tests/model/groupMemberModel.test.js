const sqlService = require("../../api/container/services/sqlService");
const groupmemberModel = require("../../api/model/groupMemberModel");

jest.mock("../../api/container/services/sqlService");

describe("test group member model", () => {
  it("returns the correct group member id", async () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          GroupMemberId: 1
        }
      ]);
    });

    const groupId = 1000000;
    const userId = 1;
    const data = await groupmemberModel(sqlService).getGroupMemberId(
      groupId,
      userId
    );
    expect(data[0].GroupMemberId).toEqual(1);
  });

  it("returns error when getting group member id", async () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const groupId = 1000000;
    const userId = 1;
    const data = await groupmemberModel(sqlService).getGroupMemberId(
      groupId,
      userId
    );
    expect(data.error).toEqual("sql error");
  });
});
