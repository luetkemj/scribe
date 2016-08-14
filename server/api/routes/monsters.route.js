import {
  deleteMonster,
  getMonster,
  getMonsters,
  createMonster,
  updateMonster,
} from '../controllers/monsters.controller';

module.exports = (router) => {
  router.route('/api/monsters').get(getMonsters);
  router.route('/api/monsters/:id').get(getMonster);
  router.route('/api/monsters').post(createMonster);
  router.route('/api/monsters/:id').patch(updateMonster);
  router.route('/api/monsters/:id').delete(deleteMonster);
};
