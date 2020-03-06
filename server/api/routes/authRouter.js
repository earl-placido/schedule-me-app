const express = require("express");
const passport = require("passport");
const tokenHelper = require("../util/tokenHelper");
const userModel = require("../model/userModel");
const responses = require("../util/responses");

const router = express.Router();
require("../util/passportInit")(passport);

router.route("/auth/google").post(
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(responses.UNAUTHORIZED, "User Not Authenticated");
    }

    userModel.getUser(req.user.emails[0].value).then(user => {
      if (user) {
        userModel.newUser(req.user.displayName, req.user.emails[0].value);
      }

      req.auth = {
        id: req.user.id
      };

      next();
    });
  },
  tokenHelper.createToken,
  tokenHelper.sendToken
);

module.exports = router;
