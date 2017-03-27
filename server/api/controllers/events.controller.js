import mongoose from 'mongoose';
import { asyncCreateEvents } from '../../lib/events';
import { getCampaignId } from '../../lib/cookies';
import { getGenerator } from '../../lib/generators/generators';
import { generateWeather } from './generators/weather.controller';

const logger = require('../../lib/logger')();

const Event = mongoose.model('Event');

export function getEvents(req, res) {
  const authorized = getCampaignId(req);
  if (!authorized) { return res.status(403).send('Error: Forbidden'); }

  const { time } = req.query;

  return Event
  .find({
    time: { $gte: time },
    campaignId: authorized.campaignId,
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

export function createEvents(req, res) {
  const authorized = getCampaignId(req);
  if (!authorized) { return res.status(403).send('Error: Forbidden'); }

  return asyncCreateEvents(req.body, authorized.campaignId, (error, events) => {
    if (error) {
      return res.send(error);
    }

    return res.status(200).send(events);
  });
}

export function createWeatherEvents(req, res) {
  const authorized = getCampaignId(req);
  if (!authorized) { return res.status(403).send('Error: Forbidden'); }

  logger.log('createWeatherEvents: initialize request');
  const { zone, terrain, season, month, initialMs } = req.body;

  return getGenerator('weather', (err, generator) => {
    if (err) {
      return res.send(err);
    }

    const forecast = generateWeather(generator.generator, zone, terrain, season, month, initialMs);

    const weatherEvents = forecast.hourlyWeather.map(record => (
      {
        eventType: 'weather',
        event: record,
        time: record.time,
      }
    ));
    return asyncCreateEvents(Event, weatherEvents, authorized.campaignId, (error, events) => {
      if (error) {
        return res.send(error);
      }

      return res.status(200).send(events);
    });
  });
}
