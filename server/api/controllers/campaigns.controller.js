import mongoose from 'mongoose';

const logger = require('../../lib/logger')();

const Campaign = mongoose.model('Campaign');

export function getCampaigns(req, res) {
  const { limit, skip } = req.query;

  Campaign
  .find({})
  .skip(Number(skip) || 0)
  .limit(Number(limit) || 10)
  .sort('name')
  .lean()
  .exec((err, campaigns) => {
    if (!err) {
      logger.log(`getCampaigns: campaigns.length: ${campaigns.length}`);
      return res.send(campaigns);
    }
    logger.log('getCampaigns Error: %j', err);
    return res.send(err);
  });
}

export function getCampaign(req, res) {
  const { id } = req.params;

  Campaign
  .findById(id)
  .lean()
  .exec((err, campaign) => {
    if (!err) {
      logger.log('getCampaign: %o', campaign);
      return res.send(campaign);
    }
    logger.log('getCampaign Error: %j', err);
    return res.send(err);
  });
}

export function createCampaign(req, res) {
  logger.log('createCampaign: %j', req.body);

  Campaign.create(req.body, (err, campaign) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('createCampaign: %o', campaign);
    return res.send(campaign);
  });
}

export function updateCampaign(req, res) {
  const { id } = req.params;

  Campaign.findByIdAndUpdate(id, { $set: req.body }, (err, campaign) => {
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

  Campaign.findByIdAndRemove(id, {}, (err, campaign) => {
    if (err) {
      logger.log(`Error: ${err}`);
      return res.send(err);
    }

    logger.log('deleteCampaign: %o', campaign);
    return res.send(campaign);
  });
}
