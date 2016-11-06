import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildLogUI } from '../../lib/logs.js';

const logger = require('../../lib/logger.js')();

const Log = mongoose.model('Log');

export function getLogs(req, res) {
  const { limit, skip } = req.query;

  Log
  .find({})
  .skip(skip || 0)
  .limit(limit || 10)
  .sort('time')
  .lean()
  .exec((err, logs) => {
    if (!err) {
      const logsUI = _.map(logs, log => buildLogUI(log));
      logger.log('getLogs: %j', logsUI);
      return res.send(logsUI);
    }
    logger.log('getLogs Error: %j', err);
    return res.send(err);
  });
}

export function getLog(req, res) {
  const { id } = req.params;

  Log
  .findById(id)
  .lean()
  .exec((err, log) => {
    if (!err) {
      const logUI = buildLogUI(log);
      logger.log('getLogs: %j', logUI);
      return res.send(logUI);
    }
    logger.log('getLog Error: %j', err);
    return res.send(err);
  });
}


export function createLog(req, res) {
  logger.log('createLog: %j', req.body);

  Log.create(req.body, (err, log) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createLog: %j', log);
    return res.send(log);
  });
}

export function updateLog(req, res) {
  const { id } = req.params;

  Log.findByIdAndUpdate(id, { $set: req.body }, (err, log) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('updateLog: %j', log);
    return res.send(log);
  });
}

export function deleteLog(req, res) {
  const { id } = req.params;

  Log.findByIdAndRemove(id, {}, (err, log) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteLog: %j', log);
    return res.send(log);
  });
}
