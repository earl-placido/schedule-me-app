require('dotenv').config();
const mysql = require('promise-mysql');
const testUtil = require('../util/testUtil');
const groupsModel = require('../../api/model/groupsModel');
const data = require('../util/testdata/groupsModel.testdata');

const MYSQLDB = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME,
  multipleStatements: true
};

const INITIAL_GROUP_ID = 1000000;

beforeAll(() => {
    return mysql.createConnection(MYSQLDB).then(conn => {
        const query = testUtil.insertUsersQuery(data.users) +
                    testUtil.insertGroupsQuery(data.groups) +
                    testUtil.insertGroupMembersQuery(data.groupMembers);
        const result = conn.query(query);

        conn.end();
        return result;
    });
});

afterAll(() => {
    return mysql.createConnection(MYSQLDB).then(conn => {
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
});

describe(`newGroup tests `, () => {
    it(`Returns the correct groupId when creating a new group`, () => {
        const expectedID = INITIAL_GROUP_ID + data.groups.length;
        const currUser = 2;
        return groupsModel.newGroup(
            'New Group',
            'New Group Description',
            currUser,
            '01:00',
            '1w',
            'ChIJrTLr-GyuEmsRBfy61i59si0'
        ).then(generatedGroupId => {
            expect(generatedGroupId).toBe(expectedID);
        });
    });
});

describe(`getGroupsFromUserId tests `, () => {
    it(`Returns the correct groups for the user`, () => {
        const currUserId = 1;

        return groupsModel.getGroupsFromUserId(currUserId).then(groups => {
            expect(groups).toHaveLength(data.groupMembers.length);
            groups.forEach((group, i) => {
                expect(group.GroupId).toBe(data.groupMembers[i].groupId);
            });
        });
    });

    it(`Returns nothing when user does not exist`, () => {
        const currUserId = 2;

        return groupsModel.getGroupsFromUserId(currUserId).then(result => {
            expect(result.length).toBe(0);
        });
    });

    it(`Returns nothing when user is not in any groups`, () => {
        const currUserId = 2;

        return groupsModel.getGroupsFromUserId(currUserId).then(result => {
            expect(result.length).toBe(0);
        });
    });
});

describe(`getGroupFromGroupId tests `, () => {
    it(`Returns the correct group`, () => {
        return groupsModel.getGroupFromGroupId(INITIAL_GROUP_ID).then(group => {
            expect(group).toHaveLength(1);
            expect(group[0].GroupId).toBe(INITIAL_GROUP_ID);
            expect(group[0].GroupName).toBe(data.groups[0].groupName);
            expect(group[0].GroupDescription).toBe(data.groups[0].groupDescription);
        });
    });

    it(`Returns nothing when group does not exist`, () => {
        const currGroupId = 1234567;

        return groupsModel.getGroupFromGroupId(currGroupId).then(group => {
            expect(group.length).toBe(0);
        });
    });
});

describe(`deleteGroup tests `, () => {
    it(`Specified group is deleted`, () => {
        const deletedGroupId = 1000000;

        return groupsModel.getGroupFromGroupId(deletedGroupId)
            .then(deletedGroup => expect(deletedGroup).toHaveLength(1))
            .then(() => { return groupsModel.deleteGroup(deletedGroupId)})
            .then(() => { 
                return groupsModel.getGroupFromGroupId(deletedGroupId)
                .then(deletedGroup => expect(deletedGroup).toHaveLength(0))
            });
    });

    it(`Non-existent group is not deleted`, () => {
        const deletedGroupId = 1234567;

        return groupsModel.getGroupFromGroupId(deletedGroupId)
            .then(deletedGroup => expect(deletedGroup).toHaveLength(0))
            .then(() => { return groupsModel.deleteGroup(deletedGroupId)})
            .then(() => { 
                return groupsModel.getGroupFromGroupId(deletedGroupId)
                .then(deletedGroup => expect(deletedGroup).toHaveLength(0))
            });
    });
});

describe(`newMember tests `, () => {
    it(`New member is added to group`, () => {
        const currGroupId = 1000001;
        const newMemberId = 2;

        return groupsModel.getGroupMembers(currGroupId)
            .then(groupMembers => expect(groupMembers).toHaveLength(1))
            .then(() => { return groupsModel.newMember(currGroupId, newMemberId, 'AD')})
            .then(() => { 
                return groupsModel.getGroupMembers(currGroupId)
                .then(groupMembers => expect(groupMembers).toHaveLength(2))
            });
    });

    it(`Does not add a new member for user already in group`, () => {
        const currGroupId = 1000001;
        const newMemberId = 2;

        return groupsModel.getGroupMembers(currGroupId)
            .then(groupMembers => expect(groupMembers).toHaveLength(2))
            .then(() => { return groupsModel.newMember(currGroupId, newMemberId, 'AD')})
            .then(() => { 
                return groupsModel.getGroupMembers(currGroupId)
                .then(groupMembers => expect(groupMembers).toHaveLength(2))
            });
    });
});