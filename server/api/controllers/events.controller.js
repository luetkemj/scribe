import mongoose from 'mongoose';
import { buildEvent } from '../../lib/events';

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

export function createEvent(req, res) {
  logger.log('createEvent: %j', req.body);

  Event.create(req.body, (err, event) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    const newEvent = buildEvent(event);

    logger.log('createEvent: %o', newEvent);
    return res.send(newEvent);
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
