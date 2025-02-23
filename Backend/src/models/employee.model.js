const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: {
      type: String,
      enum: ["HR", "Engineering", "Sales", "Marketing", "Others"],
      required: true,
    },
    salary: { type: Number, required: true },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
