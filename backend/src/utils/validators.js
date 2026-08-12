// backend/src/utils/validators.js
const Joi = require('joi');

// --- Common reusable schemas ---
const idSchema = Joi.number().integer().positive();
const emailSchema = Joi.string().email().max(255);
const phoneSchema = Joi.string().pattern(/^[0-9+\-\s()]{8,20}$/);
const dateSchema = Joi.date().iso();
const currencySchema = Joi.number().precision(2).positive().allow(0);

// --- Auth Validation ---
const validateLogin = (data) => {
  const schema = Joi.object({
    email: emailSchema.required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data, { abortEarly: false });
};

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: emailSchema.required(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().valid('admin', 'manager', 'sales', 'warehouse', 'user').default('user'),
  });
  return schema.validate(data, { abortEarly: false });
};

// --- Product & Inventory ---
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    sku: Joi.string().max(50).required(),
    category: Joi.string().max(100),
    unitPrice: currencySchema.required(),
    costPrice: currencySchema,
    stockQuantity: Joi.number().integer().min(0).default(0),
    reorderLevel: Joi.number().integer().min(0).default(10),
  });
  return schema.validate(data, { abortEarly: false });
};

// --- Sales Order (SO) ---
const validateSalesOrder = (data) => {
  const itemSchema = Joi.object({
    productId: idSchema.required(),
    quantity: Joi.number().integer().min(1).required(),
    unitPrice: currencySchema.required(),
  });

  const schema = Joi.object({
    customerId: idSchema.required(),
    orderDate: dateSchema.default(Date.now),
    expectedDeliveryDate: dateSchema.min('now'),
    items: Joi.array().items(itemSchema).min(1).required(),
    discount: Joi.number().min(0).max(100).default(0),
    taxRate: Joi.number().min(0).max(100).default(0),
    notes: Joi.string().max(500),
  });
  return schema.validate(data, { abortEarly: false });
};

// --- Purchase Order (PO) ---
const validatePurchaseOrder = (data) => {
  const itemSchema = Joi.object({
    productId: idSchema.required(),
    quantity: Joi.number().integer().min(1).required(),
    unitCost: currencySchema.required(),
  });

  const schema = Joi.object({
    supplierId: idSchema.required(),
    orderDate: dateSchema.default(Date.now),
    deliveryDate: dateSchema.min('now'),
    items: Joi.array().items(itemSchema).min(1).required(),
    notes: Joi.string().max(500),
  });
  return schema.validate(data, { abortEarly: false });
};

// --- Invoice ---
const validateInvoice = (data) => {
  const schema = Joi.object({
    salesOrderId: idSchema.required(),
    issueDate: dateSchema.default(Date.now),
    dueDate: dateSchema.min('now').required(),
    paymentTerms: Joi.string().valid('net15', 'net30', 'net60', 'cod').default('net30'),
  });
  return schema.validate(data, { abortEarly: false });
};

// --- Quality Control (QC) ---
const validateQCResult = (data) => {
  const schema = Joi.object({
    workOrderId: idSchema.required(),
    status: Joi.string().valid('passed', 'failed', 'pending').required(),
    remarks: Joi.string().max(500),
    inspectedBy: idSchema.required(),
  });
  return schema.validate(data, { abortEarly: false });
};

// Generic validator wrapper to use in controllers
const validate = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    return { error: true, errors };
  }
  return { error: false, value };
};

module.exports = {
  validateLogin,
  validateUser,
  validateProduct,
  validateSalesOrder,
  validatePurchaseOrder,
  validateInvoice,
  validateQCResult,
  validate, // generic wrapper
};