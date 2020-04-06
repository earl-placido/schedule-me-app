require("dotenv").config();
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const MockStrategy = require("passport-mock-strategy").Strategy;
const passport = require("passport");

const Strategy =
  process.env.NODE_ENV == "test" ? MockStrategy : GoogleTokenStrategy;

const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
};

module.exports = () => {
  passport.use(
    new Strategy(
      {
        clientID: GOOGLE_CONFIG.clientID,
        clientSecret: GOOGLE_CONFIG.clientSecret
      },
      (token, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
};
