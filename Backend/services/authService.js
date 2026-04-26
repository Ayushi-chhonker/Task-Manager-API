const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// register new user
const registerUser = async (name, email, password) => {

  // check if email already used
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("user already exists");
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(
    password,
    salt
  );

  // save user in database
  const newUser = await User.create({
    name: name,
    email: email,
    password: hash
  });

  // send basic user data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email
  };

};



// login existing user
const loginUser = async (email, password) => {

  // find user by email
  const user = await User.findOne({
    email: email
  });

  if (!user) {
    throw new Error("invalid email or password");
  }

  // check password
  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    throw new Error("invalid email or password");
  }

  // create token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // send user info with token
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token
  };

};


// export functions
module.exports = {
  registerUser,
  loginUser
};