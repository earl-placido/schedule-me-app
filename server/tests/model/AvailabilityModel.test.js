require("dotenv").config();
const mysql = require("promise-mysql");
const testUtil = require("../util/testUtil");
const availabilityModel = require("../../api/model/AvailabilityModel");
const data = require("../util/testdata/AvailabilityModel.testdata");

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  multipleStatements: true
};

describe("test availability model", () => {
  beforeAll(async () => {
    const conn = await mysql.createConnection(MYSQLDB);
    const query =
      testUtil.insertUsersQuery(data.users) +
      testUtil.insertGroupsQuery(data.groups) +
      testUtil.insertGroupMembersQuery(data.groupMembers) +
      testUtil.insertAvailabilityQuery(data.availabilities);
    const result = conn.query(query);
    conn.end();
    return result;
  });

  afterAll(async () => {
    const conn = await mysql.createConnection(MYSQLDB);
    const query = `
                SET FOREIGN_KEY_CHECKS=0;
                ${testUtil.resetUsersQuery}
                ${testUtil.resetGroupsQuery}
                ${testUtil.resetGroupMembersQuery}
                ${testUtil.resetAvailabilityQuery}
                SET FOREIGN_KEY_CHECKS=1;
            `;
    const result = conn.query(query);
    conn.end();
    return result;
  });

  it("returns the correct availabilityId", async () => {
    const groupMemberId = 1;
    const date = new Date("2020-03-09 16:53:14");
    const data = await availabilityModel.getAvailability(groupMemberId);
    expect(data[0].AvailabilityId).toEqual(1);
    expect(data[0].StartTime.toString()).toEqual(
      date.toString()
    );

    expect(data[1].AvailabilityId).toEqual(2);
    expect(data[1].EndTime.toString()).toEqual(
      date.toString()
    );
  });

  it("add availabilities", async () => {
    const groupMemberId = 1;
    const date = new Date("2020-03-09T21:53:14.000Z");
    const formatted_date =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    const availableInfo = await availabilityModel.addAvailability(
      groupMemberId,
      [-1],
      [formatted_date],
      [formatted_date]
    );
    expect(availableInfo.affectedRows).toEqual(1);
    expect(availableInfo.message).toEqual("");
  });

  it("delete availabilities", async () => {
    const groupMemberId = 1;
    const availabilityInfos = await availabilityModel.getAvailability(
      groupMemberId
    );
    const currentLength = availabilityInfos.length;
    await availabilityModel.deleteAvailability([1]);
    const newAvailabilityInfos = await availabilityModel.getAvailability(
      groupMemberId
    );
    expect(newAvailabilityInfos.length).toEqual(currentLength - 1);
  });
});
