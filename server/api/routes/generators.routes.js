import {
  generateWeather,
} from '../controllers/generators/weather.controller';

module.exports = (router) => {
  router.route('/api/generators/weather').post(generateWeather);
};
