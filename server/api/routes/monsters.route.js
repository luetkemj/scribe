import {
  getMonster,
  getMonsters,
} from '../controllers/monsters.controller';

module.exports = (router) => {
  router.route('/api/monsters').get(getMonsters);
  router.route('/api/monsters/:id').get(getMonster);
};
