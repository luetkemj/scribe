import async from 'async';
import { buildPingData } from '../../lib/ping';
import { findCampaign } from './campaigns.controller';
import { getUser } from './users.controller';

const logger = require('../../lib/logger')();

export function ping(req, res) {
  const campaignId = (req.cookies.scribe_session) ? req.cookies.scribe_session.campaign : null;
  const userId = req.user.id;

  logger.log('campaignId: %s', campaignId);

  async.parallel([
    callback => getUser(userId, callback),
    callback => findCampaign(campaignId, callback),
  ], (err, results) => {
    if (!err) {
      const pingData = buildPingData(results[0], results[1]);

      return res.send(pingData);
    }

    return res.status(401).send({ error: 'unauthorized' });
  });
}
