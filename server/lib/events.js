export function buildEvent(event, campaignId) {
  const { eventType, event: newEvent, time } = event;

  return {
    eventType,
    event: newEvent,
    time,
    campaignId,
  };
}
