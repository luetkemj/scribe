import {
  deleteItem,
  getItem,
  getItems,
  createItem,
  updateItem,
} from '../controllers/items.controller';

module.exports = (router) => {
  router.route('/api/items').get(getItems);
  router.route('/api/items/:id').get(getItem);
  router.route('/api/items').post(createItem);
  router.route('/api/items/:id').patch(updateItem);
  router.route('/api/items/:id').delete(deleteItem);
};
