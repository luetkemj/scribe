import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildMonsterUI } from '../../lib/monsters';

const logger = require('../../lib/logger')();

const Monster = mongoose.model('Monster');

export function getMonsters(req, res) {
  const { limit, skip } = req.query;

  Monster
  .find({})
  .skip(Number(skip) || 0)
  .limit(Number(limit) || 10)
  .sort('name')
  .lean()
  .exec((err, monsters) => {
    if (!err) {
      logger.log(`getMonsters: monsters.length ${monsters.length}`);
      const monstersUI = _.map(monsters, monster => buildMonsterUI(monster));
      return res.send(monstersUI);
    }
    logger.log('getMonsters Error: %j', err);
    return res.send(err);
  });
}

export function getMonster(req, res) {
  const { id } = req.params;

  Monster
  .findById(id)
  .lean()
  .exec((err, monster) => {
    if (!err) {
      const monsterUI = buildMonsterUI(monster);
      logger.log('getMonster: %o', monsterUI);
      return res.send(monsterUI);
    }
    logger.log('getMonster Error: %j', err);
    return res.send(err);
  });
}
