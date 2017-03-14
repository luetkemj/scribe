import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import { loadEvents } from './events-queue.actions';

import {
  LOADING_LOGS_INITIATED,
  LOGS_ALREADY_LOADED,
  LOADING_LOGS_SUCCESS,
  LOADING_LOGS_ERROR,
} from '../constants/action-types';

function loadingLogsInitiated() {
  return { type: LOADING_LOGS_INITIATED };
}

function logsAlreadyLoaded() {
  return { type: LOGS_ALREADY_LOADED };
}

function loadingLogsSuccess(logs) {
  return {
    type: LOADING_LOGS_SUCCESS,
    logs,
  };
}

function loadingLogsError(error) {
  return {
    type: LOADING_LOGS_ERROR,
    error,
  };
}

function loadLogs(dispatch) {
  dispatch(loadingLogsInitiated());

  const uri = '/api/secure/logs?limit=400&skip=0';
  const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
    method: 'GET',
  });

  return fetch(uri, options)
    .then(checkHttpStatus)
    .then(response => response.json())
    .then((logs) => {
      dispatch(loadingLogsSuccess(logs));
      dispatch(loadEvents(logs[0].time));
    })
    .catch(error => handleHttpError(dispatch, error, loadingLogsError));
}

export function loadLogsIfNeeded() {
  return (dispatch, getState) => {
    const { historyState } = getState();

    if (historyState.logs.length) {
      dispatch(logsAlreadyLoaded());
      return dispatch(loadEvents(historyState.logs[0].time));
    }

    return loadLogs(dispatch);
  };
}
