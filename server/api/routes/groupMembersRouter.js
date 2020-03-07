const express = require("express");
const responses = require("../util/responses");
const router = express.Router();
const groupsModel = require("../model/groupsModel");

// Get all group members in a group
router.get("/:groupId", (req, res, next) => {
    const groupId = req.params.groupId; 
    
    if (!groupId) {
        res.status(responses.NOT_FOUND);
        res.send({ error: `groupId is required.` });
    } else {
        return groupsModel
        .getGroupMembers(groupId)
        .then(result => res.status(responses.SUCCESS).json({ groupMembers: result }))
        .catch(next);
    }
});

module.exports = router;
