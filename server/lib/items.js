import * as _ from 'lodash';

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

export function numberfy(object, keys) {
  let newObject = object;

  _.each(keys, (key) => {
    if (!_.isUndefined(newObject[key])) {
      newObject = Object.assign({}, newObject, {
        [key]: Number(newObject[key]),
      });
    }
  });

  return newObject;
}

export function buildItemUI(item) {
  const { length, value, weight } = item;
  const itemData = item;

  numberfy(itemData, [length, value, weight]);

  const itemUI = {
    ...itemData,
  };

  return itemUI;
}
