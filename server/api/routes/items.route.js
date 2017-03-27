import {
  getItem,
  getItems,
} from '../controllers/items.controller';

module.exports = (router) => {
  router.route('/api/items').get(getItems);
  router.route('/api/items/:id').get(getItem);
};
