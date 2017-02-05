import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';
import {
  PING_ERROR,
  PING_SUCCESS,
} from '../constants/action-types';

function pingSuccess(user) {
  return {
    type: PING_SUCCESS,
    user,
  };
}

function pingError(error) {
  return {
    type: PING_ERROR,
    error,
  };
}

export function ping() {
  return (dispatch) => {
    const uri = '/api/ping';
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(user => dispatch(pingSuccess(user)))
      .catch(error => handleHttpError(dispatch, error, pingError));
  };
}
