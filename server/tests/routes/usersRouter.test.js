require("dotenv").config();
const request = require("supertest");
const server = require("../../server");
const { generateUser } = require("../test-utils/userUtil");
const responses = require("../test-utils/responses");

describe("User Router Tests", () => {
  let generatedUser = generateUser();
  let testToken, testUserId;

  beforeAll(done => {
    request(server)
      .post("/api/v1/auth/signup")
      .send({
        email: generatedUser.email,
        password: generatedUser.password,
        firstName: generatedUser.fName,
        lastName: generatedUser.lName
      })
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);

        testToken = res.headers["x-auth-token"];
        done();
      });
  });

  describe("GET /email/:userEmail", () => {
    test("should get userID", done => {
      request(server)
        .get(`/api/v1/users/email/${generatedUser.email}`)
        .expect(responses.SUCCESS)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.userId).toEqual(expect.any(Number));
          expect(res.body.userId).toBeGreaterThan(0);
          testUserId = res.body.userId;
          done();
        });
    });

    test("email address not found", done => {
      request(server)
        .get(`/api/v1/users/email/123${generatedUser.email}`)
        .expect(responses.NOT_FOUND)
        .end((err, res) => {
          if (err) return done(err);
          expect(JSON.parse(res.error.text).error).toMatch(
            `user with 123${generatedUser.email} not found.`
          );
          done();
        });
    });
  });

  describe("GET /:userId", () => {
    test("should get user information", done => {
      request(server)
        .get(`/api/v1/users/${testUserId}`)
        .set("Authorization", `Bearer ${testToken}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.UserFName).toMatch(generatedUser.fName);
          expect(res.body.UserLName).toMatch(generatedUser.lName);
          expect(res.body.UserEmail).toMatch(generatedUser.email);
          done();
        });
    });

    test("user does not exist", done => {
      let invalidUserId = 9999999;
      request(server)
        .get(`/api/v1/users/${invalidUserId}`)
        .set("Authorization", `Bearer ${testToken}`)
        .expect(responses.NOT_FOUND)
        .end((err, res) => {
          if (err) return done(err);
          expect(JSON.parse(res.error.text).error).toMatch(
            `UserId ${invalidUserId} does not exist.`
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
