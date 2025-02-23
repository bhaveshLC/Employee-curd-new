const router = require("express").Router();
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getLoggedInUser,
  changePassword,
} = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const tryCatchMiddleware = require("../middleware/tryCatch.middleware");

router
  .get("/self", authMiddleware, tryCatchMiddleware(getLoggedInUser))
  .post("/signup", tryCatchMiddleware(registerUser))
  .post("/login", tryCatchMiddleware(loginUser))
  .post("/refresh-token", tryCatchMiddleware(refreshAccessToken))
  .post("/logout", tryCatchMiddleware(logoutUser))
  .put("/change-password", authMiddleware, tryCatchMiddleware(changePassword));
module.exports = { authRoute: router };
