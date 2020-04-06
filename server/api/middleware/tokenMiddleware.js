const jwt = require("jsonwebtoken");
const responses = require("../util/responses");

const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";
const TOKEN_EXPIRY = "1d";

const createToken = (req, res, next) => {
  req.token = jwt.sign({ userID: req.auth.id }, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRY
  });
  return next();
};

const sendToken = (req, res) => {
  res.setHeader("x-auth-token", req.token);
  return res.status(responses.SUCCESS).send(JSON.stringify(req.user));
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token ? token : authHeader, SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(responses.FORBIDDEN)
          .send({ error: `Error with token verification: ${err}` });
      } else if (!user.userID) {
        return res
          .status(responses.NOT_FOUND)
          .send({ error: `userId is required.` });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res
      .status(responses.UNAUTHORIZED)
      .send({ error: "Authorization header not found." });
  }
};

module.exports = {
  createToken,
  sendToken,
  authenticateToken
};
