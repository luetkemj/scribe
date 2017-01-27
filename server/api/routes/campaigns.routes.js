import {
  deleteCampaign,
  getCampaign,
  getCampaigns,
  createCampaign,
  updateCampaign,
} from '../controllers/campaigns.controller';

module.exports = (router) => {
  router.route('/api/campaigns').get(getCampaigns);
  router.route('/api/campaigns/:id').get(getCampaign);
  router.route('/api/campaigns').post(createCampaign);
  router.route('/api/campaigns/:id').patch(updateCampaign);
  router.route('/api/campaigns/:id').delete(deleteCampaign);
};
