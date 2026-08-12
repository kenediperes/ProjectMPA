// backend/src/routes/qualityControlRoutes.js
const express = require('express');
const router = express.Router();
const qualityControlController = require('../controllers/qualityControlController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateQCResult } = require('../utils/validators');

router.get('/', authenticate, qualityControlController.getQCList);
router.get('/:id', authenticate, qualityControlController.getQCById);
router.post('/', authenticate, authorize(['admin', 'manager', 'qc']), qualityControlController.createQCRequest);

// --- QC Result Submission (Passed / Failed) ---
router.put('/:id/result', authenticate, authorize(['admin', 'manager', 'qc']), validateQCResult, qualityControlController.submitResult);
// Passed -> Finished Goods, Failed -> Rework Process

// --- Rework ---
router.put('/:id/rework', authenticate, authorize(['admin', 'manager']), qualityControlController.initiateRework);
router.put('/:id/rework-complete', authenticate, authorize(['admin', 'manager']), qualityControlController.completeRework);

module.exports = router;