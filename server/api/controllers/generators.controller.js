import mongoose from 'mongoose';
import * as _ from 'lodash';
import { shimmy, getRandomInt, d30, generateStorm } from '../../lib/generators';
import { ZONE_VARIANCE, STORM_TYPE_TABLE } from '../../config/constants/weather.constants';

const logger = require('../../lib/logger')();

const Generator = mongoose.model('Generator');

export function generateWeather(req, res) {
  const { zone, terrain, season, month } = req.body;

  Generator
  .find({ name: 'weather' })
  .lean()
  .exec((err, gen) => {
    if (!err) {
      logger.log(`generateWeather: ${gen[0].name}`);

      const { generator } = gen[0];
      const { temp: baseTemp } = generator[zone][terrain][season][month];
      const { high: seasonalHigh } = generator[zone].seasonalVariance[season];
      const { low: seasonalLow } = generator[zone].seasonalVariance[season];
      const { weatherClass } = generator[zone][terrain][season][month];
      logger.log('generateWeather: weatherClass %s', weatherClass);

      const mean = baseTemp + getRandomInt(0, _.sample(ZONE_VARIANCE));
      const high = mean + getRandomInt(0, seasonalHigh);
      const low = mean + getRandomInt(0, seasonalLow);

      const temps = [];
      // create an array of temps within our range of high and low
      for (let i = 0; i < 24; i += 1) {
        temps.push(getRandomInt(low, high));
      }

      let stormType = 'none';
      if (weatherClass) {
        stormType = STORM_TYPE_TABLE[weatherClass][d30()];
      }

      // reverse order temps and shimmy into an ordered set of observed temps by hour of the day
      const observed = shimmy(_.chain(temps).orderBy().reverse().value());

      const currentWeather = {
        temp: {
          forecast: {
            low,
            high,
            stormType,
            storm: generateStorm(stormType),
          },
          observed,
        },
      };

      return res.send(currentWeather);
    }
    logger.log('generateWeather Error: %j', err);
    return res.send(err);
  });
}
