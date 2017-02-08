import { push } from 'react-router-redux';
import { ping } from './ping.actions';

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
    error,
  };
}

function loginSuccess() {
  return {
    type: LOG_IN_SUCCESS,
  };
}

function logoutInitiated() {
  return { type: LOG_OUT_INITIATED };
}

function logoutError() {
  return { type: LOG_OUT_ERROR };
}

function logoutSuccess() {
  return { type: LOG_OUT_SUCCESS };
}

export function login(user) {
  const { username, password } = user;
  return (dispatch) => {
    dispatch(loginInitiated());

    const uri = getLoginUrl();

    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(() => dispatch(loginSuccess()))
      .then(() => dispatch(ping()))
      .then(() => dispatch(push('/campaign')))
      .catch(error => handleHttpError(dispatch, error, loginError));
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
      .then(() => dispatch(ping()))
      .then(() => dispatch(push('/login')))
      .catch(error => handleHttpError(dispatch, error, logoutError));
  };
}
