import * as _ from 'lodash';
import { parseMs } from '../../../../app/utils/functions';
import { BEAUFORT_SCALE } from '../../../config/constants/weather.constants';

export function temporalEstimation(milliseconds) {
  const days = parseMs(milliseconds, 86400000);
  const hours = parseMs(days.remainder, 3600000);

  if (_.inRange(hours.raw, 0, 0.25)) {
    return 'midnight';
  }

  if (_.inRange(hours.raw, 0, 6)) {
    return 'early morning';
  }

  if (_.inRange(hours.raw, 6, 7)) {
    return 'dawn';
  }

  if (_.inRange(hours.raw, 7, 11.75)) {
    return 'morning';
  }

  if (_.inRange(hours.raw, 11.75, 12.25)) {
    return 'noon';
  }

  if (_.inRange(hours.raw, 12.25, 17)) {
    return 'afternoon';
  }

  if (_.inRange(hours.raw, 17, 18)) {
    return 'evening';
  }

  if (_.inRange(hours.raw, 18, 19)) {
    return 'dusk';
  }

  if (_.inRange(hours.raw, 19, 23.75)) {
    return 'night';
  }

  if (_.inRange(hours.raw, 23.75, 24)) {
    return 'midnight';
  }

  return 'sometime today';
}

export function beaufortScale(wind) {
  if (_.inRange(wind, 0, 1)) {
    return BEAUFORT_SCALE[0];
  }
  if (_.inRange(wind, 1, 4)) {
    return BEAUFORT_SCALE[1];
  }
  if (_.inRange(wind, 4, 8)) {
    return BEAUFORT_SCALE[2];
  }
  if (_.inRange(wind, 8, 13)) {
    return BEAUFORT_SCALE[3];
  }
  if (_.inRange(wind, 13, 18)) {
    return BEAUFORT_SCALE[4];
  }
  if (_.inRange(wind, 18, 25)) {
    return BEAUFORT_SCALE[5];
  }
  if (_.inRange(wind, 25, 31)) {
    return BEAUFORT_SCALE[6];
  }
  if (_.inRange(wind, 31, 39)) {
    return BEAUFORT_SCALE[7];
  }
  if (_.inRange(wind, 39, 47)) {
    return BEAUFORT_SCALE[8];
  }
  if (_.inRange(wind, 47, 55)) {
    return BEAUFORT_SCALE[9];
  }
  if (_.inRange(wind, 55, 64)) {
    return BEAUFORT_SCALE[10];
  }
  if (_.inRange(wind, 64, 73)) {
    return BEAUFORT_SCALE[11];
  }
  if (_.inRange(wind, 73, 10000)) {
    return BEAUFORT_SCALE[12];
  }
  return null;
}
