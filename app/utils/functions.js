/**
 * Takes a number and if it is less than ten, adds a leading zero.
 */
export function leadingZero(number) {
  let newNumber;
  if (number >= 0 && number < 10) {
    newNumber = `0${number}`;
  } else {
    newNumber = `${number}`;
  }

  return newNumber;
}

export function parseMs(milliseconds, divisor) {
  const total = Math.trunc(milliseconds / divisor);
  const remainder = milliseconds % divisor;
  const raw = milliseconds / divisor;

  return {
    total,
    remainder,
    raw,
  };
}

export function buildTimeUI(ms) {
  const days = parseMs(ms, 86400000);
  const hours = parseMs(days.remainder, 3600000);
  const minutes = parseMs(hours.remainder, 60000);
  const seconds = parseMs(minutes.remainder, 1000);

  // set the sky colors per time of day
  let sky;
  if (hours.total === 6) {
    sky = 'dawn';
  } else if (hours.total === 18) {
    sky = 'dusk';
  } else if (hours.total < 6 || hours.total > 18) {
    sky = 'night';
  } else if (hours.total > 6 && hours.total < 18) {
    sky = 'day';
  }

  // set the rotation of the sun and moon
  const rotation =
  // get the rotation based on total number of days
  ((days.total) * -360) +
  // get the rotation based on total number of hours minus half a day
  // to get the sun and moon in the right spot
  ((hours.total * -15) - 180) +
  // get the little bit of rotation from minutes cause the maths are even enough?
  (minutes.total * -0.25);

  return {
    ms,
    days: days.total,
    hours: hours.total,
    minutes: minutes.total,
    seconds: seconds.total,
    sky,
    rotation,
  };
}
