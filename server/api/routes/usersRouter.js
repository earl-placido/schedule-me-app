const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const userModel = require("../model/userModel");
const { authenticateToken } = require("../util/tokenHelper");
const responses = require("../util/responses");

// Get user information from userId
router.get(
  "/:userId",
  authenticateToken,
  [
    check("userId")
      .exists({ checkNull: true })
      .withMessage("Group name is required.")
      .isInt()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(responses.UNPROCESSABLE)
        .json({ errors: errors.array() });
    }

    const { userId } = req.params;
    return userModel
      .getUserByUserId(userId)
      .then(result => {
        if (result.length > 0) {
          res.status(responses.SUCCESS).json(result[0]);
        } else {
          res.status(responses.NOT_FOUND);
          res.send({ error: `UserId ${userId} does not exist.` });
        }
      })
      .catch(next);
  }
);

router.get("/email/:userEmail", (req, res, next) => {
  const { userEmail } = req.params;
  return userModel
    .getUserByEmail(userEmail)
    .then(result => {
      if (result.length > 0) {
        res.status(responses.SUCCESS).json({ userId: result[0].UserId });
      } else {
        res.status(responses.NOT_FOUND);
        res.send({ error: `user with ${userEmail} not found.` });
      }
    })
    .catch(next);
});

module.exports = router;
