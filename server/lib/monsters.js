import config from '../config';
const logger = require('./logger')();

export function getMonstersUrl(limit, skip) {
  const url = `${config.api.monsters}?limit=${limit}&skip=${skip}`;

  logger.log(`getMonstersUrl: url: ${url}`);
  return url;
}

export function getMonsterUrl(id) {
  const url = `${config.api.monster}?id=${id}`;

  logger.log(`getMonsterUrl: url: ${url}`);
  return url;
}
