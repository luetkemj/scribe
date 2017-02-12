import {
  getCreateNewUserUrl,
} from '../../server/lib/users';

import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  CREATE_NEW_USER_INITIATED,
  CREATE_NEW_USER_ERROR,
  CREATE_NEW_USER_SUCCESS,
} from '../constants/action-types';

const logger = require('../../server/lib/logger')();

function createNewUserInitiated() {
  return { type: CREATE_NEW_USER_INITIATED };
}

function createNewUserError(error) {
  return {
    type: CREATE_NEW_USER_ERROR,
    createUserError: error,
  };
}

function createNewUserSuccess(user) {
  return {
    type: CREATE_NEW_USER_SUCCESS,
    user,
  };
}

export function createNewUser(user) {
  const { username, password, email } = user;
  return (dispatch) => {
    dispatch(createNewUserInitiated());

    const uri = getCreateNewUserUrl();

    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    logger.log('%o', options);

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(newUser => dispatch(createNewUserSuccess(newUser)))
      .catch(error => handleHttpError(dispatch, error, createNewUserError));
  };
}
