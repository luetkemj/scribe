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
  pingError: null,
  loginError: null,
  createUserError: null,
  logoutError: null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_INITIATED:
    case CREATE_NEW_USER_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    case LOG_OUT_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
      });
    case PING_ERROR:
      return Object.assign({}, state, {
        loading: false,
        pingError: action.error,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    case LOG_IN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        pingError: null,
        loginError: action.error,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    case CREATE_NEW_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: action.error,
        logoutError: null,
        user: null,
      });
    case LOG_OUT_ERROR:
      return Object.assign({}, state, {
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: action.error,
      });
    case LOG_IN_SUCCESS:
    case PING_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: action.user,
      });
    case CREATE_NEW_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    default:
      return state;
  }
}
