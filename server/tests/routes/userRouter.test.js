require("dotenv").config();
const request = require("supertest");
const app = require("../../server");

let agent = request.agent(app);


describe("GET /users", () => {
  let token = "none";

  beforeAll((done) => {
    agent
      .post("/api/v1/auth/signup")
      .send(
        "email=email%40email.com&password=password&firstName=first&lastName=last"
      )
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should get user information", (done) => {
    console.log(token);
    done();
  });
});
