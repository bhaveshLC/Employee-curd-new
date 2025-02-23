const employeeService = require("../service/employee.service");

async function addEmployee(req, res) {
  const userId = req.user._id;
  const newEmployee = await employeeService.addEmployee(req.body, userId);
  res.status(201).json(newEmployee);
}
async function getEmployees(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const department = req.query.department || "";
  const sortBy = req.query.sortBy || "";
  const employees = await employeeService.getEmployees(
    page,
    limit,
    search,
    department,
    sortBy
  );
  res.json(employees);
}

async function getEmployeeById(req, res) {
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.json(employee);
}

async function updateEmployee(req, res) {
  const updatedEmployee = await employeeService.updateEmployee(
    req.params.id,
    req.body
  );
  res.json(updatedEmployee);
}

async function deleteEmployee(req, res) {
  const userId = req.user._id;
  const deletedEmployee = await employeeService.deleteEmployeeById(
    req.params.id
  );
  res.status(200).json(deletedEmployee);
}
module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
