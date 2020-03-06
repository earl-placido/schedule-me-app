const responses = require('../../util/responses');
const groupMemberModel = require('../../model/groupMemberModel');

module.exports = (router) => {
// get group member id
router.get('/:groupId/members/:userId', (req, res, next) => {
    const { groupId, userId } = req.params;
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
};