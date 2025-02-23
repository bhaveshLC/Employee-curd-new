const express = require("express");
const helmet = require("helmet");
const { authRoute } = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./config/connection");
const { employeeRoute } = require("./routes/employee.routes");
const authMiddleware = require("./middleware/auth.middleware");
const app = express();
const options = {
  origin: "http://localhost:4200",
  credentials: true,
};

app.use(cors(options));

const port = process.env.PORT || 8000;
connectToDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use("/auth", authRoute);
app.use("/employee", authMiddleware, employeeRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
