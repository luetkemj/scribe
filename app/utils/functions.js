import moment from 'moment';

export function buildTimeUI(ms) {
  const myMoment = moment.utc(ms);

  // get absolute days from start of time
  const days = moment.duration(ms).days();
  const hours = myMoment.format('HH');
  const minutes = myMoment.format('mm');
  const seconds = myMoment.format('ss');
  const hoursN = parseInt(hours, 10);
  const minutesN = parseInt(minutes, 10);

  // set the sky colors per time of day
  let sky;
  if (hoursN === 6) {
    sky = 'dawn';
  } else if (hoursN === 18) {
    sky = 'dusk';
  } else if (hoursN < 6 || hoursN > 18) {
    sky = 'night';
  } else if (hoursN > 6 && hoursN < 18) {
    sky = 'day';
  }

  // set the rotation of the sun and moon
  const rotation =
  // get the rotation based on total number of days
  ((days) * -360) +
  // get the rotation based on total number of hours minus half a day
  // to get the sun and moon in the right spot
  ((hoursN * -15) - 180) +
  // get the little bit of rotation from minutes cause the maths are even enough?
  (minutesN * -0.25);

  return {
    ms,
    days,
    hours,
    minutes,
    seconds,
    sky,
    rotation,
  };
}

export function phaseOfMoon(day, hours) {
  // day is 0 based so we need to add 1 because our phases of the moon are 1 based
  const dayN = parseInt(day, 10) + 1;
  const hoursN = parseInt(hours, 10);

  if (dayN < 29) {
    if (hoursN > 12) {
      return dayN + 1;
    }
    return dayN;
  }

  if (hoursN > 12) {
    return (dayN % 28) + 1;
  }

  return dayN % 28;
}
