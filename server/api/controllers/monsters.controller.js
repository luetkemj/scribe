import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildMonsterUI } from '../../lib/monsters.js';

const Monster = mongoose.model('Monster');

export function getMonsters(req, res) {
  const { limit, skip } = req.query;

  Monster
  .find({})
  .skip(skip || 30)
  .limit(limit || 10)
  .sort('name')
  .lean()
  .exec((err, monsters) => {
    if (!err) {
      const monstersUI = _.map(monsters, (monster) => buildMonsterUI(monster));
      return res.send(monstersUI);
    } else {
      throw err;
    }
  });
}

export function getMonster(req, res) {
  const { id } = req.query;

  Monster
  .findById(id)
  .lean()
  .exec((err, monster) => {
    if (!err) {
      const monsterUI = buildMonsterUI(monster);
      return res.send(monsterUI);
    } else {
      throw err;
    }
  });
}
