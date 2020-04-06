const express = require("express");
const router = express.Router();

const groupsModel = require("../../model/groupsModel");
const groupMemberModel = require("../../model/groupMemberModel");

const { authenticateToken } = require("../../middleware/tokenMiddleware");
const {
  groupRules,
  groupIdRules,
  userIdRules,
  getOptimalTimeRules,
  setOptimalTimeRules,
  validate
} = require("../../middleware/validationMiddleware");

const responses = require("../../util/responses");
const { findOptimalTime } = require("../../util/optimalAlgorithm");

// Create a new group
router.post(
  "/",
  authenticateToken,
  groupRules(),
  validate,
  (req, res, next) => {
    const newGroup = req.body;
    const groupOwnerId = req.user.userID;

    return groupsModel
      .newGroup(
        newGroup.groupName,
        newGroup.groupDesc,
        groupOwnerId,
        newGroup.meetingDuration,
        newGroup.meetingFrequency,
        newGroup.meetingLocation
      ) // create new group
      .then(result => {
        if (result.errno) {
          res
            .status(responses.SERVER_ERROR)
            .json({ error: "Unable to create group" });
          throw Error(result.sqlMessage);
        }

        let newGroupId = result;

        // add owner to the group with owner privileges
        return groupsModel
          .newMember(newGroupId, groupOwnerId, "AD")
          .then(() => {
            res.status(responses.CREATED).json({ groupId: newGroupId });
          });
      })
      .catch(next); // returns the id of the created group
  }
);

// Get all groups
router.get("/", authenticateToken, (req, res, next) => {
  const userId = req.user.userID;
  return groupsModel
    .getGroupsFromUserId(userId)
    .then(result => res.status(responses.SUCCESS).json({ groups: result }))
    .catch(next);
});

//  group information from groupId
router.get("/:groupId", groupIdRules(), validate, (req, res, next) => {
  const { groupId } = req.params;
  return groupsModel
    .getGroupFromGroupId(groupId)
    .then(result => {
      if (result.length > 0) {
        res.status(responses.SUCCESS).json(result[0]);
      } else {
        res
          .status(responses.NOT_FOUND)
          .send({ error: `GroupId ${groupId} does not exist.` });
      }
    })
    .catch(next);
});

// Get group members from groupId
router.get("/:groupId/members", groupIdRules(), validate, (req, res, next) => {
  const { groupId } = req.params;
  return groupsModel
    .getGroupMembers(groupId)
    .then(result =>
      res.status(responses.SUCCESS).json({ groupMembers: result })
    )
    .catch(next);
});

// Add member to a group
router.post(
  "/:groupId/members",
  authenticateToken,
  groupIdRules(),
  validate,
  (req, res, next) => {
    const userId = req.user.userID;
    const groupId = req.params.groupId;
    return groupsModel
      .newMember(groupId, userId, "U")
      .then(result => {
        if (result.errno) {
          res.status(responses.BAD_REQUEST).json({ error: result.sqlMessage });
        } else {
          res.status(responses.CREATED).json({ groupMemberId: result });
        }
      })
      .catch(next);
  }
);

// Delete group
router.delete(
  "/:groupId",
  authenticateToken,
  groupIdRules(),
  validate,
  (req, res, next) => {
    const { groupId } = req.params;
    const userID = req.user.userID;
    return groupsModel
      .getGroupFromGroupId(groupId)
      .then(result => {
        if (result.length > 0) {
          if (result[0].GroupOwnerId != userID) {
            res.status(responses.FORBIDDEN);
            res.send({ error: `Need to be group owner to delete group.` });
          } else {
            return groupsModel.deleteGroup(groupId).then(() => {
              res.status(responses.SUCCESS).json({ deletedGroup: result[0] });
            });
          }
        } else {
          res.status(responses.NOT_FOUND);
          res.send({ error: `GroupId ${groupId} does not exist.` });
        }
      })
      .catch(next);
  }
);

// get group member id
router.get(
  "/:groupId/members/:userId",
  groupIdRules(),
  userIdRules(),
  validate,
  (req, res, next) => {
    const { groupId, userId } = req.params;
    return groupMemberModel
      .getGroupMemberId(groupId, userId)
      .then(result =>
        res.status(responses.SUCCESS).json({ groupMembers: result })
      )
      .catch(next);
  }
);

// group optimal time route
router.get(
  "/:groupId/optimaltime/",
  groupIdRules(),
  validate,
  (req, res, next) => {
    const { groupId } = req.params;
    return groupsModel
      .getGroupMemberAvailabilities(groupId)
      .then(result => {
        const optimalTime = findOptimalTime(result);
        res.status(responses.SUCCESS).json({ optimalTime });
      })
      .catch(next);
  }
);

// get meeting information
router.get(
  "/:groupId/meetings/",
  groupIdRules(),
  validate,
  (req, res, next) => {
    const { groupId } = req.params;
    return groupsModel
      .getMeetingByGroupId(groupId)
      .then(result => {
        res.status(responses.SUCCESS).json({ meetingIds: result });
      })
      .catch(next);
  }
);

router.get(
  "/meetings/:stringMeetingIds/optimaltime/",
  getOptimalTimeRules(),
  validate,
  (req, res, next) => {
    const { stringMeetingIds } = req.params;
    const meetingIds = stringMeetingIds
      .split(",")
      .map(stringMeetingId => parseInt(stringMeetingId));

    return groupsModel
      .getOptimalTimeForMeeting(meetingIds)
      .then(result => {
        res.status(responses.SUCCESS).json(result);
      })
      .catch(next);
  }
);

router.post(
  "/meetings/:meetingId/optimaltime/",
  setOptimalTimeRules(),
  validate,
  (req, res, next) => {
    const { startTime, endTime } = req.body;
    const { meetingId } = req.params;
    return groupsModel
      .setOptimalTimeForMeeting(meetingId, startTime, endTime)
      .then(result => {
        res.status(responses.SUCCESS).json({
          success: true,
          changedTime: result.changedRows != 0 || result.insertId > 0
        });
      })
      .catch(next);
  }
);

// add availability router
require("./availabilityRouter")(router);

module.exports = router;
