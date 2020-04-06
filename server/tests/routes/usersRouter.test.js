require("dotenv").config();
const request = require("supertest");
const server = require("../../server");
const userUtil = require("../test-utils/userUtil");

describe("User Router Tests", () => {
  let generatedUser = userUtil.generateUser();
  let token;
  let testID;

  beforeAll(done => {
    request(server)
      .post("/api/v1/auth/signup")
      .send(
        `email=${generatedUser.email}&password=${generatedUser.password}&firstName=${generatedUser.fName}&lastName=${generatedUser.lName}`
      )
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);

        token = res.headers["x-auth-token"];
        done();
      });
  });

  describe("GET /email/:userEmail", () => {
    test("should get userID", done => {
      request(server)
        .get(`/api/v1/users/email/${generatedUser.email}`)
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.userId).toEqual(expect.any(Number));
          expect(res.body.userId).toBeGreaterThan(1);
          testID = res.body.userId;
          done();
        });
    });

    test("should require email address", done => {
      request(server)
        .get(`/api/v1/users/email/`)
        .end((err, res) => {
          if (err) return done(err);
          console.log(res.error.status);
          done();
        });
    });
  });

  describe("GET /:userId", () => {
    test("should get user information", done => {
      request(server)
        .get(`/api/v1/users/${testID}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.UserFName).toMatch(generatedUser.fName);
          expect(res.body.UserLName).toMatch(generatedUser.lName);
          expect(res.body.UserEmail).toMatch(generatedUser.email);
          done();
        });
    });
  });

  afterAll(done => {
    server.close();
    done();
  });
});
