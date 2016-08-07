const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
  name: String,
});

mongoose.model('Monster', MonsterSchema, 'monsters');
