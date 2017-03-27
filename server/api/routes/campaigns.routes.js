import {
  getCampaign,
  getCampaigns,
  createCampaign,
} from '../controllers/campaigns.controller';

module.exports = (router) => {
  router.route('/api/secure/campaigns').get(getCampaigns);
  router.route('/api/secure/campaigns/:id').get(getCampaign);
  router.route('/api/secure/campaigns').post(createCampaign);
};
