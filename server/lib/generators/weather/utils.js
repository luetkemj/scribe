import * as _ from 'lodash';
import { generateWind } from '../../generators/weather/generators';
import { beaufortScale } from '../../generators/weather/dictionary';

export function d6() {
  return _.random(1, 6);
}

export function d10() {
  return _.random(1, 10);
}

export function d30() {
  return _.random(1, 30);
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

/**
 * Add time proprty to each item in array incrementing each by one hour in milliseconds
 * @param  {array}  array     [description]
 * @param  {number} initialMs [time to begin incrementing from in milliseconds]
 * @return {array}            [new array]
 */
export function assignTime(array, initialMs) {
  return array.map((item, index) => ({
    ...item,
    // add one hour per item in array. This sets up our initial hourly observed forcast.
    time: initialMs + (3600000 * index),
  }));
}

/**
 * generates window of time within 24 hour period a given storm can fit.
 * @param  {array}    hourlyWeather  [description]
 * @param  {object}   storm          [description]
 * @return {object}                  [object containing the start and end of the storm window]
 */
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
    trackedStorm.cells[i].cell_endTime = time + trackedStorm.cells[i].cell_duration;

    time += trackedStorm.cells[i].cell_duration + trackedStorm.cells[i].cell_delay;
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
      if (current.cell_endTime > next.time) {
        newArray[i + 1] = {
          ...current,
          time: next.time,
          duration: current.cell_endTime - next.time,
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

export function whipWind(wind) {
  const whip = d10();

  if (_.inRange(whip, 0, 7)) {
    return wind;
  }

  if (_.inRange(whip, 7, 10)) {
    return wind * 2;
  }

  if (whip === 10) {
    return wind * 3;
  }

  return wind;
}

export function addWind(array, average) {
  const newArray = [];
  _.each(array, (val) => {
    if (!val.wind) {
      const wind = generateWind(average);
      newArray.push({
        ...val,
        wind,
        beaufort_scale: beaufortScale(wind),
      });
    } else {
      newArray.push({
        ...val,
        beaufort_scale: beaufortScale(val.wind),
      });
    }
  });

  return newArray;
}
