import {
  LOG_IN_INITIATED,
  LOG_IN_ERROR,
  LOG_IN_SUCCESS,
  LOG_OUT_INITIATED,
  LOG_OUT_ERROR,
  LOG_OUT_SUCCESS,
  CREATE_NEW_USER_INITIATED,
  CREATE_NEW_USER_ERROR,
  CREATE_NEW_USER_SUCCESS,
  PING_ERROR,
  PING_SUCCESS,
} from '../../app/constants/action-types';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case PING_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        user: null,
      });
    case PING_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        user: action.user,
      });
    case LOG_IN_INITIATED:
    case CREATE_NEW_USER_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        user: null,
      });
    case LOG_IN_ERROR:
    case CREATE_NEW_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
        user: null,
      });
    case LOG_IN_SUCCESS:
    case CREATE_NEW_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });
    case LOG_OUT_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case LOG_OUT_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        user: null,
      });
    default:
      return state;
  }
}
