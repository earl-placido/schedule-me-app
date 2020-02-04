const express = require('express');
const responses = require('../util/responses');
const router = express.Router();

const exampleModel = require('../model/exampleModel');

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    
    return exampleModel.getData(id)
        .then(data => res.status(responses.SUCCESS).json(data))
        .catch(next);
});

router.post('/:id', (req, res, next) => {
    const { id } = req.params;
    const data = req.body.data;
    
    return exampleModel.insertData(id, data)
        .then(result => res.status(responses.CREATED).json(result[0]))
        .catch(next);
});

module.exports = router;