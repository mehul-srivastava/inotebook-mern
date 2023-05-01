const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", (req, res) => {
  let user = User(req.body); //check this online and fix
  user.save();
  res.send(req.body);
});

module.exports = router;
