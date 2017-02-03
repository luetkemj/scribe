import {
  getAuthUrl,
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

export function login(username, password) {
  return (dispatch) => {
    dispatch(logInInitiated());

    const uri = getAuthUrl();

    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(dispatch(logInSuccess()))
      .catch(error => handleHttpError(dispatch, error, logInError));
  };
}

export function logOut() {
  return dispatch => dispatch(logOutSuccess());
}
