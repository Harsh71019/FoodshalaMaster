const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get token from header
  const admintoken = req.header("x-auth-token");

  //Check if no token
  if (!admintoken) {
    return res.status(401).json({ msg: "No token , authorization denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(admintoken, config.get("jwtSecret"));
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};