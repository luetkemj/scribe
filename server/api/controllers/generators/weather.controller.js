import mongoose from 'mongoose';
import * as _ from 'lodash';
import {
  d30,
  shimmy,
  assignTime,
  getStormWindow,
  backFill,
  stormOverFlow,
  fillStormGaps,
  trackStorm,
  topOff,
  addWind,
} from '../../../lib/generators/weather/utils';
import { temporalEstimation } from '../../../lib/generators/weather/dictionary';
import { generateStorm, generateConditions } from '../../../lib/generators/weather/generators';
import { ZONE_VARIANCE, STORM_TYPE_TABLE } from '../../../config/constants/weather.constants';

const logger = require('../../../lib/logger')();

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

      const mean = baseTemp + _.random(0, _.sample(ZONE_VARIANCE));
      const high = mean + _.random(0, seasonalHigh);
      const low = mean + _.random(0, seasonalLow);

      const temps = [];
      // create an array of temps within our range of high and low for one day
      for (let i = 0; i < 24; i += 1) {
        temps.push({ temp: _.random(low, high) });
      }

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

      // if storm track and map to hourlyTemps
      // otherwise just return hourlyTemps
      let hourlyWeather = hourlyTemps;

      const storm = generateStorm(stormType);
      let stormStartEstimate;

      if (stormType) {
        const stormWindow = getStormWindow(hourlyWeather, storm);
        const stormStart = _.random(stormWindow.start, stormWindow.end);

        stormStartEstimate = temporalEstimation(stormStart);

        const trackedStorm = trackStorm(storm, stormStart);
        const hourlyWeatherWithStorms = _.orderBy(hourlyWeather.concat(trackedStorm.cells), 'time');

        // order weather array with storms by time
        hourlyWeather = _.orderBy(hourlyWeatherWithStorms, 'time');

        // storms cells are not generated with a current temp
        // Now that our storms are ordered with our hourly temps we can look back to the previous
        // record and grab that temp in order to add to our storm cells
        hourlyWeather = backFill(hourlyWeather, 'temp');

        // Sometimes a storm cells duration does not end before the next record begins.
        // Here we handle that problem by overflowing the conditons of the storm cell into
        // the next record.
        hourlyWeather = stormOverFlow(hourlyWeather);

        // Sometimes a storm cells record will end before the next record begins. Here we fill in
        // the gap with a new record.
        hourlyWeather = fillStormGaps(hourlyWeather);

        // Sometimes a storm begins after 11pm and ends before midnight. In this instance we
        // do not have a record from the end of the storm to midnight.
        // Here we test for this case and add a record if need be.
        hourlyWeather = topOff(hourlyWeather);
      }

      // now that we have our entire list it's time to start filling missing data!
      // Here we add wind and beaufort number to any records that are missing it.
      hourlyWeather = addWind(hourlyWeather, _.random(20));

      // add conditions
      hourlyWeather = generateConditions(hourlyWeather, season, stormType);

      const currentWeather = {
        forecast: {
          low,
          high,
          stormType,
          stormStartEstimate,
        },
        hourlyWeather,
      };

      logger.log('generateWeather: currentWeather: %j', currentWeather);

      return res.send(currentWeather);
    }
    logger.log('generateWeather Error: %j', err);
    return res.send(err);
  });
}
