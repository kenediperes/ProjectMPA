// backend/src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate } = require('../middleware/auth');

// --- In-App Notifications ---
router.get('/', authenticate, notificationController.getNotifications);
router.get('/unread/count', authenticate, notificationController.getUnreadCount);
router.put('/:id/read', authenticate, notificationController.markAsRead);
router.put('/read-all', authenticate, notificationController.markAllAsRead);

// --- Send External Notifications (Triggers) ---
router.post('/send/email', authenticate, notificationController.sendEmailNotification);
router.post('/send/whatsapp', authenticate, notificationController.sendWhatsAppNotification);
router.post('/send/telegram', authenticate, notificationController.sendTelegramNotification);

module.exports = router;