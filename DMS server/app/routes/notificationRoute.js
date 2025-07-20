const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticate } = require("../middleware/authMiddleware");

// Public routes (no authentication required)
router.post("/password-reset/send-otp", notificationController.sendPasswordResetOTP);
router.post("/password-reset/verify-otp", notificationController.verifyOTPAndResetPassword);

// Apply authentication middleware to protected routes
router.use(authenticate);

// In-app notification management
router.get("/", notificationController.getNotifications);
router.get("/unread-count", notificationController.getUnreadCount);
router.get("/stats", notificationController.getNotificationStats);
router.patch("/:notificationId/read", notificationController.markAsRead);
router.patch("/mark-all-read", notificationController.markAllAsRead);
router.delete("/:notificationId", notificationController.deleteNotification);

// Notification preferences
router.get("/preferences", notificationController.getNotificationPreferences);
router.put("/preferences", notificationController.updateNotificationPreferences);

// Testing and admin functions
router.post("/test", notificationController.testNotification);
router.post("/test-email", notificationController.testEmailConfiguration);

module.exports = router;
