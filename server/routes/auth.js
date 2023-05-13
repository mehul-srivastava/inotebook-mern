require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

/*---------------------- /api/auth/signup/ (Create User)-----------------------*/
const signupUserValidation = [
  body("name", "Name should be between 3 to 50 characters long!")
    .isString()
    .isLength({ min: 3, max: 50 }),
  body("email", "Email should be in a valid format!").isEmail(),
  body("password", "Password should be greater than 3 characters!").isLength({
    min: 3,
  }),
];
router.post("/signup", signupUserValidation, async (req, res) => {
  try {
    // Form Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    // Check If User Exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with same email already exists!" });
    }

    // Hash Password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create User
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // JWT Auth Token
    let payload = {
      id: user.id,
    };
    let authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Success Response
    res.status(200).json({ authToken });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/*---------------------- /api/auth/login/ (Authenticate User)-----------------------*/
const loginUserValidation = [
  body("email", "Email should be in a valid format!").isEmail(),
  body("password", "Password should not be blank!").exists(),
];
router.post("/login", loginUserValidation, async (req, res) => {
  // Form Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  // Destructuring Request From Body
  const { email, password } = req.body;

  try {
    // Check If Email Exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Incorrect Credentials!" });

    // Check If Password Matches
    const passwordCheck = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordCheck)
      return res.status(400).json({ error: "Incorrect Credentials!" });

    // JWT Auth Token
    let payload = {
      id: user.id,
    };
    let authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Success Response
    res.status(200).json({ authToken });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
