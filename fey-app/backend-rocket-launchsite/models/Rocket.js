const mongoose = require('mongoose');

const rocketSchema = new mongoose.Schema({
  model: String,
  mass: Number,
  payload: {
    description: String,
    weight: Number
  },
  telemetry: {
    host: String,
    port: Number
  },
  status: String,
  timestamps: {
    launched: Date,
    deployed: Date
  },
  altitude: Number,
  speed: Number,
  acceleration: Number,
  thrust: Number,
  temperature: Number
});

module.exports = mongoose.model('Rocket', rocketSchema);
