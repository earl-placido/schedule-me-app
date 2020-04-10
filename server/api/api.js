const express = require("express");
const router = express.Router();
const container = require("./container/container");

// Attach routes
router.use("/users", container.usersRouter);
router.use("/groups", container.groupsRouter);
router.use("/groups", container.availabilityRouter);
router.use("/auth", container.authRouter);

module.exports = router;
