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

export function createNewUser(username, password) {
  return (dispatch) => {
    dispatch(createNewUserInitiated());

    const uri = getCreateNewUserUrl();

    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(user => dispatch(createNewUserSuccess(user)))
      .catch(error => handleHttpError(dispatch, error, createNewUserError));
  };
}
