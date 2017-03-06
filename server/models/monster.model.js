const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
  name: String,
}, { collection: 'monsters' });

mongoose.model('Monster', MonsterSchema, 'monsters');
