require('dotenv').config();
const mysql = require('promise-mysql');
const testUtil = require('../util/testUtil');
const groupsModel = require('../../api/model/groupsModel');
const groupsData = require('../util/testdata/groupsModel.testdata');

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  multipleStatements: true
};

beforeAll(() => {
    return mysql.createConnection(MYSQLDB).then(conn => {
    const result = conn.query(
        testUtil.insertUsersQuery(groupsData.users) +
        testUtil.insertGroupsQuery(groupsData.groups) +
        testUtil.insertGroupMembersQuery(groupsData.groupMembers)
    );
    conn.end();
    return result;
  });
});

afterAll(() => {
  return mysql.createConnection(MYSQLDB).then(conn => {
    const result = conn.query(
        `
            SET FOREIGN_KEY_CHECKS=0;
            TRUNCATE TABLE schedulemeup.user;
            TRUNCATE TABLE schedulemeup.group;
            TRUNCATE TABLE schedulemeup.groupmember;
            SET FOREIGN_KEY_CHECKS=1;
        `
    );
    conn.end();
    return result;
  });
});

describe(`newGroup tests `, () => {
    it(`Returns the correct groupId when creating a new group`, () => {
        groupsModel.newGroup(
            
        ).then(result => {
            console.log(result);
        });
    });
});

afterAll(() => {
    console.log("This will run after the tests.");
});