import async from 'async';
import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildLogUI, buildNewLog } from '../../lib/logs';
import { getCampaignId } from '../../lib/cookies';

const logger = require('../../lib/logger.js')();

const Log = mongoose.model('Log');

export function getLogs(req, res) {
  const authorized = getCampaignId(req);
  if (!authorized) { return res.status(403).send('Error: Forbidden'); }

  const { limit, skip } = req.query;

  return Log
  .find({ campaignId: authorized.campaignId })
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
  if (!getCampaignId(req)) { return res.status(403).send('Error: Forbidden'); }

  const { id } = req.params;

  return Log
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
  const authorized = getCampaignId(req);

  if (!authorized) { return res.status(403).send('Error: Forbidden'); }

  const newLog = buildNewLog(req.body, authorized.campaignId);

  logger.log('createLog: %o', req.body);

  return Log.create(newLog, (err, log) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createLog: %o', log);
    return res.send(log);
  });
}

export function updateLog(req, res) {
  if (!getCampaignId(req)) { return res.status(403).send('Error: Forbidden'); }

  const { id } = req.params;

  return Log.findByIdAndUpdate(id, req.body, { new: true }, (err, log) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }
    logger.log('updateLog: %o', log);
    return res.send(log);
  });
}

export function deleteLogs(req, res) {
  if (!getCampaignId(req)) { return res.status(403).send('Error: Forbidden'); }

  logger.log('deleteLogs: deleting logs:%j', req.body);

  return async.each(req.body, (logId, eachCallback) => {
    logger.log('deleting logs');
    Log.findByIdAndRemove(logId, {}, (err, log) => {
      logger.log(logId);
      if (err) {
        logger.log(err);
        return eachCallback(err);
      }

      logger.log(log);
      return eachCallback(null, log);
    });
  }, (eachError) => {
    if (eachError) { return res.sendStatus(500); }

    logger.log('deleteLogs: logs deleted %j', req.body);
    return res.send(req.body);
  });
}
