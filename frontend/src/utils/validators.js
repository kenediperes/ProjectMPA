/**
 * Form validation functions
 */

/**
 * Check if a value is a valid email address
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Check if a value is a valid phone number (international format)
 */
export const isValidPhone = (phone) => {
  // Allows +, digits, spaces, dashes, parentheses
  const re = /^[\+\d\s\-\(\)]{7,20}$/;
  return re.test(phone);
};

/**
 * Check if a value is a valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if a value is a valid number
 */
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Check if a value is a positive number
 */
export const isPositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

/**
 * Check if a value is an integer
 */
export const isInteger = (value) => {
  return Number.isInteger(value);
};

/**
 * Check if a value is within a range (inclusive)
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate required fields (string not empty, object not null, etc.)
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

/**
 * Validate minimum length for string/array
 */
export const minLength = (value, length) => {
  if (!value) return false;
  return value.length >= length;
};

/**
 * Validate maximum length for string/array
 */
export const maxLength = (value, length) => {
  if (!value) return true; // empty is allowed
  return value.length <= length;
};

/**
 * Validate password strength (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
 */
export const isStrongPassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

/**
 * Validate that two values match (e.g., password confirmation)
 */
export const doMatch = (value1, value2) => {
  return value1 === value2;
};

/**
 * Validate a date string (ISO format)
 */
export const isValidDate = (date) => {
  const d = new Date(date);
  return !isNaN(d.getTime());
};

/**
 * Validate that a date is not in the past
 */
export const isFutureDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d > now;
};

/**
 * Validate that a date is not in the future
 */
export const isPastDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d < now;
};

/**
 * Validate quantity (positive integer)
 */
export const isValidQuantity = (value) => {
  const num = parseInt(value);
  return Number.isInteger(num) && num > 0;
};