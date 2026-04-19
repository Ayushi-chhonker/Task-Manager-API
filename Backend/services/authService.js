const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================
// REGISTER USER
// =====================
const registerUser = async (name, email, password) => {
  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

// =====================
// LOGIN USER
// =====================
const loginUser = async (email, password) => {
  // check user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // create token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};