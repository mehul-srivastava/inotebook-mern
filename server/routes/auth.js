// Imports
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Middlewares
const fetchUser = require("../middleware/fetchuser");

// Models
const User = require("../models/User");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

/*---------------------- ROUTE #1: POST /api/auth/signup/ (Create User)-----------------------*/
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
    let authToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

    // Success Response
    res.status(200).json({ authToken });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/*---------------------- ROUTE #2: POST /api/auth/login/ (Authenticate User)-----------------------*/
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
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "Incorrect Credentials!" });

    // Check If Password Matches
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck)
      return res.status(400).json({ error: "Incorrect Credentials!" });

    // JWT Auth Token
    let payload = {
      id: user.id,
    };
    let authToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

    // Success Response
    res.status(200).json({ authToken });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/*---------------------- ROUTE #3: POST /api/auth/user/ (Get User Details)-----------------------*/
router.post("/user", fetchUser, async (req, res) => {
  try {
    let userId = req.user_id;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: "Internal Server Error!" });
  }
});
module.exports = router;
