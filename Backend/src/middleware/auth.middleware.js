const jwt = require("jsonwebtoken");
require("dotenv").config();
function authMiddleware(req, res, next) {
  let token =
    req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    const error = new Error("token is required");
    error.statusCode = 401;
    return next(error);
  }

  const decode = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        const error = new Error(err.message);
        error.statusCode = 401;
        return next(error);
      }
      req.user = decoded;
      next();
    }
  );
}
module.exports = authMiddleware;
