const { models } = require('../config/database');

exports.createServiceOrder = async (req, res, next) => {
  try {
    const { customer_id, description, priority } = req.body;
    const service = await models.ServiceOrder.create({
      customer_id,
      service_date: new Date(),
      description,
      priority,
      status: 'pending',
    });
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

exports.assignTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;
    const service = await models.ServiceOrder.findByPk(id);
    if (!service) return res.status(404).json({ error: 'Service order not found' });
    await service.update({ assigned_to, status: 'assigned' });
    res.json(service);
  } catch (error) {
    next(error);
  }
};