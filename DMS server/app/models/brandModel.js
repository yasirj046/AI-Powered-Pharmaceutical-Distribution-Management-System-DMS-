const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { PROVINCE_ENUM } = require("../constants/provinces");
const { ALL_CITIES } = require("../constants/cities");

const brandSchema = new mongoose.Schema(
  {
    brandId: { 
      type: String, 
      required: true, 
      unique: true,
      index: true
    },
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    province: { 
      type: String, 
      required: true,
      enum: PROVINCE_ENUM
    },
    city: { 
      type: String, 
      required: true,
      enum: ALL_CITIES
    },
    address: { 
      type: String, 
      required: true,
      trim: true
    },
    primaryContact: { 
      type: String, 
      required: true,
      trim: true
    },
    secondaryContact: { 
      type: String, 
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

brandSchema.plugin(mongoosePaginate);
brandSchema.index({ name: "text", city: "text", province: "text" });
brandSchema.index({ province: 1, city: 1 });

module.exports = mongoose.model("Brand", brandSchema);
