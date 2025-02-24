const userService = require("../service/user.service");
async function changePassword(req, res) {
  const userId = req.user._id;
  const { password, newPassword } = req.body;
  await userService.changePassword(userId, password, newPassword);
  res.status(200).json({});
}
async function uploadProfile(req, res) {
  const userId = req.user._id;
  const profilePicture = req.file.path;
  const userProfile = await userService.uploadProfilePicture(
    userId,
    profilePicture
  );
  res.status(200).json({ profile: userProfile });
}
async function updateUser(req, res) {
  const userId = req.user._id;
  const user = await userService.updateUser(userId, req.body);
  res.status(200).json(user);
}
async function removeProfilePicture(req, res) {
  const userId = req.user._id;
  const userProfile = await userService.removeProfilePicture(userId);
  res.status(200).json(userProfile);
}
module.exports = {
  changePassword,
  uploadProfile,
  updateUser,
  removeProfilePicture,
};
