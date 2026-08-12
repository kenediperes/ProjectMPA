// backend/src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/auth');

// All reports require Admin or Manager privileges
router.use(authenticate);
router.use(authorize(['admin', 'manager']));

// --- Core Reports (matches ERP Reporting Dashboard) ---
router.get('/sales', reportController.getSalesReport);
router.get('/inventory', reportController.getInventoryReport);
router.get('/financial', reportController.getFinancialReport);

// --- Communication Logs ---
router.get('/whatsapp-logs', reportController.getWhatsAppReport);
router.get('/telegram-logs', reportController.getTelegramReport);
router.get('/email-logs', reportController.getEmailReport);

// --- Management Dashboard Summary ---
router.get('/dashboard-summary', reportController.getDashboardSummary);
router.get('/recent-activities', reportController.getRecentActivities);

module.exports = router;