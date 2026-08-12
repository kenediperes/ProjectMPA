const { models } = require('../config/database');

// ---------- Purchase Requests ----------
exports.createRequest = async (req, res, next) => {
  try {
    const request = await models.PurchaseRequest.create({
      requested_by: req.user.id,
      request_date: new Date(),
      description: req.body.description,
      status: 'pending',
    });
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

exports.approveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await models.PurchaseRequest.findByPk(id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    await request.update({ status: 'approved' });
    res.json(request);
  } catch (error) {
    next(error);
  }
};

// ---------- Purchase Orders ----------
exports.createOrder = async (req, res, next) => {
  try {
    const { supplier_id, request_id, items, expected_delivery } = req.body;
    let total = 0;
    const order = await models.PurchaseOrder.create({
      supplier_id,
      request_id,
      order_date: new Date(),
      expected_delivery,
      total_amount: 0,
      status: 'draft',
      approval_status: 'pending',
    });

    for (const item of items) {
      const lineTotal = item.unit_price * item.quantity;
      total += lineTotal;
      await models.PurchaseOrderItem.create({
        purchase_order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      });
    }
    await order.update({ total_amount: total });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.receiveOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await models.PurchaseOrder.findByPk(id, {
      include: ['items'],
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Process Stock In
    for (const item of order.items) {
      await models.InventoryTransaction.create({
        product_id: item.product_id,
        transaction_type: 'stock_in',
        quantity: item.quantity,
        reference_type: 'purchase_order',
        reference_id: order.id,
        notes: 'Received Purchase Order #' + order.id,
      });

      // Update product stock
      const product = await models.Product.findByPk(item.product_id);
      await product.update({
        stock_quantity: product.stock_quantity + item.quantity,
      });
    }

    await order.update({ status: 'received' });
    res.json({ message: 'Order received and stock updated' });
  } catch (error) {
    next(error);
  }
};