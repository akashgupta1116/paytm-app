const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorisation;
  if (!token || token.startsWith('"Bearer"')) {
    res.status(403).json({});
  }

  const splittedToken = token.split(" ")[1];
  try {
    const verified = jwt.verify(splittedToken, JWT_SECRET);
    if (verified) {
      req.userId = verified.userId;
      next();
    } else {
      res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({
      msg: "User does not exist",
    });
  }
};

module.exports = {
  userAuthMiddleware,
};
