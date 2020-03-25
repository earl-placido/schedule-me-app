const express = require("express");
const router = express.Router();

// API endpoints
const authRouter = require("./routes/authRouter");
const groups = require("./routes/groups/groupsRouter");
const users = require("./routes/usersRouter");

// Attach routes
router.use("/users", users);
router.use("/groups", groups);
router.use("/auth", authRouter);

module.exports = router;
