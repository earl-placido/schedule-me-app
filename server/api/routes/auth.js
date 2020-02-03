const express = require('express');
const router = express.Router();
const errorHandler = require('../util/errorHandler');

const SECRET_KEY = process.env.SECRET_KEY || 'test';

module.exports = router;