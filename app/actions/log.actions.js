import {
  getLogUrl,
  getUpdateLogUrl,
  getCreateLogUrl,
  getDeleteLogUrl,
} from '../../server/lib/logs';

import { find } from 'lodash';

import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  LOADING_LOG_INITIATED,
  LOG_ALREADY_LOADED,
  LOADING_LOG_SUCCESS,
  LOADING_LOG_ERROR,
  UPDATING_LOG_INITIATED,
  UPDATING_LOG_SUCCESS,
  UPDATING_LOG_ERROR,
  CREATING_LOG_INITIATED,
  CREATING_LOG_SUCCESS,
  CREATING_LOG_ERROR,
  DELETING_LOG_INITIATED,
  DELETING_LOG_SUCCESS,
  DELETING_LOG_ERROR,
} from '../constants/action-types';

function loadingLogInitiated() {
  return { type: LOADING_LOG_INITIATED };
}

function logAlreadyLoaded() {
  return { type: LOG_ALREADY_LOADED };
}

function loadingLogSuccess(log) {
  return {
    type: LOADING_LOG_SUCCESS,
    log,
  };
}

function loadingLogError(error) {
  return {
    type: LOADING_LOG_ERROR,
    error,
  };
}

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

function deletingLogInitiated() {
  return { type: DELETING_LOG_INITIATED };
}

function deletingLogSuccess(log) {
  return {
    type: DELETING_LOG_SUCCESS,
    log,
  };
}

function deletingLogError(error) {
  return {
    type: DELETING_LOG_ERROR,
    error,
  };
}


function loadLog(id, dispatch) {
  dispatch(loadingLogInitiated());

  const uri = getLogUrl(id);
  const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
    method: 'GET',
  });

  return fetch(uri, options)
    .then(checkHttpStatus)
    .then(response => response.json())
    .then(log => dispatch(loadingLogSuccess(log)))
    .catch(error => handleHttpError(dispatch, error, loadingLogError));
}

export function loadLogIfNeeded(id) {
  return (dispatch, getState) => {
    const { historyState } = getState();

    if (find(historyState.logs, { _id: id })) {
      return dispatch(logAlreadyLoaded());
    }

    return loadLog(id, dispatch);
  };
}

export function updateLog(log) {
  return (dispatch) => {
    dispatch(updatingLogInitiated(log));

    const uri = getUpdateLogUrl(log._id);
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

    const uri = getCreateLogUrl();
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: log,
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(createdLog => dispatch(creatingLogSuccess(createdLog)))
      .catch(error => handleHttpError(dispatch, error, creatingLogError));
  };
}

export function deleteLog(log) {
  return (dispatch) => {
    dispatch(deletingLogInitiated());

    const uri = getDeleteLogUrl(log._id);
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'DELETE',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(dispatch(deletingLogSuccess(null)))
      .catch(error => handleHttpError(dispatch, error, deletingLogError));
  };
}
