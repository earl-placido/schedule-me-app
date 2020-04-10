const Bottle = require("bottlejs");
const bottle = new Bottle();

const sqlService = require("./services/sqlService");
const { comparePasswordAsync } = require("../util/bcryptHelper");

const availabilityModel = require("../model/availabilityModel");
const groupMemberModel = require("../model/groupMemberModel");
const groupsModel = require("../model/groupsModel");
const userModel = require("../model/userModel");

const groupsRouter = require("../routes/groups/groupsRouter");
const availabilityRouter = require("../routes/groups/availabilityRouter");
const authRouter = require("../routes/authRouter");
const usersRouter = require("../routes/usersRouter");

bottle.constant("sqlService", sqlService);
bottle.constant("comparePasswordAsync", comparePasswordAsync);

bottle.serviceFactory("availabilityModel", availabilityModel, "sqlService");
bottle.serviceFactory("groupMemberModel", groupMemberModel, "sqlService");
bottle.serviceFactory("groupsModel", groupsModel, "sqlService");
bottle.serviceFactory("userModel", userModel, "sqlService", "comparePasswordAsync");

bottle.serviceFactory(
  "groupsRouter",
  groupsRouter,
  "groupsModel",
  "groupMemberModel"
);

bottle.serviceFactory(
  "availabilityRouter",
  availabilityRouter,
  "availabilityModel"
);

bottle.serviceFactory("authRouter", authRouter, "userModel");
bottle.serviceFactory("usersRouter", usersRouter, "userModel");

module.exports = bottle.container;
