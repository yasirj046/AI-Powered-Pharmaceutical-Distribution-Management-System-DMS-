const mongoose = require("mongoose");

const employeeCounterSchema = new mongoose.Schema({
  sequence: { type: Number, default: 0 }
});

// Single document for global counter
employeeCounterSchema.index({ _id: 1 }, { unique: true });

module.exports = mongoose.model("EmployeeCounter", employeeCounterSchema);
