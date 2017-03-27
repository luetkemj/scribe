import moment from 'moment';

function digestWeatherEvent(event) {
  const { time } = event;
  const day = moment.duration(event.time).days();
  const season = 'winter';
  const weather = {
    conditon: event.event.condition,
    wind: event.event.beaufort_scale.description,
    temp: event.event.temp,
  };

  const weatherEventLog = {
    day,
    time,
    season,
    weather,
    notes: [{
      heading: 'Weather',
      content: 'The weather has changed',
    }],
  };

  return weatherEventLog;
}

export function digestEvents(events) {
  const logs = [];

  for (let i = 0; i < events.length; i += 1) {
    if (events[i].eventType === 'weather') {
      logs.push(digestWeatherEvent(events[i]));
    }
  }

  return logs;
}
