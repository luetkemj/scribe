const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  weight: {
    unit: String,
    value: Number,
  },
  cost: {
    unit: String,
    value: Number,
  },
  description: String,
}, { collection: 'items' });

mongoose.model('Item', ItemSchema, 'items');
