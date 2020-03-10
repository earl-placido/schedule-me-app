require("dotenv").config();
const mysql = require("promise-mysql");
const testUtil = require("../util/testUtil");
const groupmemberModel = require("../../api/model/groupMemberModel");
const data = require("../util/testdata/groupsModel.testdata");

const MYSQLDB = {
    host: process.env.RDS_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.RDS_DB_NAME,
    multipleStatements: true
  };


  describe("test group member model", () => {

    beforeAll(async () => {
        const conn = await mysql.createConnection(MYSQLDB);
        const query =
            testUtil.insertUsersQuery(data.users) +
            testUtil.insertGroupsQuery(data.groups) +
            testUtil.insertGroupMembersQuery(data.groupMembers);
        const result = conn.query(query);
        conn.end();
        return result;
        });

    afterAll(async() => {
        const conn = await mysql.createConnection(MYSQLDB);
        const query = `
                SET FOREIGN_KEY_CHECKS=0;
                ${testUtil.resetUsersQuery}
                ${testUtil.resetGroupsQuery}
                ${testUtil.resetGroupMembersQuery}
                SET FOREIGN_KEY_CHECKS=1;
            `;
        const result = conn.query(query);
        conn.end();
        return result;
    });


    it("returns the correct group member id", async() => {
        const groupId = 1000000;
        const userId = 1;
        const data = await groupmemberModel.getGroupMemberId(groupId, userId);
        expect(data[0].GroupMemberId).toEqual(1);

    });

    

});
