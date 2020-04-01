require("dotenv").config();
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const passport = require("passport");

const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID || "test",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "test"
};

module.exports = () => {
  passport.use(
    new GoogleTokenStrategy(
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
