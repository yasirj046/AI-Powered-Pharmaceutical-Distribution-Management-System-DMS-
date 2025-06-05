const User = require("../models/userModel");

exports.findByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.getAllUsers = async (page, limit, keyword) => {
  let query = {};
  if (keyword !== "") {
    query.$text = { $search: keyword };
  }
  return await User.paginate(query, { page, limit });
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};