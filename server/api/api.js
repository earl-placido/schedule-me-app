const express = require('express');
const router = express.Router();


// API endpoints
const auth = require('./routes/auth');
const example = require('./routes/exampleRouter');  
const groups = require('./routes/groupsRouter');

// Attach routes
router.use('/', auth);
router.use('/example', example);
router.use('/groups', groups);



module.exports = router;