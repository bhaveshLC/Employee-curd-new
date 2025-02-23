const Employee = require("../models/employee.model");
const employeeSchemaValidations = require("../validation/employee.validation");

async function addEmployee(employeeData, userId) {
  await employeeSchemaValidations.validateAsync({
    ...employeeData,
    addedBy: userId,
  });
  const { email, name, department, salary } = employeeData;
  const existingEmployee = await Employee.findOne({
    email,
  });
  if (existingEmployee) {
    const error = new Error("Employee with this email already exists.");
    error.statusCode = 409;
    throw error;
  }
  const newEmployee = await Employee.create({
    email,
    name,
    department,
    salary,
    addedBy: userId,
  });
  return newEmployee;
}
async function getEmployees(page, limit, search, department, sortBy) {
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
    ];
  }
  if (department) {
    query.department = department;
  }
  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = 1;
  }
  const employees = await Employee.find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit);
  const totalEmployees = await Employee.countDocuments(query);
  const totalPages = Math.ceil(totalEmployees / limit);
  return { employees, totalEmployees, currentPage: page, limit, totalPages };
}

async function getEmployeeById(id) {
  const employee = await Employee.findById(id);
  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }
  return employee;
}
async function updateEmployee(id, employeeData) {
  const { name, email, department, addedBy, salary } = employeeData;
  await employeeSchemaValidations.validateAsync({
    name,
    email,
    department,
    addedBy,
    salary,
  });
  const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeData, {
    new: true,
  });
  if (!updatedEmployee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }
  return updatedEmployee;
}

async function deleteEmployeeById(id) {
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  if (!deletedEmployee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }
  return deletedEmployee;
}
module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployeeById,
};
