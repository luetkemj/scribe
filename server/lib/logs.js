export function buildLogUI(log) {
  const logUI = {
    ...log,
  };

  return logUI;
}

export function buildNewLog(log, campaignId) {
  return {
    ...log,
    campaignId,
  };
}
