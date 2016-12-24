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
 * checks each array index for each property in properties;
 * setting property = to the value of that property at previous index in array
 * if property at current index is undefined.
 * @param  {array}  array    [Array of objects to back fill]
 * @param  {array} property  [Properties to look for at each index]
 * @return {array}           [New backfilled array]
 */
export function backFill(array, properties) {
  const newArray = [];
  _.each(array, (record, index) => {
    const tempObject = {};
    _.each(properties, (property) => {
      if (_.isUndefined(record[property])) {
        tempObject[property] = array[index - 1][property];
      }
    });

    _.assign(record, tempObject);

    return newArray.push({
      ...record,
    });
  });
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
          cell_duration: current.cell_endTime - next.time,
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
  const newArray = [];

  _.each(array, (record, index) => {
    if (array[index + 1]) {
      const next = array[index + 1];

      if (record.cell_endTime < next.time) {
        newArray.push({
          time: record.cell_endTime + 1,
          temp: record.temp,
          rh: record.rh,
        });
      }
    }
  });

  return _.orderBy(array.concat(newArray), 'time');
}

/**
 * Test if last record ends before midnight. If so add a new record to top off our array.
 * @param  {array} array [array of weather records over a 24 hour period]
 * @return {array}       [new topped off array]
 */
export function topOff(array) {
  const newArray = [];
  const record = array[array.length - 1];
  if (record.cell_endTime < array[0].time + 86400000) {
    newArray.push({
      time: record.cell_endTime + 1,
      temp: record.temp,
      rh: record.rh,
    });
  }
  return array.concat(newArray);
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

export function getHeatIndex(T, R) {
  // Source: https://en.wikipedia.org/wiki/Heat_index#Formula
  const C1 = -42.379;
  const C2 = 2.04901523;
  const C3 = 10.14333127;
  const C4 = -0.22475541;
  const C5 = -6.83783 * Math.pow(10, -3);
  const C6 = -5.481717 * Math.pow(10, -2);
  const C7 = 1.22874 * Math.pow(10, -3);
  const C8 = 8.5282 * Math.pow(10, -4);
  const C9 = -1.99 * Math.pow(10, -6);

  const HI = Math.round(
             C1 +
            (C2 * T) +
            (C3 * R) +
            (C4 * T * R) +
            (C5 * Math.pow(T, 2)) +
            (C6 * Math.pow(R, 2)) +
            (C7 * Math.pow(T, 2) * R) +
            (C8 * T * Math.pow(R, 2)) +
            (C9 * Math.pow(T, 2) * Math.pow(R, 2)));

  const notes = {};

  // Source: https://en.wikipedia.org/wiki/Heat_index#Effects_of_the_heat_index_.28shade_values.29
  if (_.inRange(HI, 80, 91)) {
    notes.warning = 'Caution';
    notes.description = 'Caution: fatigue is possible with prolonged exposure and activity. Continuing activity could result in heat cramps.';
  }
  if (_.inRange(HI, 90, 106)) {
    notes.warning = 'Extreme Caution';
    notes.description = 'Extreme caution: heat cramps and heat exhaustion are possible. Continuing activity could result in heat stroke.';
  }
  if (_.inRange(HI, 105, 131)) {
    notes.warning = 'Danger';
    notes.description = 'Danger: heat cramps and heat exhaustion are likely; heat stroke is probable with continued activity.';
  }
  if (HI > 130) {
    notes.warning = 'Extreme Danger';
    notes.description = 'Extreme danger: heat stroke is imminent.';
  }

  return {
    number: Math.round(HI),
    ...notes,
  };
}
