const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/", authenticate, userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById);
router.put("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;