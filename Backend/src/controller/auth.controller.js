const User = require("../models/user.model");
const authService = require("../service/auth.service");
const tokenService = require("../service/token.service");

async function registerUser(req, res) {
  const employee = await authService.registerUser(req.body);
  res.status(201).json(employee);
}
async function loginUser(req, res) {
  const { email, password } = req.body;
  const { userId, token, refreshToken } = await authService.userLogin(
    email,
    password
  );
  res.cookie("accessToken", token, {
    httpOnly: false,
    secure: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({});
}

async function refreshAccessToken(req, res) {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    const error = new Error("Refresh token is required");
    error.statusCode = 400;
    throw error;
  }
  const token = await tokenService.refreshAccessToken(refreshToken);
  res.cookie("accessToken", token, {
    httpOnly: false,
    secure: true,
  });
  res.status(200).json(token);
}

async function logoutUser(req, res) {
  const token = req.cookies?.accessToken;
  await authService.logoutUser(token);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).json();
}
async function getLoggedInUser(req, res) {
  const userId = req.user._id;
  const user = await authService.getLoggedInUser(userId);
  res.status(200).json(user);
}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  getLoggedInUser,
  logoutUser,
};
