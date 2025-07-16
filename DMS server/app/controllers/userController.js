const userService = require("../services/userService");
const util = require("../util/util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json(
        util.createResponse(null, { message: "Email and password are required" })
      );
    }

    // Find user by email (case-insensitive)
    const user = await userService.findByEmail(email.trim().toLowerCase());
    
    if (!user) {
      return res.status(200).json(
        util.createResponse(null, { message: "Invalid email or password" })
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(200).json(
        util.createResponse(null, { message: "Invalid email or password" })
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        name: user.name
      }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(200).json(
      util.createResponse(
        { token, user: userData }, 
        null, 
        "Login successful"
      )
    );

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json(
      util.createResponse(null, { message: "Internal server error" })
    );
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json(
        util.createResponse(null, { message: "Name, email and password are required" })
      );
    }

    if (password.length < 6) {
      return res.status(400).json(
        util.createResponse(null, { message: "Password must be at least 6 characters long" })
      );
    }

    // Check if user already exists
    const existingUser = await userService.findByEmail(email.trim().toLowerCase());
    if (existingUser) {
      return res.status(400).json(
        util.createResponse(null, { message: "User with this email already exists" })
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    };

    const user = await userService.createUser(userData);

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        name: user.name
      }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data without password
    const responseUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(201).json(
      util.createResponse(
        { token, user: responseUser }, 
        null, 
        "User registered successfully"
      )
    );

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json(
      util.createResponse(null, { message: "Internal server error" })
    );
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