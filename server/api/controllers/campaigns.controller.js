import mongoose from 'mongoose';

const logger = require('../../lib/logger')();

const Campaign = mongoose.model('Campaign');

export function getCampaigns(req, res) {
  if (req.user) {
    Campaign
    .find({
      userId: req.user.id,
    })
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
  return res.status(401).send({ error: 'Unauthorized' });
}

export function getCampaign(req, res) {
  if (req.user) {
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
        return res.send(campaign);
      }
      logger.log('getCampaign Error: %j', err);
      return res.send(err);
    });
  }
  return res.status(401).send({ error: 'Unauthorized' });
}

export function createCampaign(req, res) {
  if (req.user) {
    const campaign = {
      name: req.body.name,
      userId: req.user.id,
    };

    logger.log('createCampaign: %j', campaign);

    Campaign.create(req.body, (err, createdCampaign) => {
      if (err) {
        logger.log(`Error: ${err}`);
        return res.send(err);
      }

      logger.log('createCampaign: %o', createdCampaign);
      return res.send(createdCampaign);
    });
  }
  return res.status(401).send({ error: 'Unauthorized' });
}

export function updateCampaign(req, res) {
  if (req.user) {
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
  return res.status(401).send({ error: 'Unauthorized' });
}

export function deleteCampaign(req, res) {
  if (req.user) {
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
  return res.status(401).send({ error: 'Unauthorized' });
}
