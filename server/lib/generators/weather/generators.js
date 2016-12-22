import { d6, d10, d30, toMs, whipWind } from './utils';
import { NS_CELL_TABLE, S_CELL_TABLE } from '../../../config/constants/weather.constants';

// const logger = require('./logger')();

function generateStormCell(table, duration) {
  const { precip, wind, solid, hook } = table[d30()];

  const whippedWind = whipWind(wind);

  return {
    duration,
    wind: whippedWind,
    precip,
    solid,
    hook,
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
      duration,
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
