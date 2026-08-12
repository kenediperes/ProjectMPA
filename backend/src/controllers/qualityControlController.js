// backend/src/controllers/qualityControlController.js
const { models } = require('../config/database');
const { Op } = require('sequelize');

/**
 * Create a new Quality Control inspection record.
 * Expected body: { work_order_id, product_id, inspector, result, defects }
 * result must be 'pass' or 'fail'
 */
exports.createInspection = async (req, res, next) => {
  try {
    const { work_order_id, product_id, inspector, result, defects } = req.body;

    // Validate required fields
    if (!work_order_id || !product_id || !inspector || !result) {
      return res.status(400).json({ error: 'Missing required fields: work_order_id, product_id, inspector, result' });
    }

    // Validate result value
    if (!['pass', 'fail'].includes(result.toLowerCase())) {
      return res.status(400).json({ error: 'result must be "pass" or "fail"' });
    }

    // Check if work order exists
    const workOrder = await models.WorkOrder.findByPk(work_order_id);
    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    // Check if product exists
    const product = await models.Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if inspector (user) exists
    const inspectorUser = await models.User.findByPk(inspector);
    if (!inspectorUser) {
      return res.status(404).json({ error: 'Inspector user not found' });
    }

    const qc = await models.QualityControl.create({
      work_order_id,
      product_id,
      inspection_date: new Date(),
      inspector,
      result: result.toLowerCase(),
      defects: defects || null,
      rework_status: 'none',
    });

    res.status(201).json({
      message: 'Quality Control inspection created',
      data: qc,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing QC inspection result.
 * Also handles rework logic and finished goods stock-in if production work order.
 */
exports.updateResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { result, defects } = req.body;

    if (!result) {
      return res.status(400).json({ error: 'result is required' });
    }
    if (!['pass', 'fail'].includes(result.toLowerCase())) {
      return res.status(400).json({ error: 'result must be "pass" or "fail"' });
    }

    const qc = await models.QualityControl.findByPk(id);
    if (!qc) {
      return res.status(404).json({ error: 'QC record not found' });
    }

    // Prevent re-updating if already processed
    if (qc.result && qc.result !== 'pending') {
      return res.status(400).json({ error: `This QC record is already finalized with result: ${qc.result}` });
    }

    // Update QC record
    await qc.update({
      result: result.toLowerCase(),
      defects: defects || qc.defects,
    });

    // Get associated work order
    const workOrder = await models.WorkOrder.findByPk(qc.work_order_id);
    if (!workOrder) {
      // Should not happen, but handle gracefully
      return res.status(404).json({ error: 'Associated work order not found' });
    }

    // Handle based on result
    if (result.toLowerCase() === 'pass') {
      // Pass: If this is a production work order, add finished goods to stock
      if (workOrder.order_type === 'production') {
        // You might need to know the quantity produced. For simplicity, assume 1 unit per QC.
        // In a real system, you might have a quantity field on QC or work order.
        const quantity = 1; // Adjust as needed

        // Update product stock
        const product = await models.Product.findByPk(qc.product_id);
        if (product) {
          await product.increment('stock_quantity', { by: quantity });
        }

        // Log inventory transaction
        await models.InventoryTransaction.create({
          product_id: qc.product_id,
          transaction_type: 'stock_in',
          quantity: quantity,
          reference_type: 'work_order',
          reference_id: workOrder.id,
          notes: `Finished goods from production (QC #${qc.id} passed)`,
        });
      }

      // Update work order status to completed (if not already)
      if (workOrder.status !== 'completed') {
        await workOrder.update({ status: 'completed' });
      }

      // Set rework_status to 'none' (already)
      await qc.update({ rework_status: 'none' });

      res.json({
        message: 'QC result updated to PASS. Stock updated if applicable.',
        data: qc,
      });
    } else {
      // Fail: Mark for rework
      await qc.update({ rework_status: 'pending' });

      // Optionally, you can create a rework task or update work order status
      // For now, we'll just update work order status to 'in_progress' if it was 'completed' (shouldn't happen)
      if (workOrder.status === 'completed') {
        await workOrder.update({ status: 'in_progress' });
      }

      res.json({
        message: 'QC result updated to FAIL. Rework is pending.',
        data: qc,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get all QC records with optional filters (work_order_id, product_id, result)
 */
exports.getAllQC = async (req, res, next) => {
  try {
    const { work_order_id, product_id, result } = req.query;
    const where = {};
    if (work_order_id) where.work_order_id = work_order_id;
    if (product_id) where.product_id = product_id;
    if (result) where.result = result;

    const qcList = await models.QualityControl.findAll({
      where,
      order: [['inspection_date', 'DESC']],
      include: [
        { model: models.WorkOrder, attributes: ['id', 'order_type', 'status'] },
        { model: models.Product, attributes: ['id', 'name', 'sku'] },
        { model: models.User, as: 'inspectorUser', attributes: ['id', 'full_name'] }, // if you set alias
      ],
    });

    res.json(qcList);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single QC record by ID
 */
exports.getQCById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const qc = await models.QualityControl.findByPk(id, {
      include: [
        { model: models.WorkOrder, attributes: ['id', 'order_type', 'status'] },
        { model: models.Product, attributes: ['id', 'name', 'sku'] },
        { model: models.User, as: 'inspectorUser', attributes: ['id', 'full_name'] },
      ],
    });
    if (!qc) {
      return res.status(404).json({ error: 'QC record not found' });
    }
    res.json(qc);
  } catch (error) {
    next(error);
  }
};

/**
 * Update rework status (e.g., after rework is completed)
 */
exports.updateReworkStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rework_status } = req.body;

    if (!rework_status) {
      return res.status(400).json({ error: 'rework_status is required' });
    }
    if (!['none', 'pending', 'completed'].includes(rework_status)) {
      return res.status(400).json({ error: 'rework_status must be "none", "pending", or "completed"' });
    }

    const qc = await models.QualityControl.findByPk(id);
    if (!qc) {
      return res.status(404).json({ error: 'QC record not found' });
    }

    // Only allow update if current result is 'fail' and rework_status was 'pending'
    if (qc.result !== 'fail') {
      return res.status(400).json({ error: 'Rework status can only be updated for failed QC records' });
    }

    await qc.update({ rework_status });

    // If rework completed, optionally update work order or run another QC
    if (rework_status === 'completed') {
      // You might want to create a new QC entry automatically, or mark work order as needing re-inspection.
      // For now, just log.
    }

    res.json({
      message: `Rework status updated to ${rework_status}`,
      data: qc,
    });
  } catch (error) {
    next(error);
  }
};