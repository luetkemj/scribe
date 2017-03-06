const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventType: {
    type: String,
    required: true,
  },
  event: {
    type: Object,
    required: true,
  },
  time: {
    type: Number,
    min: [0, 'Time cannot be negative'],
    required: true,
  },
  campaignId: {
    type: String,
    required: true,
  },
}, { collection: 'events' });

mongoose.model('Event', EventSchema, 'events');
