const jwt = require("jsonwebtoken");

const userAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorisation;

  const splittedToken = token.split("Bearer")[0];
  try {
    const verified = jwt.verify(splittedToken, secret);

    if (verified) {
      next();
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
