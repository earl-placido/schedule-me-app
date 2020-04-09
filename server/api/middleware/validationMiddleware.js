const { check, validationResult } = require("express-validator");
const responses = require("../util/responses");

const groupRules = () => {
  return [
    check("groupName")
      .exists({ checkNull: true })
      .withMessage("Group name is required."),
    check("groupDesc")
      .optional({ checkFalsy: true })
      .isLength({ max: 225 })
      .withMessage("Group description cannot exceed 225 characters"),
    check("meetingDuration")
      .optional({ checkFalsy: true })
      .matches(/^(?:(?:([01]?\d|2[0-3]))?([0-5]?\d))?([0-5]?\d)$/, "i")
      .withMessage("Invalid meeting duration format, needs to be HHMMSS"),
    check("meetingFrequency")
      .optional({ checkFalsy: true })
      .isLength({ max: 2 })
      .withMessage("Meeting frequency cannot exceed 2 characters"),
    check("meetingLocation")
      .optional({ checkFalsy: true })
      .isLength({ max: 100 })
      .withMessage("Meeting location cannot exceed 100 characters")
  ];
};

const signUpRules = () => {
  return [
    check("email")
      .isEmail()
      .withMessage("Must follow email format"),
    check("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password must be between 8 and 100 characters"),
    check("firstName")
      .isLength({ min: 1, max: 100 })
      .withMessage("First name must be between 1 and 100 characters"),
    check("lastName")
      .isLength({ min: 1, max: 100 })
      .withMessage("Last name must be between 1 and 100 characters")
  ];
};

const loginRules = () => {
  return [
    check("email")
      .isEmail()
      .withMessage("Must follow email format"),
    check("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password must be between 8 and 100 characters")
  ];
};

const availabilityRules = () => {
  return [
    check("startTimes")
      .isArray({ min: 1 })
      .withMessage("startTimes is empty"),
    check("endTimes")
      .isArray({ min: 1 })
      .withMessage("endTimes is empty"),
    check("availabilityIds")
      .isArray({ min: 1 })
      .withMessage("availabilityIds is empty")
      .custom((availabilityIds, { req }) => {
        if (
          availabilityIds.length !== req.body.startTimes.length ||
          availabilityIds.length !== req.body.endTimes.length ||
          req.body.startTimes.length !== req.body.endTimes.length
        ) {
          throw new Error(
            "availabilityIds and startTime and endTime lengths are not the same"
          );
        }
        return true;
      })
  ];
};

const availabilityIdRules = () => {
  return [
    check("availabilityIds")
      .isArray({ min: 1 })
      .withMessage("availabilityIds is empty")
  ];
};

const groupIdRules = () => {
  return [
    check("groupId")
      .exists({ checkNull: true })
      .withMessage("Group Id is required.")
  ];
};

const groupMemberIdRules = () => {
  return [
    check("groupMemberId")
      .exists({ checkNull: true })
      .withMessage("Group Member Id is required.")
  ];
};

const userIdRules = () => {
  return [
    check("userId")
      .exists({ checkNull: true })
      .withMessage("User Id is required.")
  ];
};

const emailRules = () => {
  return [
    check("userEmail")
      .exists({ checkNull: true })
      .withMessage("Email is required.")
  ];
};

const getOptimalTimeRules = () => {
  return [
    check("stringMeetingIds").custom(stringMeetingIds => {
      const meetingIds = stringMeetingIds
        .split(",")
        .map(stringMeetingId => parseInt(stringMeetingId));
      if (meetingIds && meetingIds.length === 0) {
        throw new Error("meetingIds length cannot be 0!");
      }
      return true;
    })
  ];
};

const setOptimalTimeRules = () => {
  return [
    check("meetingId")
      .exists({ checkNull: true })
      .withMessage("Meeting Id is required."),
    check("startTime")
      .exists({ checkNull: true })
      .withMessage("Start time is required."),
    check("endTime")
      .exists({ checkNull: true })
      .withMessage("End time is required.")
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(responses.UNPROCESSABLE).json({ errors: errors.array() });
  } else {
    return next();
  }
};

module.exports = {
  groupRules,
  signUpRules,
  loginRules,
  availabilityRules,
  availabilityIdRules,
  groupIdRules,
  groupMemberIdRules,
  userIdRules,
  emailRules,
  getOptimalTimeRules,
  setOptimalTimeRules,
  validate
};
