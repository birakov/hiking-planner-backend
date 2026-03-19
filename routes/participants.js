const express = require('express');
const router = express.Router();
const { Participant, Trip } = require('../models');

router.post('/:tripId/participants', async (req, res) => {
  try {
    const { user_id, status = 'pending', role = 'participant' } = req.body;
    const tripId = req.params.tripId;

    const trip = await Trip.findByPk(tripId);
    if (!trip) return res.status(404).json({ error: 'Поход не найден' });

    const participant = await Participant.create({
      user_id,
      trip_id: tripId,
      status,
      role,
    });

    res.status(201).json(participant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:tripId/participants', async (req, res) => {
  try {
    const participants = await Participant.findAll({
      where: { trip_id: req.params.tripId },
      include: [{ model: Trip, attributes: ['title'] }],
    });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;