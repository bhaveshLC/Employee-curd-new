const jwt = require("jsonwebtoken");
require("dotenv").config();
function generateAccessToken(user) {
  return jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
}
async function refreshAccessToken(refreshToken) {
  const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decode) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 400;
    error.name = "RefreshTokenExpired";
    throw error;
  }
  const accessToken = generateAccessToken(decode);
  return accessToken;
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
};
