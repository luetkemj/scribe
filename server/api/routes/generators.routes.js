import {
  generateWeather,
} from '../controllers/generators.controller';

module.exports = (router) => {
  router.route('/api/generators/weather').post(generateWeather);
};
