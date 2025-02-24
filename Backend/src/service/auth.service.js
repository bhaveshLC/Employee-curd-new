const User = require("../models/user.model");
const userSchemaValidation = require("../validation/user.validation");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  generateRefreshToken,
  generateAccessToken,
} = require("./token.service");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
require("dotenv").config();
async function registerUser(userData) {
  await userSchemaValidation.validateAsync(userData);
  const { name, email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already exists.");
    error.statusCode = 409;
    throw error;
  }
  const logo = `https://ui-avatars.com/api/name=${name}`;
  const newUser = await User.create({
    name,
    email,
    password,
    profilePicture: logo,
  });
  return;
}
async function userLogin(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new Error("Incorrect password.");
    error.statusCode = 400;
    throw error;
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  return {
    userId: user._id,
    token: accessToken,
    refreshToken,
  };
}
async function logoutUser(token) {
  const decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decode._id);
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  user.refreshToken = null;
  await user.save();
  return;
}
async function getLoggedInUser(userId) {
  const user = await User.findById(userId).select("name email profilePicture");
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

module.exports = {
  registerUser,
  userLogin,
  getLoggedInUser,
  logoutUser,
};
