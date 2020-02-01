const express = require('express');
const router = express.Router();


// API endpoints
const example = require('./routes/exampleRouter');


// Attach routes
router.use('/example', example);



module.exports = router;