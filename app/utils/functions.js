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

  return {
    total,
    remainder,
  };
}

export function buildTimeUI(ms) {
  const days = parseMs(ms, 86400000);
  const hours = parseMs(days.remainder, 3600000);
  const minutes = parseMs(hours.remainder, 60000);
  const seconds = parseMs(minutes.remainder, 1000);

  return {
    days: days.total,
    hours: hours.total,
    minutes: minutes.total,
    seconds: seconds.total,
  };
}
