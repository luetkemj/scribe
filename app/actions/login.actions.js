import { push } from 'react-router-redux';

import {
  getLoginUrl,
  getLogoutUrl,
} from '../../server/lib/login';

import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  LOG_IN_INITIATED,
  LOG_IN_ERROR,
  LOG_IN_SUCCESS,
  LOG_OUT_INITIATED,
  LOG_OUT_ERROR,
  LOG_OUT_SUCCESS,
} from '../constants/action-types';

function loginInitiated() {
  return { type: LOG_IN_INITIATED };
}

function loginError(error) {
  return {
    type: LOG_IN_ERROR,
    loginError: error,
  };
}

function loginSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user,
  };
}

function logoutInitiated() {
  return { type: LOG_OUT_INITIATED };
}

function logoutError(error) {
  return {
    type: LOG_OUT_ERROR,
    logoutError: error,
  };
}

function logoutSuccess() {
  return { type: LOG_OUT_SUCCESS };
}

export function login(user) {
  const { email, password } = user;

  return (dispatch) => {
    dispatch(loginInitiated());

    let responseStatus;
    const uri = getLoginUrl();
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return fetch(uri, options)
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((json) => {
      if (responseStatus >= 200 && responseStatus < 300) {
        dispatch(loginSuccess(json));
        return dispatch(push('/campaign'));
      } else if (responseStatus === 401) {
        return dispatch(loginError('Incorrect username or password.'));
      }
      return dispatch(loginError(json.error));
    })
    .catch(error => dispatch(loginError(error)));
  };
}


export function logout() {
  return (dispatch) => {
    dispatch(logoutInitiated());

    const uri = getLogoutUrl();

    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(() => dispatch(logoutSuccess()))
      .then(() => dispatch(push('/login')))
      .catch(error => handleHttpError(dispatch, error, logoutError));
  };
}
