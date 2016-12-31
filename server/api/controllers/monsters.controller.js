import * as _ from 'lodash';
import mongoose from 'mongoose';
import { buildMonsterUI } from '../../lib/monsters';

const logger = require('../../lib/logger')();

const Monster = mongoose.model('Monster');

export function createMonster(req, res) {
  logger.log('createMonster: %o', req.body);

  Monster.create(req.body, (err, monster) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('saveMonster: %o', monster);
    return res.send(monster);
  });
}

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

export function updateMonster(req, res) {
  const { id } = req.params;

  Monster.findByIdAndUpdate(id, { $set: req.body }, (err, monster) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('updateMonster: %o', monster);
    return res.send(monster);
  });
}

export function deleteMonster(req, res) {
  const { id } = req.params;

  Monster.findByIdAndRemove(id, {}, (err, monster) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteMonster: %o', monster);
    return res.send(monster);
  });
}
