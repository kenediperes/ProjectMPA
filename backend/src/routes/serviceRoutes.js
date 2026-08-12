// backend/src/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middleware/auth');

// --- Service Orders ---
router.get('/', authenticate, serviceController.getServiceOrders);
router.get('/:id', authenticate, serviceController.getServiceOrderById);
router.post('/', authenticate, serviceController.createServiceOrder);
router.put('/:id', authenticate, serviceController.updateServiceOrder);

// --- Task Assignment (as per flowchart) ---
router.put('/:id/tasks', authenticate, authorize(['admin', 'manager']), serviceController.assignTasks); // Task Assignment
router.put('/:id/status', authenticate, serviceController.updateServiceStatus);

// --- Employee Schedule (optional) ---
router.get('/employees', authenticate, serviceController.getAvailableEmployees);

module.exports = router;