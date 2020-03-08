const responses = require('../../util/responses');

const AvailabilityModel = require('../../model/AvailabilityModel');

module.exports = (router) => {
    router.get('/members/:groupMemberId/availability', (req, res, next) => {
        const { groupMemberId } = req.params;
        if (!groupMemberId) {
            res.status(responses.NOT_FOUND);
            res.send({error: "groupId is required!"});
        } else {
            return AvailabilityModel.getAvailability(groupMemberId).then(result => {
                if (result.length > 0) {
                    res.status(responses.SUCCESS).json(result);
                } else {
                    res.status(responses.NOT_FOUND);
                    res.send({error: `could not find availability with ${groupMemberId} as group member id`});
                }
            }).catch(next);

        }
    });

    router.post('/members/availability', (req, res, next) => {
        const { groupMemberId, availabilityIds, startTimes, endTimes} = req.body;

        if (availabilityIds.length === 0) {
            res.status(responses.NOT_FOUND);
            res.send({ error: "availabilityIds is empty" });
        } else if (startTimes.length === 0) {
            res.status(responses.NOT_FOUND);
            res.send({ error: "startTimes is empty" });
        } else if (endTimes.length === 0) {
            res.status(responses.NOTFOUND);
            res.send({ error: "endTimes is empty" });
        } else if(availabilityIds.length !== startTimes.length || availabilityIds.length !== endTimes.length || startTimes.length !== endTimes.length) {
            res.status(responses.NOT_FOUND);
            res.send({ error: "avilabilityIds and startTime and endTime lengths are not the same" });
        } else {
            return AvailabilityModel.addAvailability(groupMemberId, availabilityIds, startTimes, endTimes).then(result => {
                if (result.errno) {
                    res.status(responses.SERVER_ERROR);
                    res.send({error: `could not add availability: ${result.sqlMessage}`});
                } else {
                    res.status(responses.SUCCESS).json({'error': false, 'success': true});
                }
            }).catch(next);
        }
    });
};