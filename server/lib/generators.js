import * as _ from 'lodash';
import { NS_CELL_TABLE, S_CELL_TABLE } from '../config/constants/weather.constants';

const logger = require('./logger')();

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

export function d6() {
  return getRandomInt(1, 6);
}

export function d10() {
  return getRandomInt(1, 10);
}

export function d30() {
  return getRandomInt(1, 30);
}

// convert minutes to milliseconds
export function toMs(min) {
  return min * 60000;
}

// alternates pushing and shifting elements from candidate onto new array.
// Example: [5,4,3,2,1] > [1,3,5,4,2]
export function shimmy(array) {
  const newArray = [];

  for (let i = 0; i < array.length; i += 1) {
    if (i % 2) {
      newArray.push(array[i]);
    } else {
      newArray.unshift(array[i]);
    }
  }

  return newArray;
}

/*
 * @TODO: test this bugger!
 */
export function assignTime(array, initialMs) {
  return array.map((item, index) => ({
    ...item,
    // add one hour per item in array. This sets up our initial hourly observed forcast.
    time: initialMs + (3600000 * index),
  }));
}

/*
 * @TODO: test this bugger!
 * will need to break it into smaller bits and get the random func out of there.
 */
export function trackStorm(hourly, storm) {
  logger.log('trackStorm: storm: %j', storm);
  const startOfDay = hourly[0].time;
  // get endofday
  const endOfDay = startOfDay + 86400000;
  // subtract storm duration
  const endOfStormWindow = endOfDay - storm.duration;
  // get random time from start of day to last possible start of storm
  const stormStartTime = getRandomInt(startOfDay, endOfStormWindow);
  let time = stormStartTime;
  logger.log('trackStorm: time: %s', time);
  logger.log('trackStorm: stormStartTime: %s', stormStartTime);

  for (let i = 0; i < storm.cells.length; i += 1) {
    hourly.push({
      time,
      cell: storm.cells[i],
    });

    time += storm.cells[i].duration + storm.cells[i].delay;
    logger.log('trackStorm: time: %s', time);
  }

  const newArray = _.orderBy(hourly, 'time');

  for (let i = 0; i < newArray.length; i += 1) {
    if (_.isUndefined(newArray[i].temp)) {
      newArray[i].temp = newArray[i - 1].temp;
    }
  }

  return newArray;
}

/*
 * @TODO: test this bugger!
 */
export function generateSingleCell() {
  const duration = toMs(d10() + 20);
  return {
    duration,
    cells: [{
      duration,
      effect: NS_CELL_TABLE[d30()],
    }],
  };
}

/*
 * @TODO: test this bugger!
 */
export function generateMultiCell(table, cluster) {
  const cells = [];
  let totalDuration = 0;

  for (let i = 0; i < d6() + 2; i += 1) {
    let delay;
    if (cluster) {
      delay = Math.ceil(d30() / 2);
      totalDuration += toMs(delay);
    }

    const duration = toMs(d10() + 20);
    totalDuration += duration;

    cells.push({
      duration,
      effect: table[d30()],
      delay: toMs(delay),
    });
  }
  return {
    duration: totalDuration,
    cells,
  };
}

/*
 * @TODO: test this bugger!
 */
export function generateSuperCell() {
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
