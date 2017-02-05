import { ping } from '../controllers/ping.controller';

module.exports = (router) => {
  router.route('/api/ping').get(ping);
};
