import mongoose from 'mongoose';
import { buildCampaignData } from '../../lib/campaigns';

const logger = require('../../lib/logger')();

const Campaign = mongoose.model('Campaign');

export function getCampaigns(req, res) {
  Campaign
  .find({
    userId: req.user.id,
  })
  .sort('name')
  .lean()
  .exec((err, campaigns) => {
    if (!err) {
      logger.log(`getCampaigns: campaigns.length: ${campaigns.length}`);
      return res.send(campaigns.map(campaign => buildCampaignData(campaign)));
    }
    logger.log('getCampaigns Error: %j', err);
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
      return res.send(buildCampaignData(campaign[0]));
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
