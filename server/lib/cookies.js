export function getCampaignId(req) {
  if (!req.cookies.scribe_session || !req.cookies.scribe_session.campaign) {
    return false;
  }
  return {
    campaignId: req.cookies.scribe_session.campaign,
  };
}
