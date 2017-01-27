const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
});

mongoose.model('User', UserSchema, 'users');
