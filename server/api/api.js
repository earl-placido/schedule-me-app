const express = require("express");
const router = express.Router();

// API endpoints
const example = require("./routes/exampleRouter");
// const authRouter = require('./routes/authRouter');
const groups = require("./routes/Groups/groupsRouter");
const users = require("./routes/userRouter.js");

// Attach routes
router.use("/example", example);
router.use("/groups", groups);
router.use("/users", users);
// router.use('/', authRouter);

module.exports = router;
