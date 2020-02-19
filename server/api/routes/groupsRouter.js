const express = require('express');
const responses = require('../util/responses');
const errorHandler = require('../util/errorHandler');
const router = express.Router();

const groupsModel = require('../model/groupsModel');

// Create a new group
router.post('/', (req, res, next) => {
    const newGroup = req.body;
    const groupOwnerId = 1; // temporary for now, will update this with auth once it is setup

    if (!newGroup.groupName) {
        errorHandler.notFound(req, res, `groupName is required.`);
    }
    else {
        return groupsModel
            .newGroup(
                groupOwnerId,
                newGroup.groupName, 
                newGroup.groupDesc,
                newGroup.meetingDuration, 
                newGroup.meetingFrequency, 
                newGroup.meetingLocation)
            .then((result) => {
                let newGroupId = result;
                return groupsModel.newMember(newGroupId, groupOwnerId, 'AD')
                    .then((result) => {
                        res.status(responses.CREATED).json({groupId: newGroupId})
                    });
            }).catch(next); // returns the id of the created group
    }
});

// Get all groups
router.get('/', (req, res, next) => {
    const userId = 1; // temporary for now, will update this with auth once it is setup
    if (!userId) {
        errorHandler.notFound(req, res, `userId is required.`);
    }
    else {
        return groupsModel
            .getGroupsFromUserId(userId)
            .then(result => res.status(responses.SUCCESS).json({groups: result}))
            .catch(next);
    }
});

// Get group information from groupId
router.get('/:groupId', (req, res, next) => {
    const { groupId } = req.params;
    return groupsModel
        .getGroupFromGroupId(groupId)
        .then((result) => {
            if(result.length > 0) {
                res.status(responses.SUCCESS).json(result[0])
            }
            else {
                errorHandler.notFound(req, res, `GroupId ${groupId} does not exist.`);
            }
        }).catch(next);
});

// Get group information from groupId
router.delete('/:groupId', (req, res, next) => {
    const { groupId } = req.params;
    return groupsModel.getGroupFromGroupId(groupId)
        .then((result) => {
            if(result.length > 0) {
                return groupsModel.deleteGroup(groupId).then(() => {
                    res.status(responses.SUCCESS).json({deletedGroup: result[0]});
                });
            }
            else {
                errorHandler.notFound(req, res, `GroupId ${groupId} does not exist.`);
            }
        }).catch(next);
});

module.exports = router;