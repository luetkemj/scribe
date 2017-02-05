import {
  login,
  logout,
} from '../controllers/login.controller';

module.exports = (router) => {
  router.route('/api/login').post(login);
  router.route('/api/logout').post(logout);
};
