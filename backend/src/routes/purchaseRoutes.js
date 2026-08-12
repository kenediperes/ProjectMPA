// backend/src/routes/purchaseRoutes.js
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { authenticate, authorize } = require('../middleware/auth');
const { validatePurchaseOrder } = require('../utils/validators');

// --- Suppliers ---
router.get('/suppliers', authenticate, purchaseController.getSuppliers);
router.post('/suppliers', authenticate, authorize(['admin', 'manager']), purchaseController.createSupplier);
router.put('/suppliers/:id/approve', authenticate, authorize(['admin']), purchaseController.approveSupplier); // Supplier Approval from flowchart

// --- Purchase Orders (PO) ---
router.get('/orders', authenticate, purchaseController.getPurchaseOrders);
router.get('/orders/:id', authenticate, purchaseController.getPurchaseOrderById);
router.post('/orders', authenticate, validatePurchaseOrder, purchaseController.createPurchaseOrder);
router.put('/orders/:id', authenticate, authorize(['admin', 'manager']), purchaseController.updatePurchaseOrder);

// --- PO Lifecycle ---
router.put('/orders/:id/approve', authenticate, authorize(['admin', 'manager']), purchaseController.approvePurchaseOrder);
router.put('/orders/:id/receive', authenticate, authorize(['admin', 'manager', 'warehouse']), purchaseController.receiveStock); // Triggers Stock In

module.exports = router;