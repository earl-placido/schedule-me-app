require("dotenv").config();
const request = require("supertest");
const server = require("../../server");
const userUtil = require("../test-utils/userUtil");
const responses = require("../test-utils/responses");

describe("Auth Router Tests", () => {
  let generatedUser = userUtil.generateUser();

  describe("POST /auth/signup", () => {
    test("should create a new user", done => {
      request(server)
        .post("/api/v1/auth/signup")
        .expect(responses.SUCCESS)
        .send({
          email: generatedUser.email,
          password: generatedUser.password,
          firstName: generatedUser.fName,
          lastName: generatedUser.lName
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(JSON.parse(res.text).email).toEqual(generatedUser.email);
          expect(JSON.parse(res.text).firstName).toEqual(generatedUser.fName);
          expect(JSON.parse(res.text).lastName).toEqual(generatedUser.lName);
          expect(res.headers["x-auth-token"]).toBeDefined();
          done();
        });
    });

    test("email already in use", done => {
      request(server)
        .post("/api/v1/auth/signup")
        .send({
          email: generatedUser.email,
          password: generatedUser.password,
          firstName: generatedUser.fName,
          lastName: generatedUser.lName
        })
        .expect(responses.UNAUTHORIZED)
        .end((err, res) => {
          expect(JSON.parse(res.error.text).err).toEqual(
            "Email address entered is taken."
          );
          done();
        });
    });
  });

  describe("POST /auth/login", () => {
    test("should login user", done => {
      request(server)
        .post("/api/v1/auth/login")
        .expect(responses.SUCCESS)
        .send({
          email: generatedUser.email,
          password: generatedUser.password
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(JSON.parse(res.text).email).toEqual(generatedUser.email);
          expect(JSON.parse(res.text).firstName).toEqual(generatedUser.fName);
          expect(JSON.parse(res.text).lastName).toEqual(generatedUser.lName);
          expect(res.headers["x-auth-token"]).toBeDefined();
          done();
        });
    });

    test("email does not exist", done => {
      request(server)
        .post("/api/v1/auth/login")
        .send({
          email: `1${generatedUser.email}`,
          password: generatedUser.password
        })
        .expect(responses.UNAUTHORIZED)
        .end((err, res) => {
          expect(JSON.parse(res.error.text).err).toEqual(
            `Account with email 1${generatedUser.email} not found`
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
