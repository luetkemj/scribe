import {
  deleteEvent,
  getEvent,
  getEvents,
  createEvents,
  updateEvent,
  createWeatherEvents,
} from '../controllers/events.controller';

module.exports = (router) => {
  router.route('/api/secure/events').get(getEvents);
  router.route('/api/secure/events/:id').get(getEvent);
  router.route('/api/secure/events').post(createEvents);
  router.route('/api/secure/events/:id').patch(updateEvent);
  router.route('/api/secure/events/:id').delete(deleteEvent);
  router.route('/api/secure/events/weather').post(createWeatherEvents);
};
