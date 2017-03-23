import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

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

function loadEventsInitiated() {
  return { type: LOAD_EVENTS_INITIATED };
}

function loadEventsError(error) {
  return {
    type: LOAD_EVENTS_ERROR,
    error,
  };
}

function loadEventsSuccess(events) {
  return {
    type: LOAD_EVENTS_SUCCESS,
    events,
  };
}

function createEventsInitiated() {
  return { type: CREATE_EVENTS_INITIATED };
}

function createEventsError(error) {
  return {
    type: CREATE_EVENTS_ERROR,
    error,
  };
}

function createEventsSuccess() {
  return {
    type: CREATE_EVENTS_SUCCESS,
  };
}

function generateWeatherEventsInitiated() {
  return { type: GENERATE_WEATHER_EVENTS_INITIATED };
}

function generateWeatherEventsError(error) {
  return {
    type: GENERATE_WEATHER_EVENTS_ERROR,
    error,
  };
}

function generateWeatherEventsSuccess(events) {
  return {
    type: GENERATE_WEATHER_EVENTS_SUCCESS,
    events,
  };
}

export function loadEvents(time) {
  return (dispatch) => {
    dispatch(loadEventsInitiated());

    const uri = `/api/secure/events?time=${time}`;
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(events => dispatch(loadEventsSuccess(events)))
      .catch(error => handleHttpError(dispatch, error, loadEventsError));
  };
}

export function createEvents(events) {
  return (dispatch) => {
    dispatch(createEventsInitiated());

    const uri = '/api/secure/events';
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify(events),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(() => dispatch(createEventsSuccess()))
      .catch(error => handleHttpError(dispatch, error, createEventsError));
  };
}

export function generateWeatherEvents(localStats) {
  const { zone, terrain, season, month, initialMs } = localStats;
  return (dispatch) => {
    dispatch(generateWeatherEventsInitiated());

    const uri = '/api/secure/events/weather';
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({ zone, terrain, season, month, initialMs }),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => dispatch(generateWeatherEventsSuccess(response)))
      .catch(error => handleHttpError(dispatch, error, generateWeatherEventsError));
  };
}
