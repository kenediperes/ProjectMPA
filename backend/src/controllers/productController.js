const { models } = require('../config/database');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const products = await models.Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await models.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const product = await models.Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const product = await models.Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.checkStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.query;
    const product = await models.Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const available = product.stock_quantity >= parseInt(quantity, 10);
    res.json({ product_id: id, available, stock: product.stock_quantity });
  } catch (error) {
    next(error);
  }
};

exports.reserveInventory = async (req, res, next) => {
  try {
    const { product_id, quantity, reference_type, reference_id } = req.body;
    const product = await models.Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock for reservation' });
    }

    // Reserve via transaction
    await models.InventoryTransaction.create({
      product_id,
      transaction_type: 'reserve',
      quantity,
      reference_type,
      reference_id,
      notes: 'Reserved for ' + reference_type,
    });

    // Optionally, we don't reduce physical stock until shipment, but we can track reserved separately.
    // For simplicity, we just log the reserve. Actual stock deduction happens on 'stock_out'.
    res.json({ message: 'Inventory reserved successfully' });
  } catch (error) {
    next(error);
  }
};