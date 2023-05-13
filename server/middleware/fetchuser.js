// Imports
// require("dotenv").config({ path: "../.env.local" });
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const fetchuser = (req, res, next) => {
  // Get user from JWT auth token
  const authToken = req.header("auth-token");
  if (!authToken)
    return res
      .status(401)
      .json({ error: "You Are Not Authorized To Access This Page!" });

  try {
    const data = jwt.verify(authToken, JWT_SECRET_KEY);
    req.user = data.id;
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ error: "You Are Not Authorized To Access This Page!" });
  }
};

module.exports = fetchuser;
