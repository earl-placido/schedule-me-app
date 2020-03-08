const express = require("express");
const responses = require("../util/responses");

const UserModel = require("../model/userModel");

const router = express.Router();

router.get("/:userEmail", (req, res, next) => {
  const { userEmail } = req.params;
  return UserModel.getUserByEmail(userEmail)
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
