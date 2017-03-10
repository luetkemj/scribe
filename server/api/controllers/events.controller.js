import async from 'async';
import mongoose from 'mongoose';
import { buildEvent } from '../../lib/events';
import { getCampaignId } from '../../lib/cookies';

const logger = require('../../lib/logger')();

const Event = mongoose.model('Event');

export function getEvents(req, res) {
  logger.log(req.query);
  const { time, campaignId } = req.query;

  Event
  .find({
    time: { $gte: time },
    campaignId,
  })
  .sort('-time')
  .lean()
  .exec((err, events) => {
    if (!err) {
      logger.log(`getEvents: events.length: ${events.length}`);
      return res.send(events);
    }
    logger.log('getEvents Error: %j', err);
    return res.send(err);
  });
}

export function getEvent(req, res) {
  const { id } = req.params;
  const { campaignId } = req.query;

  Event
  .find({ _id: id, campaignId })
  .lean()
  .exec((err, event) => {
    if (!err) {
      logger.log('getEvent: %o', event);
      return res.send(event);
    }
    logger.log('getEvent Error: %j', err);
    return res.send(err);
  });
}

export function createEvents(req, res) {
  logger.log('createEvents: %j', req.body);

  const authorized = getCampaignId(req);

  if (!authorized) { return res.status(403).send('Error: Forbidden'); }

  return async.each(req.body, (event, callback) => {
    logger.log(event);
    const eventToCreate = buildEvent(event, authorized.campaignId);

    Event.create(eventToCreate, (eachErr, newEvent) => {
      if (eachErr) {
        logger.log(`Error: ${eachErr}`);
        callback(eachErr);
      }
      logger.log('createEvents: event created: %o', newEvent);
      callback();
    });
  }, (error) => {
    if (error) {
      logger.log(`Error: ${error}`);
      return res.send(error);
    }
    logger.log('createEvents: Success! %s', req.body.length);
    return res.status(200).send(`${req.body.length} events created.`);
  });
}

export function updateEvent(req, res) {
  const { id } = req.params;
  const { campaignId } = req.query;

  Event.findOneAndUpdate(
    { _id: id, campaignId },
    { $set: req.body },
    { new: true }, (err, event) => {
      if (err) {
        logger.log(`Error: ${err}`);
        return res.send(err);
      }

      logger.log('updateEvent: %o', event);
      return res.send(event);
    });
}

export function deleteEvent(req, res) {
  const { id } = req.params;
  const { campaignId } = req.query;

  Event.findOneAndRemove({ _id: id, campaignId }, {}, (err, event) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteEvent: %o', event);
    return res.send(event);
  });
}
