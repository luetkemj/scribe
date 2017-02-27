import mongoose from 'mongoose';
import { signJWT } from '../../lib/jwt';
import config from '../../config';

import { getUserGravatar } from '../../lib/users';

const logger = require('../../lib/logger')();

const User = mongoose.model('User');

export function login(req, res) {
  logger.log('authenticateUser: %j', req.body);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!err) {
      if (user && user.password === req.body.password) {
        logger.log('authenticateUser: User Authenticated 🎉');

        const token = signJWT(user._id);

        return res.cookie(config.cookies.authToken, token, { httpOnly: true }).json({
          username: user.username,
          gravatar: getUserGravatar(user.email),
        });
      }

      logger.log('Error: Username or email is incorrect.');
      return res.status(401).send({ error: 'Username or email is incorrect.' });
    }

    logger.log(`Error: ${err}`);
    return res.status(401).send({ error: err });
  });
}

export function logout(req, res) {
  return res
    .clearCookie(config.cookies.authToken)
    .clearCookie('scribe_session')
    .status(200).send();
}
