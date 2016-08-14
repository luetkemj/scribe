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
    }
    logger.log('getItems Error: %j', err);
    return res.send(err);
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
    }
    logger.log('getItem Error: %j', err);
    return res.send(err);
  });
}

export function createItem(req, res) {
  logger.log('createItem: %j', req.body);

  Item.create(req.body, (err, item) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createItem: %j', item);
    return res.send(item);
  });
}

export function updateItem(req, res) {
  const { id } = req.params;

  Item.findByIdAndUpdate(id, { $set: req.body }, (err, item) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('updateItem: %j', item);
    return res.send(item);
  });
}

export function deleteItem(req, res) {
  const { id } = req.params;

  Item.findByIdAndRemove(id, {}, (err, item) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteItem: %j', item);
    return res.send(item);
  });
}
