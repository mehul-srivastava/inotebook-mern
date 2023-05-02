const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");

// Add User Route
const addUserValidation = [
  body("name", "Name can only be between 3 and 50 characters!").isLength({
    min: 3,
    max: 50,
  }),
  body("email", "Email used is not in proper format!").isEmail(),
  body("password", "Password has to be greater than 5 characters!").isLength({
    min: 5,
  }),
];

router.post("/", addUserValidation, (req, res) => {
  const error = handleValidationErrors(req, res);
  if (Boolean(error)) return res.status(400).json(error);

  let user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).json({ user: "user added to db!" }))
    .catch((error) =>
      res
        .status(400)
        .json({ error: "This email already exists!", message: error.message })
    );
});

// Helper Functions
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return { errors: errors.array() };

  return false;
};

module.exports = router;
