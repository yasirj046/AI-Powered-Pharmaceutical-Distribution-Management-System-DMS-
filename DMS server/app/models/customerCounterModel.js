const mongoose = require("mongoose");

const customerCounterSchema = new mongoose.Schema({
  sequence: { 
    type: Number, 
    default: 0 
  }
});

// Single document for global counter
customerCounterSchema.index({ _id: 1 }, { unique: true });

module.exports = mongoose.model("CustomerCounter", customerCounterSchema);
