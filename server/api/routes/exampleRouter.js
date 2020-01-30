
const express = require('express');
const exampleRouter = express.Router();
const exampleController = require('../controller/getExample');

exampleRouter.get('/', exampleController.exampleFunction1);

module.exports = exampleRouter;