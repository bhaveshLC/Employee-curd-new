const router = require("express").Router();
const multer = require("multer");
const tryCatchMiddleware = require("../middleware/tryCatch.middleware");
const {
  uploadProfile,
  changePassword,
  updateUser,
  removeProfilePicture,
} = require("../controller/user.controller");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({ storage, fileFilter });
router
  .put(
    "/upload-profile",
    uploads.single("profile"),
    tryCatchMiddleware(uploadProfile)
  )
  .put("/change-password", tryCatchMiddleware(changePassword))
  .put("/", tryCatchMiddleware(updateUser))
  .delete("/profile", tryCatchMiddleware(removeProfilePicture));

module.exports = { userRoute: router };
