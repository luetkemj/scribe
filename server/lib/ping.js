import { getUserGravatar } from './users';

export function buildPingData(user, campaign) {
  const campaignName = campaign ? campaign.name : '';

  const pingData = {
    userId: user._id,
    username: user.username,
    gravatar: getUserGravatar(user.email),
    campaignName,
  };

  return pingData;
}
