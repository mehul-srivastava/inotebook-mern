// Imports
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const fetchuser = (req, res, next) => {
  // Get user from JWT auth token
  const authToken = req.header("Auth-Token");
  if (!authToken)
    return res
      .status(401)
      .json({ error: "You Are Not Authorized To Access This Page!" });

  try {
    const data = jwt.verify(authToken, JWT_SECRET_KEY);
    req.user_id = data.user_id;
    next();
  } catch (e) {
    return res.status(401).json({
      error: "You Are Not Authorized To Access This Page!",
    });
  }
};

module.exports = fetchuser;
