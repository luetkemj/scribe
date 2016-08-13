import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildItemUI } from '../../lib/items.js';

const logger = require('../../lib/logger')();

const Item = mongoose.model('Item');

export function getItems(req, res) {
  const { limit, skip } = req.query;

  Item
  .find({})
  .skip(skip || 0)
  .limit(limit || 10)
  .sort('name')
  .lean()
  .exec((err, items) => {
    if (!err) {
      const itemsUI = _.map(items, (item) => buildItemUI(item));
      logger.log('getItems: %j', itemsUI);
      return res.send(itemsUI);
    } else {
      throw err;
    }
  });
}

export function getItem(req, res) {
  const { id } = req.params;

  Item
  .findById(id)
  .lean()
  .exec((err, item) => {
    if (!err) {
      const itemUI = buildItemUI(item);
      logger.log('getItems: %j', itemUI);
      return res.send(itemUI);
    } else {
      throw err;
    }
  });
}

export function saveItem(req, res) {
  logger.log(`saveItem: item name: ${req.body}`);

  Item.create(req.body, (err, item) => {
    if (err) return logger.log(`Error: ${err}`);

    logger.log('saveItem: %j', item);
    return res.send();
  });
}

export function updateItem(req, res) {
  const { id } = req.params;

  Item.findByIdAndUpdate(id, { $set: req.body }, (err, item) => {
    if (err) return logger.log(`Error: ${err}`);
    logger.log('updateItem: %j', item);
    return res.send(item);
  });
}

export function deleteItem(req, res) {
  const { id } = req.params;

  Item.findByIdAndRemove(id, {}, (err, item) => {
    if (err) return logger.log(`Error: ${err}`);

    logger.log('deleteItem: %j', item);
    return res.send(item);
  });
}
