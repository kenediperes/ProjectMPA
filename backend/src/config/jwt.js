// jwt.js - JWT signing and verification
const jwt = require('jsonwebtoken');
const config = require('./index');

const secret = config.jwt.secret;
const expiresIn = config.jwt.expiresIn || '7d';

const sign = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verify = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const decode = (token) => {
  return jwt.decode(token);
};

module.exports = {
  sign,
  verify,
  decode,
};