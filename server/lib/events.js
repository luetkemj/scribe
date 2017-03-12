import async from 'async';
import _ from 'lodash';

const logger = require('../lib/logger')();

export function buildEvent(event, campaignId) {
  const { eventType, event: newEvent, time } = event;

  return {
    eventType,
    event: newEvent,
    time,
    campaignId,
  };
}

/**
 * [asyncCreateEvents description]
 * @param  {[type]}   model      [mongoose Event Model]
 * @param  {[array]}   events     [array of structured event objects]
 * @param  {[string]}   campaignId
 * @param  {Function} callback   [(null error) => {}]
 */
export function asyncCreateEvents(model, events, campaignId, callback) {
  const createdEvents = [];

  async.each(events, (event, asyncCallback) => {
    const eventToCreate = buildEvent(event, campaignId);

    model.create(eventToCreate, (eachErr, newEvent) => {
      if (eachErr) {
        logger.log(`Error: ${eachErr}`);
        return asyncCallback(eachErr);
      }
      logger.log(`createEvents: event created: ${newEvent.eventType} ${newEvent.time}`);
      createdEvents.push(newEvent);
      return asyncCallback();
    });
  }, (error) => {
    if (error) {
      logger.log(`Error: ${error}`);
      return callback(error);
    }
    logger.log('createEvents: Success! %s', events.length);
    return callback(null, _.orderBy(createdEvents, 'time'));
  });
}
