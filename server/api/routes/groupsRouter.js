const express = require("express");
const router = express.Router();

const groupsModel = require("../model/groupsModel");
const { authenticateToken } = require("../util/tokenHelper");
const responses = require("../util/responses");

// Create a new group
router.post("/", authenticateToken, (req, res, next) => {
  const newGroup = req.body;
  const groupOwnerId = req.user.userID;

  if (!newGroup.groupName) {
    res.status(responses.NOT_FOUND);
    res.send({ error: `groupName is required.` });
  } else {
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
});

// Get all groups
router.get("/", authenticateToken, (req, res, next) => {
  const userId = req.user.userID;
  if (!userId) {
    res.status(responses.NOT_FOUND);
    res.send({ error: `userId is required.` });
  } else {
    return groupsModel
      .getGroupsFromUserId(userId)
      .then(result => res.status(responses.SUCCESS).json({ groups: result }))
      .catch(next);
  }
});

// Get group information from groupId
router.get("/:groupId", (req, res, next) => {
  const { groupId } = req.params;
  return groupsModel
    .getGroupFromGroupId(groupId)
    .then(result => {
      if (result.length > 0) {
        res.status(responses.SUCCESS).json(result[0]);
      } else {
        res.status(responses.NOT_FOUND);
        res.send({ error: `GroupId ${groupId} does not exist.` });
      }
    })
    .catch(next);
});

// Get group information from groupId
router.delete("/:groupId", authenticateToken, (req, res, next) => {
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
});

module.exports = router;
