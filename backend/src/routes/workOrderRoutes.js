// backend/src/routes/workOrderRoutes.js
const express = require('express');
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, workOrderController.getWorkOrders);
router.get('/:id', authenticate, workOrderController.getWorkOrderById);
router.post('/', authenticate, authorize(['admin', 'manager']), workOrderController.createWorkOrder);
router.put('/:id', authenticate, authorize(['admin', 'manager']), workOrderController.updateWorkOrder);

// --- Production Lifecycle ---
router.put('/:id/start', authenticate, authorize(['admin', 'manager']), workOrderController.startProduction);
router.put('/:id/status', authenticate, workOrderController.updateProductionStatus); // Assembly, Processing
router.put('/:id/complete', authenticate, authorize(['admin', 'manager']), workOrderController.completeWorkOrder); // Moves to QC

module.exports = router;