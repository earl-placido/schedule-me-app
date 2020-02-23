const express = require('express');
const router = express.Router();


// API endpoints
const example = require('./routes/exampleRouter');  
const authRouter = require('./routes/authRouter');

// Attach routes
router.use('/example', example);
router.use('/', authRouter);

module.exports = router;