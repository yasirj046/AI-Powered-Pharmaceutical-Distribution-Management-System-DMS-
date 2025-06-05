const userService = require("../services/userService");
const util = require("../util/util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userService.findByEmail(email);

    if (!user) {
      return res.status(200).json(util.createResponse(null, { message: "User not found" }));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json(util.createResponse(null, { message: "Invalid credentials" }));
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json(util.createResponse({ token, user }, null, "Login successful"));
  } catch (error) {
    res.status(200).json(util.createResponse(null, error));
  }
};

exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.pageNumber) || 1;
  const limit = parseInt(req.query.pageSize) || 10;
  const keyword = req.query.keyword || "";

  try {
    const users = await userService.getAllUsers(page, limit, keyword);
    res.status(200).json(util.createResponse(users, null, "All Users"));
  } catch (error) {
    res.status(200).json(util.createResponse([], error));
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(200).json(util.createResponse(null, { message: "No User Found" }));
    }
    res.status(200).json(util.createResponse(user, null, "User Found"));
  } catch (error) {
    res.status(200).json(util.createResponse(null, error));
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(200).json(util.createResponse(null, { message: "No User Found" }));
    }
    res.status(200).json(util.createResponse(updatedUser, null, "User Updated"));
  } catch (error) {
    res.status(200).json(util.createResponse(null, error));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(200).json(util.createResponse(null, { message: "No User Found" }));
    }
    res.status(200).json(util.createResponse(deletedUser, null, "User Deleted"));
  } catch (error) {
    res.status(200).json(util.createResponse(null, error));
  }
};