import _ from 'lodash';

import { generateNewState } from '../utils/state.utils';

import {
  LOAD_EVENTS_INITIATED,
  LOAD_EVENTS_ERROR,
  LOAD_EVENTS_SUCCESS,
  CREATE_EVENTS_INITIATED,
  CREATE_EVENTS_ERROR,
  CREATE_EVENTS_SUCCESS,
  GENERATE_WEATHER_EVENTS_INITIATED,
  GENERATE_WEATHER_EVENTS_ERROR,
  GENERATE_WEATHER_EVENTS_SUCCESS,
} from '../constants/action-types';

const initialState = {
  loadingEvents: false,
  loadingEventsError: null,
  creatingEvents: false,
  creatingEventsError: null,
  generatingWeatherEvents: false,
  generatingWeatherEventsError: null,
  events: [],
};

function insertNewEvents(oldEvents, newEvents) {
  return _.chain(oldEvents)
    .concat(newEvents)
    .orderBy('time')
    .value();
}

export default function eventsQueueReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EVENTS_INITIATED:
      return generateNewState(state, {
        loadingEvents: true,
        loadingEventsError: null,
      });
    case LOAD_EVENTS_ERROR:
      return generateNewState(state, {
        loadingEvents: false,
        loadingEventsError: action.error,
      });
    case LOAD_EVENTS_SUCCESS: {
      const updatedEvents = insertNewEvents(state.events, action.events);

      return generateNewState(state, {
        loadingEvents: false,
        loadingEventsError: null,
        events: updatedEvents,
      });
    }

    case CREATE_EVENTS_INITIATED:
      return generateNewState(state, {
        creatingEvents: true,
        creatingEventsError: null,
      });
    case CREATE_EVENTS_ERROR:
      return generateNewState(state, {
        creatingEvents: false,
        creatingEventsError: action.error,
      });
    case CREATE_EVENTS_SUCCESS: {
      const updatedEvents = insertNewEvents(state.events, action.events);

      return generateNewState(state, {
        creatingEvents: false,
        creatingEventsError: null,
        events: updatedEvents,
      });
    }

    case GENERATE_WEATHER_EVENTS_INITIATED:
      return generateNewState(state, {
        generatingWeatherEvents: true,
        generatingWeatherEventsError: null,
      });
    case GENERATE_WEATHER_EVENTS_ERROR:
      return generateNewState(state, {
        generatingWeatherEvents: false,
        generatingWeatherEventsError: action.error,
      });
    case GENERATE_WEATHER_EVENTS_SUCCESS: {
      const updatedEvents = insertNewEvents(state.events, action.events);

      return generateNewState(state, {
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: updatedEvents,
      });
    }
    default:
      return state;
  }
}
