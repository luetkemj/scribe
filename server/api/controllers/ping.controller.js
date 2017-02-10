import request from 'request';
import config from '../../../server/config';
import { getUserGravatar } from '../../lib/users';

const logger = require('../../lib/logger')();

export function ping(req, res) {
  if (req.user) {
    const URL = `${config.rootUrl}${config.api.users}/${req.user.id}`;
    logger.log('url: %s', URL);

    return request(URL, (error, response, body) => {
      if (error) {
        logger.log('request error: ', error);
        return res.send(error);
      }

      if (!body) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      return res.send({
        userId: req.user.id,
        username: JSON.parse(body).username,
        gravatar: getUserGravatar(JSON.parse(body).email),
      });
    });
  }

  // if no user
  return res.send(null);
}
