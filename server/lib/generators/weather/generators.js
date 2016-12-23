import * as _ from 'lodash';
import { d6, d10, d30, toMs, whipWind } from './utils';
import { NS_CELL_TABLE, S_CELL_TABLE } from '../../../config/constants/weather.constants';

// const logger = require('./logger')();

function generateStormCell(table, duration) {
  const { precip, wind, solid, hook } = table[d30()];

  const whippedWind = whipWind(wind);

  return {
    wind: whippedWind,
    cell_duration: duration,
    cell_precipitation_rate: precip,
    cell_solid: solid,
    cell_hook: hook,
  };
}


/*
 * @TODO: test this bugger!
 */
function generateSingleCell() {
  const duration = toMs(d10() + 20);
  return {
    duration,
    cells: [generateStormCell(NS_CELL_TABLE, duration)],
  };
}

/*
 * @TODO: test this bugger!
 */
function generateMultiCell(table, cluster) {
  const cells = [];
  let totalDuration = 0;

  for (let i = 0; i < d6() + 2; i += 1) {
    let delay = 0;
    if (cluster) {
      delay = Math.ceil(d30() / 2);
      totalDuration += toMs(delay);
    }

    const duration = toMs(d10() + 20);
    totalDuration += duration;

    const cell = generateStormCell(table, duration);

    cells.push({
      ...cell,
      cell_duration: duration,
      cell_delay: toMs(delay),
    });
  }
  return {
    duration: totalDuration,
    cells,
  };
}

/*
 * @TODO: test this bugger CAUSE IT DON'T WORK!!
 */
function generateSuperCell() {
  const duration = 60 + (d30() * 10);
  const cells = [];

  for (let i = 1; i <= duration / 10; i += 1) {
    if (i === 1) {
      cells.push({
        duration: toMs(10),
        effect: S_CELL_TABLE[d10()],
      });
    }

    if (i === 2) {
      cells.push({
        duration: toMs(10),
        effect: S_CELL_TABLE[d10() + 10],
      });
    }

    if (i === duration) {
      cells.push({
        duration: toMs(10),
        effect: S_CELL_TABLE[d10()],
      });
    }

    if (i > 2 && i < duration) {
      cells.push({
        duration: toMs(10),
        effect: S_CELL_TABLE[d10() + 20],
      });
    }
  }

  return {
    duration: toMs(duration),
    cells,
  };
}


/*
 * @TODO: test this bugger!
 */
export function generateStorm(stormType) {
  let storm;
  if (stormType === 'singleCell') {
    storm = generateSingleCell();
  }
  if (stormType === 'multiCellClusterNS') {
    storm = generateMultiCell(NS_CELL_TABLE, true);
  }
  if (stormType === 'multiCellClusterS') {
    storm = generateMultiCell(S_CELL_TABLE, true);
  }
  if (stormType === 'multiCellLineNS') {
    storm = generateMultiCell(NS_CELL_TABLE, false);
  }
  if (stormType === 'multiCellLineS') {
    storm = generateMultiCell(S_CELL_TABLE, false);
  }
  if (stormType === 'superCell') {
    storm = generateSuperCell();
  }
  return {
    ...storm,
  };
}

export function generateWind(average) {
  const min = _.clamp(average - 5, 0, 20);
  const max = average + 5;

  return _.random(min, max);
}


// conditions
function getConditionSolid(record, season) {
  // if temo is below freezing ignore solid and do snow
  if (record.temp < 32) {
    return 'snow';
  }

  // if winter and in range for sleet - do sleet
  if (season === 'winter' && _.inRange(record.temp, 32, 41)) {
    return 'sleet';
  }

  // if spring and summer and over 40 - do hail
  if ((season === 'spring' || season === 'summer') && record.temp > 40) {
    return 'hail';
  }

  // else we should just do thunderstorm cause we know we are in a storm.
  return 'thunderstorm';
}

function getConditionPrecipitation(record, stormType) {
  // if around freezing do rain-mix
  if (_.inRange(record.temp, 32, 38)) {
    return 'rain-mix';
  }

  // if cold enough to snow - do snow
  if (record.temp < 32) {
    return 'snow';
  }

  // if storm is severe determine intensity and add lightening
  if (stormType === 'multiCellClusterS' || 'multiCellLineS') {
    if (record.cell_precipitation_rate < 2) {
      return 'storm-showers';
    }

    return 'thunderstorm';
  }

  // if rain and not severe determine intensity
  if (record.cell_precipitation_rate < 0.3) {
    return 'sprinkle';
  }

  if (record.cell_precipitation_rate < 0.9) {
    return 'showers';
  }

  return 'rain';
}

export function generateConditions(hourlyWeather, season, stormType) {
  const newArray = [];
  _.each(hourlyWeather, (record) => {
    // do hail or sleet
    if (record.cell_solid) {
      return newArray.push({
        ...record,
        condition: getConditionSolid(record, season),
      });
    }

    // do snow, rain, or mix
    if (record.cell_precipitation_rate && !record.cell_solid) {
      return newArray.push({
        ...record,
        condition: getConditionPrecipitation(record, stormType),
      });
    }

    return newArray.push(record);
  });

  return newArray;
}
// day-sunny
// night-clear
//
// day-sunny-overcast // partly-cloudy
// night-partly-cloudy
//
// day-cloudy // mostly cloudy
// night-cloudy // mostly cloudy
//
// cloudy // overcast
//
// fog
// lightning
// sandstorm
// dust
// hot
// day-haze
//
//
// hail
// sleet
//
// sprinkle
// showers
// rain
//
// rain-mix
//
// snow
//
// storm-showers
// thunderstorm
