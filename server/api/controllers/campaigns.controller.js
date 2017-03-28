import async from 'async';
import mongoose from 'mongoose';
import { buildCampaignData, buildCampaignDetails } from '../../lib/campaigns';

const logger = require('../../lib/logger')();

const Campaign = mongoose.model('Campaign');
const Log = mongoose.model('Log');

// get all campaigns belonging to userId
function getEachCampaigns(userId, callback) {
  Campaign
  .find({
    userId,
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
  // to get some campaign details from the campaign logs like time and day, we do a map over each
  // campaign in campaigns and get the most recent returning it's most recent log.
  // From this we can build eachCampaignsDetails
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

// get campaigns for the list of existing campaigns for logged in user on /campaigns
export function getCampaigns(req, res) {
  async.waterfall([
    callback => getEachCampaigns(req.user.id, callback),
    getEachCampaignDetails,
  ], (err, result) => {
    if (!err) {
      return res.send(result);
    }
    return res.send(err);
  });
}

export function findCampaign(campaignId, callback) {
  Campaign
  .findById(campaignId)
  .lean()
  .exec((err, campaign) => {
    if (!err) {
      logger.log('findCampaign: %j', campaign);
      const campaignData = buildCampaignData(campaign);
      return callback(null, campaignData);
    }
    logger.log('getCampaign Error: %j', err);
    return callback(err);
  });
}

export function getCampaign(req, res) {
  return findCampaign(req.params.id, (err, campaign) => {
    if (!err) {
      logger.log('getCampaign: %o', campaign);
      const campaignData = buildCampaignData(campaign);
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
