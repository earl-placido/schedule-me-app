const express = require('express');
const responses = require('../util/responses');
const router = express.Router();

const groupMemberModel = require('../model/groupMemberModel');

router.post('/', (req, res, next) => {
    const groupMemberInformation = req.body;
    const { groupId, userId } = groupMemberInformation;
    console.log(groupMemberInformation);
    if (!groupId) {
        res.status(responses.NOT_FOUND);
        res.send({error: "groupId is required!"});
    } else if (!userId) {
        res.status(responses.NOT_FOUND);
        res.send({error: "userId is required!"});
    } else {
        return groupMemberModel.getGroupMemberId(
            groupId,
            userId
        ).then(result => {
            if (result.length > 0) {
                res.status(responses.SUCCESS).json(result[0]);
            } else {
                res.status(responses.NOT_FOUND);
                res.send({error: `could not find groupMemberId with ${groupId} and ${userId}`});
            }
        }).catch(next);
    }

});

module.exports = router;