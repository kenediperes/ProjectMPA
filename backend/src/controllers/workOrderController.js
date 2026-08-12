const { models } = require('../config/database');

exports.createWorkOrder = async (req, res, next) => {
  try {
    const { order_type, service_order_id, sales_order_id, assigned_to, description } = req.body;
    const wo = await models.WorkOrder.create({
      order_type,
      service_order_id,
      sales_order_id,
      assigned_to,
      start_date: new Date(),
      status: 'pending',
      description,
    });
    res.status(201).json(wo);
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const wo = await models.WorkOrder.findByPk(id);
    if (!wo) return res.status(404).json({ error: 'Work order not found' });
    await wo.update({ status });
    res.json(wo);
  } catch (error) {
    next(error);
  }
};