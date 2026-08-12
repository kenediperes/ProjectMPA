// backend/src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateProduct } = require('../utils/validators');

// --- Public (authenticated users can view products) ---
router.get('/', authenticate, productController.getAll);
router.get('/:id', authenticate, productController.getOne);
router.get('/:id/stock-history', authenticate, productController.getStockHistory);

// --- Protected Write Operations (Admin/Manager only) ---
router.post('/', authenticate, authorize(['admin', 'manager']), validateProduct, productController.create);
router.put('/:id', authenticate, authorize(['admin', 'manager']), validateProduct, productController.update);
router.delete('/:id', authenticate, authorize(['admin']), productController.delete);

// --- Inventory Adjustments (Stock In / Stock Out) ---
router.patch('/:id/stock-in', authenticate, authorize(['admin', 'manager', 'warehouse']), productController.stockIn);
router.patch('/:id/stock-out', authenticate, authorize(['admin', 'manager', 'warehouse']), productController.stockOut);
router.patch('/:id/reserve', authenticate, productController.reserveStock); // Reserve Inventory from flowchart

module.exports = router;