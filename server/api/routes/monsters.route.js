import { getMonsters, getMonster } from '../controllers/monsters.controller';

module.exports = (router) => {
  router.route('/api/monsters').get(getMonsters);
  router.route('/api/monster').get(getMonster);
};
