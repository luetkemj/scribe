import async from 'async';
import mongoose from 'mongoose';
import { buildCampaignData, buildCampaignDetails } from '../../lib/campaigns';

const logger = require('../../lib/logger')();

const Campaign = mongoose.model('Campaign');
const Log = mongoose.model('Log');

// get campaigns for the list of existing campaigns for logged in user on /campaigns
export function getCampaigns(req, res) {
  // get all campaigns belonging to req.user.id
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

  // to get some campaign details from the campaign logs like time and day, we do a map over each
  // campaign and get the most recent returning it's most recent log.
  // From this we can build eachCampaignsDetails
  function getEachCampaignDetails(campaigns, callback) {
    async.map(campaigns, (campaign, mapCallback) => {
      logger.log('getEachCampaignDetails: campaign: %j', campaign);
      Log.find({ campaignId: campaign._id })
      .sort({ time: -1 })
      .limit(1)
      .lean()
      .exec((findError, log) => {
        if (!findError) {
          logger.log('getEachCampaignDetails: Log: %j', log);
          return mapCallback(null, buildCampaignDetails(campaign, log));
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

  // waterfall the two previous and very merry function it's async for xmas!
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
      res.cookie('scribe_session', { campaign: campaignData._id });
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
