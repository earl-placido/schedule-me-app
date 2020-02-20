require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.SERVER_ENV === 'production' 
    ? 'https://schedule-me-up.surge.sh/' : process.env.SERVER_ENV === 'develop' 
    ? 'https://schedule-me-up_dev.surge.sh/' : 'https://tolocalhost.com/api'
}

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CONFIG.clientID,
            clientSecret: GOOGLE_CONFIG.clientSecret,
            callbackURL: GOOGLE_CONFIG.callbackURL
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};