const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GeneratorSchema = new Schema({
  name: String,
  generator: {},
}, { collection: 'generators' });

mongoose.model('Generator', GeneratorSchema, 'generators');
