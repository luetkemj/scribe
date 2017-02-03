import {
  authenticateUser,
} from '../controllers/authenticate.controller';

module.exports = (router) => {
  router.route('/api/authenticate').post(authenticateUser);
};
