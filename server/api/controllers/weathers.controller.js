import mongoose from 'mongoose';

const logger = require('../../lib/logger')();

const Weather = mongoose.model('Weather');

export function getWeather(req, res) {
  const { id } = req.params;

  Weather
  .findById(id)
  .lean()
  .exec((err, weather) => {
    if (!err) {
      logger.log('getWeather: %o', weather);
      return res.send(weather);
    }
    logger.log('getWeather Error: %j', err);
    return res.send(err);
  });
}

export function getWeathers(req, res) {
  const { limit, skip } = req.query;

  Weather
  .find({})
  .skip(Number(skip) || 0)
  .limit(Number(limit) || 10)
  .sort('time')
  .lean()
  .exec((err, weathers) => {
    if (!err) {
      logger.log(`getWeathers: weathers.length ${weathers.length}`);
      return res.send(weathers);
    }
    logger.log('getWeathers Error: %j', err);
    return res.send(err);
  });
}

export function createWeather(req, res) {
  logger.log('createWeather: %o', req.body);

  Weather.create(req.body, (err, weather) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createWeather: %o', weather);
    return res.send(weather);
  });
}

export function updateWeather(req, res) {
  const { id } = req.params;

  Weather.findByIdAndUpdate(id, { $set: req.body }, (err, weather) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('updateWeather: %o', weather);
    return res.send(weather);
  });
}

export function deleteWeather(req, res) {
  const { id } = req.params;

  Weather.findByIdAndRemove(id, {}, (err, weather) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteMonster: %o', weather);
    return res.send(weather);
  });
}
