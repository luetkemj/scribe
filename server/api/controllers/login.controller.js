import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { signJWT } from '../../lib/jwt';
import config from '../../config';

import { getUserGravatar } from '../../lib/users';

const logger = require('../../lib/logger')();

const User = mongoose.model('User');

export function login(req, res) {
  logger.log('authenticateUser: %j', req.body);

  // check db for a user matching the user submitted email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!err) {
      // user exists!
      // confirm user has a password
      if (user && user.password) {
        // user exists and has a password!
        // because we are good citizens the password in the db is hashed.
        // compare user submitted plaintext with hash in db
        return bcrypt.compare(req.body.password, user.password, (bcryptError, authenticated) => {
          // check that there was no error with bcrypt and that the hash and password match
          if (!bcryptError && authenticated) {
            // no errors and the hash and password match!
            // User Authenticated!!
            logger.log('authenticateUser: User Authenticated 🎉');

            // now that the user it total legit we can create a new token
            const token = signJWT(user._id);

            // save that token to a cookie and we are good to go!
            return res.cookie(config.cookies.authToken, token, { httpOnly: true }).json({
              username: user.username,
              gravatar: getUserGravatar(user.email),
            });
          }

          // oh no, this is terrible. This is bad. There was an error...
          logger.log('Error: Username or email is incorrect.');
          // return a fairly ambiguous error
          // (wouldn't want to give those dirty hackers too much info!)
          return res.status(401).send({ error: 'Username or email is incorrect.' });
        });
      }

      // oh no, this is terrible. This is bad. There was an error...
      // log it to find out what all the fuss is about
      logger.log(`Error: ${err}`);

      // return a fairly ambiguous error
      // (wouldn't want to give those dirty hackers too much info!)
      return res.status(401).send({ error: 'Username or email is incorrect.' });
    }

    // oh no, this is terrible. This is bad. There was an error...
    // log it to find out what all the fuss is about
    logger.log(`Error: ${err}`);
    // return a fairly ambiguous error
    // (wouldn't want to give those dirty hackers too much info!)
    return res.status(401).send({ error: 'Username or email is incorrect.' });
  });
}

export function logout(req, res) {
  return res
    .clearCookie(config.cookies.authToken)
    .clearCookie('scribe_session')
    .status(200).send();
}
