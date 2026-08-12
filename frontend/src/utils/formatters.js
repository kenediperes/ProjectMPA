/**
 * Formatting utilities for display
 */

import { CURRENCY, DATE_FORMATS } from './constants';

/**
 * Format a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currencySymbol - Optional override symbol
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currencySymbol = CURRENCY.SYMBOL) => {
  if (amount === null || amount === undefined) return `${currencySymbol}0.00`;
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${currencySymbol}0.00`;
  const formatted = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${currencySymbol}${formatted}`;
};

/**
 * Format a number as percentage
 * @param {number} value - Value (e.g., 0.15 for 15%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage
 */
export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined) return '0%';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0%';
  return `${(num * 100).toFixed(decimals)}%`;
};

/**
 * Format a number with thousand separators
 * @param {number} value - Number to format
 * @param {number} decimals - Decimal places
 * @returns {string} - Formatted number
 */
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format a date object to a readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format key from DATE_FORMATS
 * @returns {string} - Formatted date
 */
export const formatDateDisplay = (date, format = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  // Simple formatting (you can use date-fns or similar for more robust)
  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  const map = {
    [DATE_FORMATS.DISPLAY]: `${day}/${month}/${year}`,
    [DATE_FORMATS.DISPLAY_TIME]: `${day}/${month}/${year} ${hours}:${minutes}`,
    [DATE_FORMATS.API]: `${year}-${month}-${day}`,
    [DATE_FORMATS.API_FULL]: d.toISOString(),
  };
  return map[format] || d.toString();
};

/**
 * Format a file size in bytes to human-readable
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Decimal places
 * @returns {string} - Human-readable size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format an order status to a human-readable label (with capitalization)
 */
export const formatStatus = (status) => {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
};

/**
 * Format a phone number for display (adds country code formatting if needed)
 * Simple: just returns as is, but can be extended
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  return phone;
};

/**
 * Format a full name (capitalize each word)
 */
export const formatName = (name) => {
  if (!name) return '';
  return name.replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Format an address (simple concatenation)
 */
export const formatAddress = (address) => {
  if (!address) return '';
  const { street, city, state, zip, country } = address;
  const parts = [street, city, state, zip, country].filter(Boolean);
  return parts.join(', ');
};