import async from 'async';
import mongoose from 'mongoose';
import { buildCampaignData } from '../../lib/campaigns';

const logger = require('../../lib/logger')();

const Campaign = mongoose.model('Campaign');
const Log = mongoose.model('Log');

export function getCampaigns(req, res) {
  function getEachCampaigns(callback) {
    Campaign
    .find({
      userId: req.user.id,
    })
    .sort('name')
    .lean()
    .exec((err, campaigns) => {
      if (!err) {
        logger.log('getCampaigns: %j', campaigns);
        return callback(null, campaigns.map(campaign => buildCampaignData(campaign)));
      }
      logger.log('getCampaigns Error: %j', err);
      return callback(err);
    });
  }

  function getEachCampaignDetails(campaigns, callback) {
    async.map(campaigns, (campaign, mapCallback) => {
      logger.log('getEachCampaignDetails: %j', campaign);
      Log.find({
        campaignId: campaign._id,
      })
      // .sort({ time: -1 })
      .limit(1)
      .lean()
      .exec((findError, log) => {
        if (!findError) {
          logger.log('getEachCampaignDetails: Log: %j', log);
          return mapCallback(null, {
            ...campaign,
            day: log.day,
            time: log.time,
          });
        }
        return mapCallback(findError);
      });
    }, (eachError, eachCampaignsDetails) => {
      if (eachError) {
        logger.log('eachError: %j', eachError);
        return callback(eachError);
      }

      logger.log('getEachCampaignDetails: Success: %o', eachCampaignsDetails);
      return callback(null, eachCampaignsDetails);
    });
  }

  async.waterfall([
    getEachCampaigns,
    getEachCampaignDetails,
  ], (err, result) => {
    if (!err) {
      return res.send(result);
    }
    return res.send(err);
  });
}

export function getCampaign(req, res) {
  const { id } = req.params;

  Campaign
  .find({
    _id: id,
    userId: req.user.id,
  })
  .lean()
  .exec((err, campaign) => {
    if (!err) {
      logger.log('getCampaign: %o', campaign);
      const campaignData = buildCampaignData(campaign[0]);
      req.user.campaignId = campaignData._id; // eslint-disable-line no-param-reassign
      return res.send(campaignData);
    }
    logger.log('getCampaign Error: %j', err);
    return res.send(err);
  });
}

export function createCampaign(req, res) {
  const campaign = {
    name: req.body.name,
    userId: req.user.id,
  };

  logger.log('createCampaign: %j', campaign);

  Campaign.create(campaign, (err, createdCampaign) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createCampaign: %o', createdCampaign);
    return res.send(createdCampaign);
  });
}

export function updateCampaign(req, res) {
  const { id } = req.params;

  Campaign.update({
    _id: id,
    userId: req.user.id,
  }, { $set: req.body }, (err, campaign) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('updateCampaign: %o', campaign);
    return res.send(campaign);
  });
}

export function deleteCampaign(req, res) {
  const { id } = req.params;

  Campaign.remove({
    _id: id,
    userId: req.user.id,
  }, (err, campaign) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteCampaign: %o', campaign);
    return res.send(campaign);
  });
}
