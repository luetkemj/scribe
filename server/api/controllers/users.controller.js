import mongoose from 'mongoose';

const logger = require('../../lib/logger')();

const User = mongoose.model('User');

export function getUsers(req, res) {
  const { limit, skip } = req.query;

  User
  .find({})
  .skip(Number(skip) || 0)
  .limit(Number(limit) || 10)
  .sort('name')
  .lean()
  .exec((err, users) => {
    if (!err) {
      logger.log(`getUsers: users.length: ${users.length}`);
      return res.send(users);
    }
    logger.log('getUsers Error: %j', err);
    return res.send(err);
  });
}

export function getUser(req, res) {
  const { id } = req.params;

  User
  .findById(id)
  .lean()
  .exec((err, user) => {
    if (!err) {
      logger.log('getUser: %o', user);
      return res.send(user);
    }
    logger.log('getUser Error: %j', err);
    return res.send(err);
  });
}

export function createUser(req, res) {
  logger.log('createUser: %j', req.body);

  User.create(req.body, (err, user) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createUser: %o', user);
    return res.send(user);
  });
}

export function updateUser(req, res) {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { $set: req.body }, (err, user) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('updateUser: %o', user);
    return res.send(user);
  });
}

export function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndRemove(id, {}, (err, user) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteUser: %o', user);
    return res.send(user);
  });
}
