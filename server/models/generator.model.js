const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GeneratorSchema = new Schema({
  name: String,
  generator: {},
});

mongoose.model('Generator', GeneratorSchema, 'generators');
