import {
  deleteUser,
  getUser,
  getUsers,
  createUser,
  updateUser,
} from '../controllers/users.controller';

module.exports = (router) => {
  router.route('/api/users/:username').get(getUser);
  router.route('/api/users').post(createUser);
// secure routes
  router.route('/api/secure/users').get(getUsers);
  router.route('/api/secure/users/:username').patch(updateUser);
  router.route('/api/secure/users/:username').delete(deleteUser);
};
