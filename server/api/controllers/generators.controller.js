import mongoose from 'mongoose';
import * as _ from 'lodash';
import { shimmy } from '../../lib/generators';

const logger = require('../../lib/logger')();

const Generator = mongoose.model('Generator');

const ZONE_VARIANCE = {
  1: -10,
  2: -5,
  3: 0,
  4: 5,
  5: 10,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

export function generateWeather(req, res) {
  const { zone, terrain, season, month } = req.body;

  Generator
  .find({ name: 'weather' })
  .lean()
  .exec((err, gen) => {
    if (!err) {
      logger.log(`generateCurrentWeather: ${gen[0].name}`);

      const { generator } = gen[0];
      const { temp: baseTemp } = generator[zone][terrain][season][month];
      const { high: seasonalHigh } = generator[zone].seasonalVariance[season];
      const { low: seasonalLow } = generator[zone].seasonalVariance[season];

      const mean = baseTemp + getRandomInt(0, _.sample(ZONE_VARIANCE));
      const high = mean + getRandomInt(0, seasonalHigh);
      const low = mean + getRandomInt(0, seasonalLow);

      const temps = [];
      // create an array of temps within our range of high and low
      for (let i = 0; i < 24; i += 1) {
        temps.push(getRandomInt(low, high));
      }

      // reverse order temps and shimmy into an ordered set of observed temps by hour of the day
      const observed = shimmy(_.chain(temps).orderBy().reverse().value());

      const currentWeather = {
        temp: {
          forecast: {
            low,
            high,
          },
          observed,
        },
      };

      return res.send(currentWeather);
    }
    logger.log('generateCurrentWeather Error: %j', err);
    return res.send(err);
  });
}
