const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");

//-------- Route: /api/auth/user/create (Create User) --------//
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
router.post("/", addUserValidation, async (req, res) => {
  const error = handleValidationErrors(req);
  if (Boolean(error)) return apiResponse(res, 400, error);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return apiResponse(res, 400, {
        error: "User with same email already exists!",
      });
    }

    user = new User(req.body);
    await user.save();

    return apiResponse(res, 200, user);
  } catch (error) {
    return apiResponse(res, 500, error);
  }
});

// Helper Functions
const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return { errors: errors.array() };

  return false;
};

const apiResponse = (res, code, message) => {
  return res.status(code).json(message);
};

module.exports = router;
