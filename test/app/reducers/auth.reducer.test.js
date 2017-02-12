import should from 'should';

import reducer from '../../../app/reducers/auth.reducer';
import * as types from '../../../app/constants/action-types';

describe('the auth reducer', () => {
  let state;

  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have the correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({
      loading: false,
      pingError: null,
      loginError: null,
      createUserError: null,
      logoutError: null,
      user: null,
    });
  });

  describe('in the inital state', () => {
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle PING_ERROR correctly', () => {
      should(reducer(state, {
        type: types.PING_ERROR,
        pingError: 'butt',
      })).deepEqual({
        loading: false,
        pingError: 'butt',
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    });

    it('should handle PING_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.PING_SUCCESS,
        user: 'butt',
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: 'butt',
      });
    });

    it('should handle LOG_IN_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOG_IN_INITIATED,
      })).deepEqual({
        loading: true,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    });

    it('should handle CREATE_NEW_USER_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.CREATE_NEW_USER_INITIATED,
      })).deepEqual({
        loading: true,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    });
  });

  describe('while loading', () => {
    beforeEach(() => {
      state = reducer({
        loading: true,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      }, {});
    });

    it('should handle LOG_IN_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOG_IN_ERROR,
        loginError: 'butt',
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: 'butt',
        createUserError: null,
        logoutError: null,
        user: null,
      });
    });

    it('should handle LOG_OUT_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOG_OUT_ERROR,
        logoutError: 'butt',
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: 'butt',
        user: null,
      });
    });

    it('should handle CREATE_NEW_USER_ERROR correctly', () => {
      should(reducer(state, {
        type: types.CREATE_NEW_USER_ERROR,
        createUserError: 'butt',
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: 'butt',
        logoutError: null,
        user: null,
      });
    });

    it('should handle LOG_IN_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOG_IN_SUCCESS,
        user: 'user',
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: 'user',
      });
    });

    it('should handle CREATE_NEW_USER_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.CREATE_NEW_USER_SUCCESS,
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      state = reducer({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: { user: 1 },
      }, {});
    });

    it('should handle LOG_OUT_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOG_OUT_INITIATED,
      })).deepEqual({
        loading: true,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: { user: 1 },
      });
    });

    it('should handle LOG_OUT_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOG_OUT_ERROR,
        logoutError: 'butt',
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: 'butt',
        user: { user: 1 },
      });
    });

    it('should handle LOG_OUT_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOG_OUT_SUCCESS,
      })).deepEqual({
        loading: false,
        pingError: null,
        loginError: null,
        createUserError: null,
        logoutError: null,
        user: null,
      });
    });
  });
});
