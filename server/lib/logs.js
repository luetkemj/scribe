export function buildLogUI(log) {
  const { day, time, season, weather, notes } = log;
  const { condition, wind, temp } = weather;
  const logUI = {
    day,
    time,
    season,
    weather: {
      condition,
      wind,
      temp,
    },
    notes,
  };

  return logUI;
}

export function buildNewLog(log, campaignId) {
  const { day, time, season, weather, notes } = log;
  const { condition, wind, temp } = weather;
  return {
    day,
    time,
    season,
    weather: {
      condition,
      wind,
      temp,
    },
    notes,
    campaignId,
  };
}
