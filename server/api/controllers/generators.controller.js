import mongoose from 'mongoose';
import * as _ from 'lodash';
import {
  shimmy,
  getRandomInt,
  d30,
  generateStorm,
  assignTime,
  getStormWindow,
  backFill,
  stormOverFlow,
  fillStormGaps,
  trackStorm } from '../../lib/generators';
import { ZONE_VARIANCE, STORM_TYPE_TABLE } from '../../config/constants/weather.constants';

const logger = require('../../lib/logger')();

const Generator = mongoose.model('Generator');

/*
 * @TODO: there is a lot happening here... can it be simplified further? tested at all?
 * cause at the moment it is buggy!
 */
export function generateWeather(req, res) {
  const { zone, terrain, season, month, initialMs } = req.body;

  Generator
  .find({ name: 'weather' })
  .lean()
  .exec((err, gen) => {
    if (!err) {
      const { generator } = gen[0];
      const { temp: baseTemp } = generator[zone][terrain][season][month];
      const { high: seasonalHigh } = generator[zone].seasonalVariance[season];
      const { low: seasonalLow } = generator[zone].seasonalVariance[season];
      const { weatherClass } = generator[zone][terrain][season][month];

      const mean = baseTemp + getRandomInt(0, _.sample(ZONE_VARIANCE));
      const high = mean + getRandomInt(0, seasonalHigh);
      const low = mean + getRandomInt(0, seasonalLow);

      const temps = [];
      // create an array of temps within our range of high and low for one day
      for (let i = 0; i < 24; i += 1) {
        temps.push({ temp: getRandomInt(low, high) });
      }
      logger.log('generateWeather: temps: %j', temps);

      let stormType = 'none';
      if (weatherClass) {
        const roll = d30();
        stormType = STORM_TYPE_TABLE[weatherClass][roll];
      }

      // reverse order temps and shimmy into an ordered set of hourlyTemps
      // with each hour of the day
      const hourlyTemps = assignTime(
        shimmy(_.chain(temps).orderBy('temp').reverse().value()),
        initialMs
      );
      logger.log('generateWeather: hourlyTemps: %j', hourlyTemps);

      // if storm track and map to hourlyTemps
      // otherwise just return hourlyTemps
      let hourlyWeather = hourlyTemps;

      const storm = generateStorm(stormType);
      logger.log('stormType', stormType);
      logger.log('storm', storm);
      if (stormType) {
        const stormWindow = getStormWindow(hourlyWeather, storm);
        const stormStart = getRandomInt(stormWindow.start, stormWindow.end);

        const trackedStorm = trackStorm(storm, stormStart);
        const hourlyWeatherWithStorms = _.orderBy(hourlyWeather.concat(trackedStorm.cells), 'time');

        // set temps on each index - if none exists on current index use temp from previous.
        hourlyWeather = fillStormGaps(
          stormOverFlow(backFill(_.orderBy(hourlyWeatherWithStorms, 'time'), 'temp')));
      }

      const currentWeather = {
        temp: {
          forecast: {
            low,
            high,
            stormType,
          },
          hourlyWeather,
        },
      };

      return res.send(currentWeather);
    }
    logger.log('generateWeather Error: %j', err);
    return res.send(err);
  });
}
