import async from 'async';
import mongoose from 'mongoose';
import request from 'request';
import config from '../../../server/config';
import { getUserGravatar } from '../../lib/users';
import { buildPingData } from '../../lib/ping';

const Campaign = mongoose.model('Campaign');

const logger = require('../../lib/logger')();

export function ping(req, res) {
  function getUser(callback) {
    if (req.user) {
      const URL = `${config.rootUrl}/api/users/${req.user.id}`;
      logger.log('url: %s', URL);

      return request(URL, (error, response, body) => {
        if (error) {
          logger.log('ping: getUser: request error: ', error);
          return callback(error);
        }

        if (!body) {
          logger.log('ping: getUser: request error: ', error);
          return callback(error);
        }

        logger.log('ping: getUser: Success!');
        return callback(null, {
          userId: req.user.id,
          username: JSON.parse(body).username,
          gravatar: getUserGravatar(JSON.parse(body).email),
        });
      });
    }

    return callback('error: unauthorized');
  }

  function getCampaign(callback) {
    if (!req.cookies.scribe_session || !req.cookies.scribe_session.campaign) {
      return callback(null);
    }

    return Campaign.findById(req.cookies.scribe_session.campaign)
    .lean()
    .exec((err, campaign) => {
      if (!err) {
        logger.log(`getCampaign: campaign: ${campaign}`);
        return callback(null, campaign);
      }
      logger.log('getLogs Error: %j', err);
      return callback(err);
    });
  }

  async.parallel([
    getUser,
    getCampaign,
  ], (err, results) => {
    if (!err) {
      const pingData = buildPingData(results);

      return res.send(pingData);
    }

    return res.status(401).send({ error: 'unauthorized' });
  });
}
