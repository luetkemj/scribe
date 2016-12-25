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
function getConditionSolidPrecipitation(record, season) {
  // if temp is below freezing ignore solid and do snow
  if (record.temp < 32) {
    return {
      name: 'snow',
    };
  }

  // if winter and in range for sleet - do sleet
  if (season === 'winter' && _.inRange(record.temp, 32, 41)) {
    return {
      name: 'sleet',
    };
  }

  // if spring and summer and over 40 - do hail
  if ((season === 'spring' || season === 'summer') && record.temp > 40) {
    return {
      name: 'hail',
    };
  }

  // else we should just do thunderstorm cause we know we are in a storm.
  return {
    name: 'thunderstorm',
  };
}

function getConditionPrecipitation(record, stormType) {
  // if around freezing do rain-mix
  if (_.inRange(record.temp, 32, 38)) {
    return {
      name: 'rain-mix',
    };
  }

  // if cold enough to snow - do snow
  if (record.temp < 32) {
    return {
      name: 'snow',
    };
  }

  // if storm is severe determine intensity and add lightening
  if (stormType === 'multiCellClusterS' || stormType === 'multiCellLineS') {
    if (record.cell_precipitation_rate < 2) {
      return {
        name: 'storm-showers',
      };
    }

    return {
      name: 'thunderstorm',
    };
  }

  // if rain and not severe determine intensity
  if (record.cell_precipitation_rate < 0.3) {
    return {
      name: 'sprinkle',
    };
  }

  if (record.cell_precipitation_rate < 0.9) {
    return {
      name: 'showers',
    };
  }

  return {
    name: 'rain',
  };
}

export function generateNextSky(sky) {
  const SKIES = [
    'clear',
    'partly-cloudy',
    'mostly-cloudy',
    'overcast',
  ];

  // current sky is sticky - so we try here to unstick it.
  // const D30 = d30();
  // we have unstuck the sky
  if (d30() > 10) {
    // check which way to lean
    // first we get the index of sky in SKIES
    let index = SKIES.indexOf(sky);
    if (d30() % 2) {
      // so we can move up or down
      index -= 1;
    } else {
      index += 1;
    }

    // now we return our new sky at the calulated index
    // making sure to clamp between possible indices
    return SKIES[_.clamp(index, 0, SKIES.length - 1)];
  } else {
    return sky;
  }
}

export function generateStormConditions(hourlyWeather, season, stormType) {
  const newArray = [];
  _.each(hourlyWeather, (record) => {
    // set storm conditions on records
    if (stormType) {
      // try hail or sleet
      if (record.cell_solid) {
        return newArray.push({
          ...record,
          condition: getConditionSolidPrecipitation(record, season),
        });
      }

      // try snow, rain, or mix
      if (record.cell_precipitation_rate && !record.cell_solid) {
        return newArray.push({
          ...record,
          condition: getConditionPrecipitation(record, stormType),
        });
      }
    }

    return newArray.push({
      ...record,
    });
  });

  return newArray;
}

export function generateSkyConditions(hourlyWeather, stormType) {
  const SKIES = [
    'clear',
    'partly-cloudy',
    'mostly-cloudy',
    'overcast',
  ];

  const newArray = [];
  _.each(hourlyWeather, (record, index) => {
    // set initial sky
    if (index === 0) {
      if (stormType) {
        // if there is a severe storm today
        if (stormType === 'multiCellClusterS' || stormType === 'multiCellClusterS') {
          // The day is more likely to be sunny to partly-cloudy overall
          if (d30() % 2) {
            return newArray.push({
              ...record,
              condition: generateNextSky('sunny'),
            });
          }

          return newArray.push({
            ...record,
            condition: generateNextSky('partly-cloudy'),
          });
        }

        // if there is a non severe storm today
        if (stormType === 'multiCellClusterS' || stormType === 'multiCellClusterS') {
          // The day is more likely to be mostly-cloudy to overcast
          if (d30() % 2) {
            return newArray.push({
              ...record,
              condition: generateNextSky('mostly-cloudy'),
            });
          }

          return newArray.push({
            ...record,
            condition: generateNextSky('overcast'),
          });
        }
      }
      // if no storm than we just take a stab
      return newArray.push({
        ...record,
        condition: generateNextSky(_.sample(SKIES)),
      });
    }

    // we set our first sky so now we set each new sky sticky to the previous
    const prevRecord = newArray[newArray.length - 1];

    return newArray.push({
      ...record,
      condition: generateNextSky(prevRecord.condition),
    });
  });

  return newArray;
}
