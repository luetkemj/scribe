import {
  deleteItem,
  getItem,
  getItems,
  saveItem,
  updateItem,
} from '../controllers/items.controller';

module.exports = (router) => {
  router.route('/api/items').get(getItems);
  router.route('/api/items').put(saveItem);
  router.route('/api/items/:id').get(getItem);
  router.route('/api/items/:id').patch(updateItem);
  router.route('/api/items/:id').delete(deleteItem);
};
