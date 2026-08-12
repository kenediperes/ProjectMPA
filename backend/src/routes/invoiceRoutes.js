// backend/src/routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateInvoice } = require('../utils/validators');

router.get('/', authenticate, invoiceController.getInvoices);
router.get('/unpaid', authenticate, invoiceController.getUnpaidInvoices); // For reminders
router.get('/:id', authenticate, invoiceController.getInvoiceById);

// --- Generate Invoice from Sales Order ---
router.post('/', authenticate, validateInvoice, invoiceController.createInvoice);
router.put('/:id', authenticate, authorize(['admin', 'manager']), invoiceController.updateInvoice);

// --- Payment Lifecycle ---
router.put('/:id/pay', authenticate, invoiceController.confirmPayment); // Payment Confirmation -> Close Invoice
router.put('/:id/cancel', authenticate, authorize(['admin']), invoiceController.cancelInvoice);

// --- Automatic Reminders (as per flowchart) ---
router.post('/:id/remind', authenticate, invoiceController.sendReminder); // Triggers WhatsApp/Telegram/Email
router.post('/remind-all-overdue', authenticate, authorize(['admin']), invoiceController.remindAllOverdue);

module.exports = router;