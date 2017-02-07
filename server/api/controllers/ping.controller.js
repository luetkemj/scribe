import request from 'request';
import config from '../../../server/config';

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
      logger.log('body:', JSON.parse(body));
      logger.log('body.username:', JSON.parse(body).username);
      return res.send({
        userId: req.user.id,
        loggedIn: true,
        username: JSON.parse(body).username,
      });
    });
  }

  // if no user
  return res.send({
    loggedIn: false,
  });
}
