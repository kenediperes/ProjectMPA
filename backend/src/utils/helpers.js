// backend/src/utils/helpers.js

/**
 * Generate a unique order number
 * Format: SO-2026-0001 (Sales Order), PO-2026-0001 (Purchase Order)
 */
const generateOrderNumber = (prefix, lastCounter = 0) => {
  const year = new Date().getFullYear();
  const nextNumber = String(lastCounter + 1).padStart(4, '0');
  return `${prefix}-${year}-${nextNumber}`;
};

/**
 * Calculate subtotal, tax, discount, and total for an order
 */
const calculateOrderTotals = (items, discountPercent = 0, taxPercent = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const total = taxableAmount + taxAmount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};

/**
 * Format currency to IDR or USD
 */
const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Pagination helper for API responses
 */
const paginationMeta = (page = 1, limit = 10, totalItems = 0) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

/**
 * Sanitize input string to prevent XSS
 */
const sanitizeString = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Extract date range from query params (e.g., for reports)
 */
const parseDateRange = (startDate, endDate) => {
  const start = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
  const end = endDate ? new Date(endDate) : new Date();
  // Set end date to end of day
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

/**
 * Check if stock is available for a list of items (used in Inventory Management)
 */
const checkStockAvailability = (items, stockMap) => {
  const unavailable = [];
  items.forEach((item) => {
    const availableQty = stockMap[item.productId] || 0;
    if (availableQty < item.quantity) {
      unavailable.push({
        productId: item.productId,
        requested: item.quantity,
        available: availableQty,
      });
    }
  });
  return unavailable;
};

module.exports = {
  generateOrderNumber,
  calculateOrderTotals,
  formatCurrency,
  paginationMeta,
  sanitizeString,
  parseDateRange,
  checkStockAvailability,
};