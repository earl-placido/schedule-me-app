
const express = require('express');
const exampleRouter = express.Router();
const responses = require('../util/responses');
const exampleController = require('../controller/exampleController');

exampleRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
    
    return exampleController.getData(id)
        .then(data => res.status(responses.SUCCESS).json(data))
        .catch(next);
});

exampleRouter.post('/:id', (req, res, next) => {
    const { id } = req.params;
    const data = req.body.data;
    
    return exampleController.insertData(id, data)
        .then(result => res.status(responses.CREATED).json(result[0]))
        .catch(next);
});

module.exports = exampleRouter;