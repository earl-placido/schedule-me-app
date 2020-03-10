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


    // get user info from the google user object
    let userEmail = req.user.emails[0].value;
    let userFirstName = req.user.name.givenName;
    let userLastName = req.user.name.familyName;
    let userGoogleUID = req.user.id;
    let userDisplayPicURL = req.user._json.picture;

    userModel
      .getUserByEmail(userEmail)
      .then(user => {
        let userID;
        // create new google login user
        if (user === undefined || user.length == 0) {
          return userModel
            .createGoogleUser(
              userEmail,
              userFirstName,
              userLastName,
              "google",
              userGoogleUID
            )
            .then(id => (userID = id))
            .catch(next);
        } else {
          userID = user[0].UserId;
        }

        // transform auth & user objects for tokenHelper
        req.auth = { id: userID };
        req.user = {
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
          displayPicURL: userDisplayPicURL
        };

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
              // transform auth & user objects for tokenHelper
              req.auth = { id: userID };
              req.user = {
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                displayPicURL: null
              };
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

        // transform auth & user objects for tokenHelper
        req.auth = { id: result.userId };
        req.user = {
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          displayPicURL: null
        };

        next();
      })
      .catch(next);
  },
  tokenHelper.createToken,
  tokenHelper.sendToken
);

module.exports = router;
