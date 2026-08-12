const { models } = require('../config/database');

// ------------------- Quotations -------------------
exports.createQuotation = async (req, res, next) => {
  try {
    const { customer_id, items, valid_until } = req.body;
    let total = 0;
    // Calculate totals from items
    const quotation = await models.SalesQuotation.create({
      customer_id,
      quotation_date: new Date(),
      valid_until,
      total_amount: 0, // will update after items
      status: 'draft',
    });

    // In a real scenario, you'd have a SalesQuotationItem table.
    // For brevity, we assume items are passed and update total.
    // We'll just update the total directly.
    // Assuming items is an array of { product_id, quantity, unit_price, discount }
    for (const item of items) {
      const lineTotal = (item.unit_price * item.quantity) - (item.discount || 0);
      total += lineTotal;
      // You would insert into quotation_items here.
    }
    await quotation.update({ total_amount: total });
    res.status(201).json(quotation);
  } catch (error) {
    next(error);
  }
};

exports.convertToOrder = async (req, res, next) => {
  try {
    const { quotation_id } = req.body;
    const quotation = await models.SalesQuotation.findByPk(quotation_id);
    if (!quotation) return res.status(404).json({ error: 'Quotation not found' });

    const order = await models.SalesOrder.create({
      customer_id: quotation.customer_id,
      quotation_id: quotation.id,
      order_date: new Date(),
      required_date: req.body.required_date || new Date(Date.now() + 7 * 86400000),
      total_amount: quotation.total_amount,
      status: 'pending',
    });

    // Copy items from quotation to order (pseudo-code)
    // Copy logic here...
    await quotation.update({ status: 'accepted' });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// ------------------- Sales Orders -------------------
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await models.SalesOrder.findAll({
      include: ['customer'],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await models.SalesOrder.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.update({ status });
    res.json(order);
  } catch (error) {
    next(error);
  }
};