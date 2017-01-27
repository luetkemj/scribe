import {
  deleteUser,
  getUser,
  getUsers,
  createUser,
  updateUser,
} from '../controllers/users.controller';

module.exports = (router) => {
  router.route('/api/users').get(getUsers);
  router.route('/api/users/:id').get(getUser);
  router.route('/api/users').post(createUser);
  router.route('/api/users/:id').patch(updateUser);
  router.route('/api/users/:id').delete(deleteUser);
};
