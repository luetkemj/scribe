import {
  deleteUser,
  getUser,
  getUsers,
  createUser,
  updateUser,
} from '../controllers/users.controller';

module.exports = (router) => {
  router.route('/api/users/:id').get(getUser);
  router.route('/api/users').post(createUser);
// secure routes
  router.route('/api/secure/users').get(getUsers);
  router.route('/api/secure/users/:id').patch(updateUser);
  router.route('/api/secure/users/:id').delete(deleteUser);
};
