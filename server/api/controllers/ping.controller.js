const logger = require('../../lib/logger')();

export function ping(req, res) {
  if (req.user) {
    logger.log('ping %s', req.user.id);
    return res.send({
      userId: req.user.id,
      loggedIn: true,
    });
  }

  return res.send({
    loggedIn: false,
  });
}
