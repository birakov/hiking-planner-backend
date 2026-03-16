const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Trip, Participant } = require('../models');

router.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: req.query.include === 'participants' ? [{ model: Participant }] : [],
    });
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: req.query.include === 'participants' ? [{ model: Participant }] : [],
    });
    if (!trip) {
      return res.status(404).json({ error: 'Поход не найден' });
    }
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Название обязательно'),
    body('start_date').isISO8601().withMessage('Неверный формат даты начала'),
    body('end_date').isISO8601().withMessage('Неверный формат даты окончания'),
    body('location').trim().notEmpty().withMessage('Локация обязательна'),
    body('max_participants').isInt({ min: 1 }).withMessage('Минимум 1 участник'),
    body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Неверный уровень сложности'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const trip = await Trip.create(req.body);
      res.status(201).json(trip);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Поход не найден' });
    }

    await trip.update(req.body);
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Поход не найден' });
    }

    await trip.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;