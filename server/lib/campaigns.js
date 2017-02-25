export function buildCampaignData(campaign) {
  const { _id, name } = campaign;
  return {
    _id,
    name,
  };
}
