import {
  // getUser,
  createUser,
} from '../controllers/users.controller';

module.exports = (router) => {
  // router.route('/api/users/:id').get(getUser);
  router.route('/api/users').post(createUser);
};
