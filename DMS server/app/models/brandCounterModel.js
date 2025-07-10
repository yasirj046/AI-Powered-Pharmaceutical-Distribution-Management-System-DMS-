const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  province: { type: String, required: true },
  city: { type: String, required: true },
  sequence: { type: Number, default: 0 }
});

counterSchema.index({ province: 1, city: 1 }, { unique: true });

module.exports = mongoose.model("BrandCounter", counterSchema);
