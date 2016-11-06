const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  day: {
    type: Number,
    min: [1, 'You must provide a day of 1 or more'],
  },
  time: {
    type: Number,
    min: [0, 'Time cannot be negative'],
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter'],
  },
  weather: String,
  notes: [{
    type: String,
  }],
});

mongoose.model('Log', LogSchema, 'logs');
