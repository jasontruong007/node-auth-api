const authService = require('../services/auth.service');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existed = await User.findOne({ email });
    if (existed) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash
    });

    res.status(201).json({
      id: user._id,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};