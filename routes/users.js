const express = require('express');
const router = express.Router();
const { User, UserRole } = require('../models');

// GET /api/users — список всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: UserRole, attributes: ['name', 'code'] }]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id — один пользователь
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: UserRole, attributes: ['name', 'code'] }]
    });
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users — регистрация пользователя
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/users/:id — обновление пользователя
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;