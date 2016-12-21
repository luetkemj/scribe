import * as _ from 'lodash';
import { NS_CELL_TABLE, S_CELL_TABLE } from '../config/constants/weather.constants';

// const logger = require('./logger')();

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
export function toMs(minutes) {
  return minutes * 60000;
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

export function assignTime(array, initialMs) {
  return array.map((item, index) => ({
    ...item,
    // add one hour per item in array. This sets up our initial hourly observed forcast.
    time: initialMs + (3600000 * index),
  }));
}

export function getStormWindow(hourlyWeather, storm) {
  const startOfDay = hourlyWeather[0].time;
  const endOfDay = startOfDay + 86400000;

  return {
    start: startOfDay,
    end: endOfDay - storm.duration,
  };
}

/**
 * Add start and end times to each storm cell
 * @param  {object} storm          [object that represents our storm with an array of cells]
 * @param  {number} stormStartTime [milliseconds from start of gameTime when storm begins]
 * @return {object}                [new object that represents our storm with tracked cells]
 */
export function trackStorm(storm, stormStartTime) {
  let time = stormStartTime;
  const trackedStorm = storm;

  for (let i = 0; i < trackedStorm.cells.length; i += 1) {
    trackedStorm.cells[i].time = time;
    trackedStorm.cells[i].endTime = time + trackedStorm.cells[i].duration;

    time += trackedStorm.cells[i].duration + trackedStorm.cells[i].delay;
  }

  return trackedStorm;
}

/**
 * checks each array index for a property; setting property = to the value of that property
 * at previous index in array if proprty at current index is undefined.
 * @param  {array}  array    [Array of objects to back fill]
 * @param  {string} property [Property to look for at each index]
 * @return {array}           [New backfilled array]
 */
export function backFill(array, property) {
  const newArray = array;
  for (let i = 0; i < newArray.length; i += 1) {
    if (_.isUndefined(newArray[i][property])) {
      newArray[i][property] = newArray[i - 1][property];
    }
  }
  return newArray;
}

/**
 * When a storm cells duration does not end before the next record begins we need to let the storm
 * cell condition overflow into the next record. This function accomplishes that goal.
 * @param  {array} array [Array of Objects that represents our record of hourly weather over a
 *                       24 hour period]
 * @return {array}       [New array]
 */
export function stormOverFlow(array) {
  const newArray = array;
  for (let i = 0; i < newArray.length; i += 1) {
    if (newArray[i + 1]) {
      const next = newArray[i + 1];
      const current = newArray[i];
      if (current.endTime > next.time) {
        newArray[i + 1] = {
          duration: current.endTime - next.time,
          effect: current.effect,
          delay: current.delay,
          time: next.time,
          endTime: current.endTime,
          temp: current.temp,
        };
      }
    }
  }

  return newArray;
}


/**
 * Adds a record between two records when the formers end time is less than the latters start time.
 * @param  {[type]} array [array of weather records over a 24 hour period]
 * @return {[type]}       [new array with gaps filled]
 */
export function fillStormGaps(array) {
  const newArray = array;
  const tempArray = [];

  for (let i = 0; i < newArray.length; i += 1) {
    if (newArray[i + 1] || (newArray[i + 1])) {
      const next = newArray[i + 1];
      const current = newArray[i];
      if (current.endTime < next.time) {
        tempArray.push({
          time: current.endTime + 1,
          temp: current.temp,
          filler: true,
        });
      }
    }
  }

  return _.orderBy(newArray.concat(tempArray), 'time');
}

/**
 * Test if last record ends before midnight. If so add a new record to top off our array.
 * @param  {array} array [array of weather records over a 24 hour period]
 * @return {array}       [new topped off array]
 */
export function topOff(array) {
  const newArray = array;
  const current = newArray[newArray.length - 1];
  if (current.endTime < newArray[0].time + 86400000) {
    newArray.push({
      time: current.endTime + 1,
      temp: current.temp,
      topOff: true,
    });
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
    let delay = 0;
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
