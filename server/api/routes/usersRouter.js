const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");
const { authenticateToken } = require("../util/tokenHelper");
const responses = require("../util/responses");

// Get user information from userId
router.get("/:userId", authenticateToken, (req, res, next) => {
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
});

module.exports = router;
