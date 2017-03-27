import {
  getEvents,
  createEvents,
  createWeatherEvents,
} from '../controllers/events.controller';

module.exports = (router) => {
  router.route('/api/secure/events').get(getEvents);
  router.route('/api/secure/events').post(createEvents);

  router.route('/api/secure/events/weather').post(createWeatherEvents);
};
