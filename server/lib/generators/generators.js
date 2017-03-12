import mongoose from 'mongoose';

const logger = require('../../lib/logger')();

const Generator = mongoose.model('Generator');

export function getGenerator(name, callback) {
  Generator
  .findOne({ name })
  .lean()
  .exec((err, generator) => {
    if (!err) {
      return callback(null, generator);
    }
    logger.log('generateWeather Error: %j', err);
    return callback(err);
  });
}
