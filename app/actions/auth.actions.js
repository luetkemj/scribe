import {
  getLogInUrl,
  getCreateNewUserUrl,
} from '../../server/lib/auth';

import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  LOG_IN_INITIATED,
  LOG_IN_ERROR,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  CREATE_NEW_USER_INITIATED,
  CREATE_NEW_USER_ERROR,
  CREATE_NEW_USER_SUCCESS,
} from '../constants/action-types';

function logInInitiated() {
  return { type: LOG_IN_INITIATED };
}

function logInError(error) {
  return {
    type: LOG_IN_ERROR,
    error,
  };
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user,
  };
}

function logOutSuccess() {
  return { type: LOG_OUT_SUCCESS };
}

function createNewUserInitiated() {
  return { type: CREATE_NEW_USER_INITIATED };
}

function createNewUserError(error) {
  return {
    type: CREATE_NEW_USER_ERROR,
    error,
  };
}

function createNewUserSuccess(user) {
  return {
    type: CREATE_NEW_USER_SUCCESS,
    user,
  };
}

export function logIn(username) {
  return (dispatch) => {
    dispatch(logInInitiated());

    const uri = getLogInUrl(username);

    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(user => dispatch(logInSuccess(user)))
      .catch(error => handleHttpError(dispatch, error, logInError));
  };
}

export function logOut() {
  return dispatch => dispatch(logOutSuccess());
}

export function createNewUser(username) {
  return (dispatch) => {
    dispatch(createNewUserInitiated());

    const uri = getCreateNewUserUrl(username);

    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: {
        username,
      },
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(user => dispatch(createNewUserSuccess(user)))
      .catch(error => handleHttpError(dispatch, error, createNewUserError));
  };
}
