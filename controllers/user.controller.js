const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/users.json');
const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  const data = await fs.promises.readFile(dataPath, 'utf-8');
  const users = JSON.parse(data);
  res.json(users);
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { name } = req.body;

  // ❌ validate cơ bản
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  // Đọc data cũ
  const data = await fs.promises.readFile(dataPath, 'utf-8');
  const users = JSON.parse(data);

  // Tạo user mới
  const newUser = {
    id: Date.now(), // tạm dùng
    name
  };

  users.push(newUser);

  // Ghi lại file
  await fs.promises.writeFile(
    dataPath,
    JSON.stringify(users, null, 2)
  );

  // Trả kết quả
  res.status(201).json(newUser);
};