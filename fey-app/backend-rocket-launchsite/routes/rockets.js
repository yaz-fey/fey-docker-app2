const express = require('express');
const router = express.Router();



const Rocket = require('../models/Rocket');


// Tüm roketleri getir
router.get('/', async (req, res) => {
  try {
    const rockets = await Rocket.find();
    res.json(rockets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni roket ekle
router.post('/', async (req, res) => {
  const rocket = new Rocket({
    model: req.body.model,
    mass: req.body.mass,
    payload: req.body.payload,
    telemetry: req.body.telemetry,
    status: req.body.status,
    timestamps: req.body.timestamps,
    altitude: req.body.altitude,
    speed: req.body.speed,
    acceleration: req.body.acceleration,
    thrust: req.body.thrust,
    temperature: req.body.temperature
  });

  try {
    const newRocket = await rocket.save();
    res.status(201).json(newRocket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const rocket = await Rocket.findById(req.params.id);
    if (!rocket) return res.status(404).json({ message: 'Rocket not found' });
    await rocket.remove();
    res.json({ message: 'Rocket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const rocket = await Rocket.findById(req.params.id);
    if (!rocket) return res.status(404).json({ message: 'Rocket not found' });
    // Güncellenecek alanları burada ayarlayın
    const updatedRocket = await rocket.save();
    res.json(updatedRocket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const rockets = await Rocket.find();
    res.json(rockets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;


