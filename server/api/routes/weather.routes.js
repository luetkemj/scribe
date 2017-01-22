import {
  getWeather,
  getWeathers,
  createWeather,
  updateWeather,
  deleteWeather,
} from '../controllers/weathers.controller';

module.exports = (router) => {
  router.route('/api/weather').get(getWeathers);
  router.route('/api/weather/:id').get(getWeather);
  router.route('/api/weather').post(createWeather);
  router.route('/api/weather/:id').patch(updateWeather);
  router.route('/api/weather/:id').delete(deleteWeather);
};
