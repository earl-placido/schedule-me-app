require("dotenv").config();
const request = require("supertest");
const server = require("../../server");
const { generateUser } = require("../test-utils/userUtil");
const { generateGroup } = require("../test-utils/groupUtil");
const responses = require("../test-utils/responses");

describe("Availability Router Tests", () => {
  let generatedUser = generateUser();
  let generatedGroup = generateGroup();
  let testToken,
    testGroupId,
    testGroupMemberId,
    testAvailabilityIds = [];

  beforeAll(async done => {
    testToken = (
      await request(server)
        .post("/api/v1/auth/signup")
        .send({
          email: generatedUser.email,
          password: generatedUser.password,
          firstName: generatedUser.fName,
          lastName: generatedUser.lName
        })
    ).headers["x-auth-token"];

    testGroupId = (
      await request(server)
        .post(`/api/v1/groups/`)
        .set("Authorization", `Bearer ${testToken}`)
        .send({
          groupName: generatedGroup.groupName,
          groupDesc: generatedGroup.groupDesc,
          meetingDuration: generatedGroup.meetingDuration,
          meetingFrequency: generatedGroup.meetingFrequency,
          meetingLocation: generatedGroup.meetingLocation
        })
    ).body.groupId;

    testGroupMemberId = (
      await request(server).get(`/api/v1/groups/${testGroupId}/members`)
    ).body.groupMembers[0].GroupMemberId;

    done();
  });

  describe("POST /groups/members/availability", () => {
    test("should create a new availabilities", done => {
      request(server)
        .post(`/api/v1/groups/members/availability`)
        .send({
          groupMemberId: testGroupMemberId,
          availabilityIds: [-1, -1],
          startTimes: ["2000-01-01 01:00:00", "2000-01-01 05:00:00"],
          endTimes: ["2000-01-01 02:00:00", "2000-01-01 06:00:00"]
        })
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).toBeTruthy();
          testAvailabilityIds = testAvailabilityIds.concat(res.body.ids);
          done();
        });
    });

    test("should create a new availability", done => {
      request(server)
        .post(`/api/v1/groups/members/availability`)
        .send({
          groupMemberId: testGroupMemberId,
          availabilityIds: [-1],
          startTimes: ["2000-01-01 08:00:00"],
          endTimes: ["2000-01-01 09:00:00"]
        })
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).toBeTruthy();
          testAvailabilityIds = testAvailabilityIds.concat(res.body.ids);
          done();
        });
    });

    test("should not add availability", done => {
      let invalid = "invalid";
      request(server)
        .post(`/api/v1/groups/members/availability`)
        .send({
          groupMemberId: testGroupMemberId,
          availabilityIds: [-1],
          startTimes: [invalid],
          endTimes: [invalid]
        })
        .expect(responses.SERVER_ERROR)
        .end((err, res) => {
          expect(JSON.parse(res.error.text).error).toMatch(
            `could not add availability: Incorrect datetime value: '${invalid}' for column 'StartTime' at row 1`
          );
          done();
        });
    });
  });

  describe("GET /groups/members/:groupMemberId/availability", () => {
    test("should get availabilities", done => {
      request(server)
        .get(`/api/v1/groups/members/${testGroupMemberId}/availability`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body[0]["CAST(StartTime as char)"]).toEqual(
            "2000-01-01 01:00:00"
          );
          expect(res.body[0]["CAST(EndTime as char)"]).toEqual(
            "2000-01-01 02:00:00"
          );

          expect(res.body[1]["CAST(StartTime as char)"]).toEqual(
            "2000-01-01 05:00:00"
          );
          expect(res.body[1]["CAST(EndTime as char)"]).toEqual(
            "2000-01-01 06:00:00"
          );

          done();
        });
    });

    test("should not find availabilities", done => {
      let invalidGroupId = 9999999;
      request(server)
        .get(`/api/v1/groups/members/${invalidGroupId}/availability`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.error).toEqual(
            `could not find availability with ${invalidGroupId} as group member id`
          );
          done();
        });
    });
  });

  describe("DELETE /groups/members/availability", () => {
    test("should delete availabilities", done => {
      request(server)
        .delete(`/api/v1/groups/members/availability`)
        .send({
          availabilityIds: testAvailabilityIds
        })
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).toBeTruthy();
          done();
        });
    });
  });

  afterAll(done => {
    server.close();
    done();
  });
});
