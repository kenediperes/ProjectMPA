// backend/src/routes/salesRoutes.js
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateSalesOrder } = require('../utils/validators');

// --- Sales Quotations ---
router.get('/quotations', authenticate, salesController.getQuotations);
router.post('/quotations', authenticate, salesController.createQuotation);
router.put('/quotations/:id/convert', authenticate, salesController.convertQuotationToOrder);

// --- Sales Orders (SO) ---
router.get('/orders', authenticate, salesController.getOrders);
router.get('/orders/:id', authenticate, salesController.getOrderById);
router.post('/orders', authenticate, validateSalesOrder, salesController.createOrder);
router.put('/orders/:id', authenticate, validateSalesOrder, salesController.updateOrder);
router.put('/orders/:id/status', authenticate, salesController.updateOrderStatus); // e.g., "confirmed", "shipped"
router.delete('/orders/:id', authenticate, authorize(['admin']), salesController.deleteOrder);

// --- Customer Management (optional, or separate) ---
router.get('/customers', authenticate, salesController.getCustomers);
router.post('/customers', authenticate, salesController.createCustomer);

module.exports = router;