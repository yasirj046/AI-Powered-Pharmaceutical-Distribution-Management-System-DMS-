const mongoose = require("mongoose");

const inventoryCounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  sequence_value: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("InventoryCounter", inventoryCounterSchema);
