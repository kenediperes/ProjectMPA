const bcrypt = require('bcrypt');
const { models } = require('../config/database');
const jwt = require('../config/jwt');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, full_name, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      username,
      email,
      password_hash: hashed,
      full_name,
      role,
    });
    res.status(201).json({ message: 'User created', user: { id: user.id, username, email, role } });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await models.User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role });
    res.json({ token, user: { id: user.id, username, role: user.role, full_name: user.full_name } });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};