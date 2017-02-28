export function buildPingData(results) {
  const campaignName = results[1] ? results[1].name : '';

  const pingData = {
    ...results[0],
    campaignName,
  };

  return pingData;
}
