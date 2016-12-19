import { NS_CELL_TABLE, S_CELL_TABLE } from '../config/constants/weather.constants';

const logger = require('./logger')();

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

export function d6() {
  return getRandomInt(0, 6);
}

export function d10() {
  return getRandomInt(0, 10);
}

export function d30() {
  return getRandomInt(0, 30);
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

export function generateSingleCell() {
  return [{
    duration: d10() + 20,
    effect: NS_CELL_TABLE[d30()],
  }];
}

export function generateMultiCell(table, cluster) {
  const cells = [];
  for (let i = 0; i < d6() + 2; i += 1) {
    let delay;
    if (cluster) {
      delay = Math.ceil(d30() / 2);
    }

    cells.push({
      duration: d10() + 20,
      effect: table[d30()],
      delay,
    });
  }
  return cells;
}

export function generateSuperCell() {
  const duration = 60 + (d30() * 10);
  const cells = [];

  for (let i = 1; i <= duration / 10; i += 1) {
    if (i === 1) {
      cells.push({
        duration: 10,
        effect: S_CELL_TABLE[d10()],
      });
    }

    if (i === 2) {
      cells.push({
        duration: 10,
        effect: S_CELL_TABLE[d10() + 10],
      });
    }

    if (i === duration) {
      cells.push({
        duration: 10,
        effect: S_CELL_TABLE[d10()],
      });
    }

    if (i > 2 && i < duration) {
      cells.push({
        duration: 10,
        effect: S_CELL_TABLE[d10() + 20],
      });
    }
  }

  return cells;
}


export function generateStorm(stormType) {
  if (stormType === 'singleCell') {
    return generateSingleCell();
  }
  if (stormType === 'multiCellClusterNS') {
    return generateMultiCell(NS_CELL_TABLE, true);
  }
  if (stormType === 'multiCellClusterS') {
    return generateMultiCell(S_CELL_TABLE, true);
  }
  if (stormType === 'multiCellLineNS') {
    return generateMultiCell(NS_CELL_TABLE, false);
  }
  if (stormType === 'multiCellLineS') {
    return generateMultiCell(S_CELL_TABLE, false);
  }
  if (stormType === 'superCell') {
    return generateSuperCell();
  }
  return null;
}
