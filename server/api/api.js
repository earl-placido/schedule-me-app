const express = require("express");
const router = express.Router();

// API endpoints
const example = require("./routes/exampleRouter");
const authRouter = require("./routes/authRouter");
const groupMembers = require("./routes/groupMembersRouter");
const groups = require("./routes/groupsRouter");

// Attach routes
router.use("/example", example);
router.use("/groups", groups);
router.use("/groupMembers", groupMembers);
router.use("/auth", authRouter);

module.exports = router;
