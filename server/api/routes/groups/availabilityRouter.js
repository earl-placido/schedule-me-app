const express = require("express");
const router = express.Router();
const responses = require("../../util/responses");
const {
  availabilityRules,
  availabilityIdRules,
  groupMemberIdRules,
  validate
} = require("../../middleware/validationMiddleware");

module.exports = availabilityModel => {
  router.get(
    "/members/:groupMemberId/availability",
    groupMemberIdRules(),
    validate,
    (req, res, next) => {
      const { groupMemberId } = req.params;
      return availabilityModel
        .getAvailability(groupMemberId)
        .then(result => {
          if (result.length > 0) {
            res.status(responses.SUCCESS).json(result);
          } else {
            res.status(responses.SUCCESS);
            res.send({
              error: `could not find availability with ${groupMemberId} as group member id`
            });
          }
        })
        .catch(next);
    }
  );

  router.post(
    "/members/availability",
    availabilityRules(),
    validate,
    (req, res, next) => {
      const { groupMemberId, availabilityIds, startTimes, endTimes } = req.body;
      return availabilityModel
        .addAvailability(groupMemberId, availabilityIds, startTimes, endTimes)
        .then(result => {
          if (result.error) {
            res.status(responses.SERVER_ERROR);
            res.send({
              error: `could not add availability: ${result.error}`
            });
          } else {
            // get the ids of inserted availability
            let ids;
            if (Array.isArray(result)) ids = result.map(item => item.insertId);
            else ids = [result.insertId];
            res
              .status(responses.SUCCESS)
              .json({ error: false, success: true, ids });
          }
        })
        .catch(next);
    }
  );

  router.delete(
    "/members/availability",
    availabilityIdRules(),
    validate,
    (req, res, next) => {
      const { availabilityIds } = req.body;

      availabilityModel
        .deleteAvailability(availabilityIds)
        .then(result => {
          if (!result.error)
            res.status(responses.SUCCESS).json({ success: true });
          else {
            res.status(responses.SERVER_ERROR).json({ error: true });
          }
        })
        .catch(next);
    }
  );

  return router;
};
