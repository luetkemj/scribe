export function buildEvent(body) {
  const { eventType, event, time, campaignId } = body;

  return {
    eventType,
    event,
    time,
    campaignId,
  };
}
