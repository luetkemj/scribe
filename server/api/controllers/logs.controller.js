import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildLogUI } from '../../lib/logs';

const logger = require('../../lib/logger.js')();

const Log = mongoose.model('Log');

export function getLogs(req, res) {
  const { limit, skip } = req.query;

  Log
  .find({})
  .skip(Number(skip) || 0)
  .limit(Number(limit) || 10)
  .sort({ time: -1 })
  .lean()
  .exec((err, logs) => {
    if (!err) {
      logger.log(`getLogs: logs.length: ${logs.length}`);
      const logsUI = _.map(logs, log => buildLogUI(log));
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
      logger.log('getLogs: %o', logUI);
      return res.send(logUI);
    }
    logger.log('getLog Error: %j', err);
    return res.send(err);
  });
}


export function createLog(req, res) {
  logger.log('createLog: %o', req.body);

  Log.create(req.body, (err, log) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createLog: %o', log);
    return res.send(log);
  });
}

export function updateLog(req, res) {
  const { id } = req.params;

  Log.findByIdAndUpdate(id, req.body, { new: true }, (err, log) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }
    logger.log('updateLog: %o', log);
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

    logger.log('deleteLog: %o', log);
    return res.send(log);
  });
}
