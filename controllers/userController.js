const asyncHandler = require("express-async-handler");
// Import bycrpt
const bcrpt = require("bcrypt");
// Import the model
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register a user
// POST /api/users/register
// access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash pasword
  const hashedPassword = await bcrpt.hash(password, 10);

  // Create a new user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

// Login user
// POST /api/users/login
// access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  // Compare password with hashedpassword
  if (user && (await bcrpt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

// Current user info
// POST /api/users/current
// access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser };
