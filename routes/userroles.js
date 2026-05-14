const express = require('express');
const router = express.Router();
const { UserRole } = require('../models');

// GET /api/userroles — список всех ролей
router.get('/', async (req, res) => {
  try {
    const roles = await UserRole.findAll();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/userroles/:id — одна роль
router.get('/:id', async (req, res) => {
  try {
    const role = await UserRole.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Роль не найдена' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/userroles — создание новой роли
router.post('/', async (req, res) => {
  try {
    const role = await UserRole.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/userroles/:id — обновление роли
router.put('/:id', async (req, res) => {
  try {
    const role = await UserRole.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Роль не найдена' });
    await role.update(req.body);
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/userroles/:id — удаление роли
router.delete('/:id', async (req, res) => {
  try {
    const role = await UserRole.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Роль не найдена' });
    await role.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});