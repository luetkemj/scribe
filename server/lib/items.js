import config from '../config';

const logger = require('./logger')();

export function getItemsUrl(limit, skip) {
  const url = `${config.api.items}?limit=${limit}&skip=${skip}`;

  logger.log(`getItemsUrl: url: ${url}`);
  return url;
}

export function getCreateItemUrl() {
  const url = `${config.api.items}`;

  logger.log(`getCreateItemsUrl: url: ${url}`);
  return url;
}

export function getItemUrl(id) {
  const url = `${config.api.items}/${id}`;

  logger.log(`getItemUrl: url: ${url}`);
  return url;
}

export function buildItemUI(item) {
  const itemUI = {
    ...item,
  };

  return itemUI;
}
