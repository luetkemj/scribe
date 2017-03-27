import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  UPDATING_LOG_INITIATED,
  UPDATING_LOG_SUCCESS,
  UPDATING_LOG_ERROR,
  CREATING_LOG_INITIATED,
  CREATING_LOG_SUCCESS,
  CREATING_LOG_ERROR,
  DELETING_LOGS_INITIATED,
  DELETING_LOGS_SUCCESS,
  DELETING_LOGS_ERROR,
} from '../constants/action-types';

function updatingLogInitiated(log) {
  return {
    type: UPDATING_LOG_INITIATED,
    log,
  };
}

function updatingLogSuccess(log) {
  return {
    type: UPDATING_LOG_SUCCESS,
    log,
  };
}

function updatingLogError(error) {
  return {
    type: UPDATING_LOG_ERROR,
    error,
  };
}

function creatingLogInitiated() {
  return { type: CREATING_LOG_INITIATED };
}

function creatingLogSuccess(log) {
  return {
    type: CREATING_LOG_SUCCESS,
    log,
  };
}

function creatingLogError(error) {
  return {
    type: CREATING_LOG_ERROR,
    error,
  };
}

function deletingLogsInitiated() {
  return { type: DELETING_LOGS_INITIATED };
}

function deletingLogsSuccess(deletedLogs) {
  return {
    type: DELETING_LOGS_SUCCESS,
    deletedLogs,
  };
}

function deletingLogsError(error) {
  return {
    type: DELETING_LOGS_ERROR,
    error,
  };
}

export function updateLog(log) {
  return (dispatch) => {
    dispatch(updatingLogInitiated(log));

    const uri = `/api/secure/logs/${log._id}`;
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'PATCH',
      body: JSON.stringify(log),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(savedLog => dispatch(updatingLogSuccess(savedLog)))
      .catch(error => handleHttpError(dispatch, error, updatingLogError));
  };
}

export function createLog(log) {
  return (dispatch) => {
    dispatch(creatingLogInitiated());

    const uri = '/api/secure/logs';
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify(log),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(createdLog => dispatch(creatingLogSuccess(createdLog)))
      .catch(error => handleHttpError(dispatch, error, creatingLogError));
  };
}

export function deleteLogs(logIds) {
  return (dispatch) => {
    dispatch(deletingLogsInitiated());
    const uri = '/api/secure/logs';
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'PATCH',
      body: JSON.stringify(logIds),
    });
    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(deletedLogs => dispatch(deletingLogsSuccess(deletedLogs)))
      .catch(error => handleHttpError(dispatch, error, deletingLogsError));
  };
}
