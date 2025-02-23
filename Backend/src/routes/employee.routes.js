const {
  getEmployeeById,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  addEmployee,
} = require("../controller/employee.controller");
const tryCatchMiddleware = require("../middleware/tryCatch.middleware");

const router = require("express").Router();

router
  .get("/", tryCatchMiddleware(getEmployees))
  .get("/:id", tryCatchMiddleware(getEmployeeById))
  .post("/", tryCatchMiddleware(addEmployee))
  .put("/:id", tryCatchMiddleware(updateEmployee))
  .delete("/:id", tryCatchMiddleware(deleteEmployee));

module.exports = { employeeRoute: router };
