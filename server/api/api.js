const express = require('express');
const router = express.Router();


// API endpoints
const example = require('./routes/exampleRouter');  
const authRouter = require('./routes/authRouter');

// Attach routes
router.use('/', authRouter);
router.use('/example', example);



module.exports = router;