const User = require("../models/user.model");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

async function updateUser(userId, userData) {
  const user = await User.findByIdAndUpdate(userId, userData, { new: true });
  if (!user) {
    const error = new Error("No User Found...");
    error.statusCode = 404;
    throw error;
  }
  return {
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  };
}
async function changePassword(userId, password, newPassword) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Incorrect old password.");
    error.statusCode = 400;
    throw error;
  }
  user.password = newPassword;
  await user.save();
  return;
}

async function uploadProfilePicture(userId, profile) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not Found");
    error.statusCode = 404;
    throw error;
  }
  const userProfile = await uploadToCloudinary(profile);
  user.profilePicture = userProfile.url;
  await user.save();
  return user.profilePicture;
}
async function removeProfilePicture(userId) {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("No user Found");
    error.statusCode = 404;
    throw error;
  }
  user.profilePicture = null;
  await user.save();
  return user.profilePicture;
}
module.exports = {
  updateUser,
  changePassword,
  uploadProfilePicture,
  removeProfilePicture,
};
