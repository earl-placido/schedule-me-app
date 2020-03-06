const express = require("express");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

const tokenHelper = require("../util/tokenHelper");
const userModel = require("../model/userModel");
const responses = require("../util/responses");

const router = express.Router();
require("../util/passportInit")(passport);

router.route("/google").post(
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(responses.UNAUTHORIZED, "User Not Authenticated");
    }

    let googleUser = req.user;

    userModel
      .getUserByEmail(googleUser.emails[0].value)
      .then(user => {
        let userID;
        // create new google login user
        if (user === undefined || user.length == 0) {
          return userModel
            .createGoogleUser(
              googleUser.emails[0].value,
              googleUser.name.givenName,
              googleUser.name.familyName,
              "google",
              googleUser.id
            )
            .then(id => (userID = id))
            .catch(next);
        } else {
          userID = user[0].UserId;
        }

        req.auth = { id: userID };

        next();
      })
      .catch(next);
  },
  tokenHelper.createToken,
  tokenHelper.sendToken
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Must follow email format"),
    check("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password must be between 8 and 100 characters"),
    check("firstName")
      .isLength({ min: 1, max: 100 })
      .withMessage("First name must be between 1 and 100 characters"),
    check("lastName")
      .isLength({ min: 1, max: 100 })
      .withMessage("Last name must be between 1 and 100 characters")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(responses.UNPROCESSABLE)
        .json({ errors: errors.array() });
    }

    let newUser = req.body;
    userModel
      .getUserByEmail(newUser.email)
      .then(user => {
        // create new user
        if (user === undefined || user.length == 0) {
          return userModel
            .createUser(
              newUser.email,
              newUser.password,
              newUser.firstName,
              newUser.lastName
            )
            .then(userID => {
              req.auth = { id: userID };
              next();
            })
            .catch(next);
        } else {
          return res
            .status(responses.UNAUTHORIZED)
            .json({ err: "Email address entered is taken." });
        }
      })
      .catch(next);
  },
  tokenHelper.createToken,
  tokenHelper.sendToken
);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Must follow email format"),
    check("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password must be between 8 and 100 characters")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(responses.UNPROCESSABLE)
        .json({ errors: errors.array() });
    }

    let user = req.body;
    userModel
      .validateUser(user.email, user.password)
      .then(result => {
        if (!result.isValid) {
          return res.status(responses.UNAUTHORIZED).json({ err: result.msg });
        }

        req.auth = { id: result.userId };

        next();
      })
      .catch(next);
  },
  tokenHelper.createToken,
  tokenHelper.sendToken
);

module.exports = router;
