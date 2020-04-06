require("dotenv").config();
const request = require("supertest");
const server = require("../../server");
const { generateUser } = require("../test-utils/userUtil");
const { generateGroup } = require("../test-utils/groupUtil");
const responses = require("../test-utils/responses");

describe("Groups Router Tests", () => {
  let generatedOwner = generateUser();
  let generatedNonOwner = generateUser();
  let generatedGroup = generateGroup();
  let ownerToken, nonOwnerToken, testGroupId, testMeetingId;

  beforeAll(async done => {
    ownerToken = (
      await request(server)
        .post("/api/v1/auth/signup")
        .send({
          email: generatedOwner.email,
          password: generatedOwner.password,
          firstName: generatedOwner.fName,
          lastName: generatedOwner.lName
        })
    ).headers["x-auth-token"];

    nonOwnerToken = (
      await request(server)
        .post("/api/v1/auth/signup")
        .send({
          email: generatedNonOwner.email,
          password: generatedNonOwner.password,
          firstName: generatedNonOwner.fName,
          lastName: generatedNonOwner.lName
        })
    ).headers["x-auth-token"];

    done();
  });

  describe("POST /groups/", () => {
    test("should create a new group", done => {
      request(server)
        .post(`/api/v1/groups/`)
        .set("Authorization", `Bearer ${ownerToken}`)
        .send({
          groupName: generatedGroup.groupName,
          groupDesc: generatedGroup.groupDesc,
          meetingDuration: generatedGroup.meetingDuration,
          meetingFrequency: generatedGroup.meetingFrequency,
          meetingLocation: generatedGroup.meetingLocation
        })
        .expect(responses.CREATED)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.groupId).toEqual(expect.any(Number));
          expect(res.body.groupId).toBeGreaterThan(0);
          testGroupId = res.body.groupId;
          done();
        });
    });
  });

  describe("GET /groups/", () => {
    test("should get the created group", done => {
      request(server)
        .get(`/api/v1/groups/`)
        .set("Authorization", `Bearer ${ownerToken}`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.groups[0].GroupId).toEqual(testGroupId);
          expect(res.body.groups[0].GroupName).toEqual(
            generatedGroup.groupName
          );
          expect(res.body.groups[0].GroupDescription).toEqual(
            generatedGroup.groupDesc
          );
          expect(res.body.groups[0].MeetingDuration.replace(/:/g, "")).toEqual(
            generatedGroup.meetingDuration
          );
          expect(res.body.groups[0].MeetingFrequency).toEqual(
            generatedGroup.meetingFrequency
          );
          expect(res.body.groups[0].MeetingLocation).toEqual(
            generatedGroup.meetingLocation
          );
          done();
        });
    });
  });

  describe("GET /groups/:groupId", () => {
    test("should get the created group", done => {
      request(server)
        .get(`/api/v1/groups/${testGroupId}`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.GroupId).toEqual(testGroupId);
          expect(res.body.GroupName).toEqual(generatedGroup.groupName);
          expect(res.body.GroupDescription).toEqual(generatedGroup.groupDesc);
          expect(res.body.MeetingDuration.replace(/:/g, "")).toEqual(
            generatedGroup.meetingDuration
          );
          expect(res.body.MeetingFrequency).toEqual(
            generatedGroup.meetingFrequency
          );
          expect(res.body.MeetingLocation).toEqual(
            generatedGroup.meetingLocation
          );
          done();
        });
    });

    test("group does not exist", done => {
      let invalidGroupId = 9999999;
      request(server)
        .get(`/api/v1/groups/${invalidGroupId}`)
        .expect(responses.NOT_FOUND)
        .end((err, res) => {
          if (err) return done(err);
          expect(JSON.parse(res.error.text).error).toEqual(
            `GroupId ${invalidGroupId} does not exist.`
          );
          done();
        });
    });
  });

  describe("POST /groups/:groupId/members", () => {
    test("should add user to group and return a group member id", done => {
      request(server)
        .post(`/api/v1/groups/${testGroupId}/members`)
        .set("Authorization", `Bearer ${nonOwnerToken}`)
        .expect(responses.CREATED)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.groupMemberId).toEqual(expect.any(Number));
          expect(res.body.groupMemberId).toBeGreaterThan(0);
          done();
        });
    });

    test("should return error", done => {
      let invalidGroupMemberId = -1;
      request(server)
        .post(`/api/v1/groups/${invalidGroupMemberId}/members`)
        .set("Authorization", `Bearer ${nonOwnerToken}`)
        .expect(responses.BAD_REQUEST, done);
    });
  });

  describe("GET /groups/:groupId/members", () => {
    test("should get group members", done => {
      request(server)
        .get(`/api/v1/groups/${testGroupId}/members`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.groupMembers[0].GroupId).toEqual(testGroupId);
          expect(res.body.groupMembers[0].UserFName).toEqual(
            generatedOwner.fName
          );
          expect(res.body.groupMembers[0].UserLName).toEqual(
            generatedOwner.lName
          );
          expect(res.body.groupMembers[0].UserEmail).toEqual(
            generatedOwner.email
          );

          expect(res.body.groupMembers[1].GroupId).toEqual(testGroupId);
          expect(res.body.groupMembers[1].UserFName).toEqual(
            generatedNonOwner.fName
          );
          expect(res.body.groupMembers[1].UserLName).toEqual(
            generatedNonOwner.lName
          );
          expect(res.body.groupMembers[1].UserEmail).toEqual(
            generatedNonOwner.email
          );
          done();
        });
    });
  });

  describe("GET /groups/:groupId/optimaltime", () => {
    beforeAll(async done => {
      let groupMembers = (
        await request(server).get(`/api/v1/groups/${testGroupId}/members`)
      ).body.groupMembers;

      for (const groupMember of groupMembers) {
        await request(server)
          .post(`/api/v1/groups/members/availability`)
          .send({
            groupMemberId: groupMember.GroupMemberId,
            availabilityIds: [-1],
            startTimes: ["2020-04-08 08:00:00"],
            endTimes: ["2020-04-08 09:00:00"]
          });
      }
      done();
    });

    test("should return expected optimal time", done => {
      request(server)
        .get(`/api/v1/groups/${testGroupId}/optimaltime`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.optimalTime[0][0]).toEqual("2020-04-08:8_9");
          done();
        });
    });
  });

  describe("GET /groups/:groupId/meetings", () => {
    test("should return meeting ids", done => {
      request(server)
        .get(`/api/v1/groups/${testGroupId}/meetings`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(
            res.body.meetingIds[0].MeetingDuration.replace(/:/g, "")
          ).toEqual(generatedGroup.meetingDuration);
          testMeetingId = res.body.meetingIds[0].MeetingId;
          done();
        });
    });
  });

  describe("POST /groups/meetings/:stringMeetingIds/optimaltime", () => {
    test("should return meeting ids", done => {
      request(server)
        .post(`/api/v1/groups/meetings/${testMeetingId}/optimaltime`)
        .send({
          startTime: "2020-04-08 08:00:00",
          endTime: "2020-04-08 09:00:00"
        })
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).toBeTruthy();
          done();
        });
    });
  });

  describe("GET /groups/meetings/:meetingId/optimaltime", () => {
    test("should return meeting ids", done => {
      request(server)
        .get(`/api/v1/groups/meetings/${testMeetingId}/optimaltime`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body[0]["CAST(StartTime as char)"]).toEqual(
            "2020-04-08 08:00:00"
          );
          expect(res.body[0]["CAST(EndTime as char)"]).toEqual(
            "2020-04-08 09:00:00"
          );
          done();
        });
    });
  });

  describe("DELETE /groups/:groupId", () => {
    let generatedNonOwner = generateUser();
    let nonOwnerToken;
    beforeAll(done => {
      request(server)
        .post("/api/v1/auth/signup")
        .send({
          email: generatedNonOwner.email,
          password: generatedNonOwner.password,
          firstName: generatedNonOwner.fName,
          lastName: generatedNonOwner.lName
        })
        .end((err, res) => {
          if (err) return done(err);
          nonOwnerToken = res.headers["x-auth-token"];

          request(server)
            .post(`/api/v1/groups/${testGroupId}/members`)
            .set("Authorization", `Bearer ${nonOwnerToken}`)
            .end(err => {
              if (err) return done(err);
              done();
            });
        });
    });

    test("should not delete group as non owner", done => {
      request(server)
        .delete(`/api/v1/groups/${testGroupId}`)
        .set("Authorization", `Bearer ${nonOwnerToken}`)
        .expect(responses.FORBIDDEN)
        .end((err, res) => {
          if (err) return done(err);
          expect(JSON.parse(res.error.text).error).toEqual(
            `Need to be group owner to delete group.`
          );
          done();
        });
    });

    test("should delete group as owner", done => {
      request(server)
        .delete(`/api/v1/groups/${testGroupId}`)
        .set("Authorization", `Bearer ${ownerToken}`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.deletedGroup.GroupId).toEqual(testGroupId);
          expect(res.body.deletedGroup.GroupName).toEqual(
            generatedGroup.groupName
          );
          expect(res.body.deletedGroup.GroupDescription).toEqual(
            generatedGroup.groupDesc
          );
          expect(
            res.body.deletedGroup.MeetingDuration.replace(/:/g, "")
          ).toEqual(generatedGroup.meetingDuration);
          expect(res.body.deletedGroup.MeetingFrequency).toEqual(
            generatedGroup.meetingFrequency
          );
          expect(res.body.deletedGroup.MeetingLocation).toEqual(
            generatedGroup.meetingLocation
          );
          done();
        });
    });

    test("group does not exist", done => {
      let invalidGroupId = 9999999;
      request(server)
        .delete(`/api/v1/groups/${invalidGroupId}`)
        .set("Authorization", `Bearer ${ownerToken}`)
        .expect(responses.NOT_FOUND)
        .end((err, res) => {
          if (err) return done(err);
          expect(JSON.parse(res.error.text).error).toEqual(
            `GroupId ${invalidGroupId} does not exist.`
          );
          done();
        });
    });
  });

  afterAll(done => {
    server.close();
    done();
  });
});
