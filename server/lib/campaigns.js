export function buildCampaignData(campaign) {
  const { _id, name } = campaign;
  return {
    _id,
    name,
  };
}

export function buildCampaignDetails(campaign, log) {
  const { name, _id } = campaign;
  let time = 0;

  if (log[0]) {
    time = log[0].time;
  }

  return {
    name,
    _id,
    time,
  };
}
