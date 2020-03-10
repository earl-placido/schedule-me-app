const express = require("express");
const router = express.Router();

// API endpoints
const example = require("./routes/exampleRouter");
const authRouter = require("./routes/authRouter");
const groups = require("./routes/Groups/groupsRouter");
const users = require("./routes/usersRouter");

// Attach routes
router.use("/example", example);
router.use("/users", users);
router.use("/groups", groups);
router.use("/", authRouter);

module.exports = router;
