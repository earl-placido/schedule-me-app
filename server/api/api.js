const express = require('express');
const router = express.Router();


// API endpoints
const auth = require('./routes/auth');
const example = require('./routes/exampleRouter');  


// Attach routes
router.use('/', auth);
router.use('/example', example);



module.exports = router;