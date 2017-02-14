import {
  getCreateNewUserUrl,
} from '../../server/lib/users';

import {
  FETCH_DEFAULT_OPTIONS,
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

    let responseStatus;
    const uri = getCreateNewUserUrl();
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });

    return fetch(uri, options)
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((json) => {
      if (responseStatus >= 200 && responseStatus < 300) {
        logger.log(json);
        if (json.code === 11000) {
          return dispatch(createNewUserError('That username or email already exists.'));
        }
        return dispatch(createNewUserSuccess(json));
      }
      return dispatch(createNewUserError(json.error));
    })
    .catch(error => dispatch(createNewUserError(error)));
  };
}
