const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  day: {
    type: Number,
    min: [0, 'Days cannot be negative'],
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
    heading: {
      type: String,
    },
    content: {
      type: String,
    },
  }],
  campaignId: {
    type: String,
    required: true,
  },
}, { collection: 'logs' });

mongoose.model('Log', LogSchema, 'logs');
