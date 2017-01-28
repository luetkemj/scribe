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
      error: null,
      user: null,
    });
  });

  describe('in the inital state', () => {
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle LOG_IN_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOG_IN_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        user: null,
      });
    });

    it('should handle CREATE_NEW_USER_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.CREATE_NEW_USER_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        user: null,
      });
    });
  });

  describe('while loading', () => {
    beforeEach(() => {
      state = reducer({
        loading: true,
        error: null,
        user: null,
      }, {});
    });

    it('should handle LOG_IN_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOG_IN_ERROR,
        error: 'butt',
      })).deepEqual({
        loading: false,
        error: 'butt',
        user: null,
      });
    });

    it('should handle CREATE_NEW_USER_ERROR correctly', () => {
      should(reducer(state, {
        type: types.CREATE_NEW_USER_ERROR,
        error: 'butt',
      })).deepEqual({
        loading: false,
        error: 'butt',
        user: null,
      });
    });

    it('should handle LOG_IN_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOG_IN_SUCCESS,
        user: { user: 1 },
      })).deepEqual({
        loading: false,
        error: null,
        user: { user: 1 },
      });
    });

    it('should handle CREATE_NEW_USER_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.CREATE_NEW_USER_SUCCESS,
        user: { user: 1 },
      })).deepEqual({
        loading: false,
        error: null,
        user: { user: 1 },
      });
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      state = reducer({
        loading: true,
        error: null,
        user: { user: 1 },
      }, {});
    });

    it('should handle LOG_OUT_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOG_OUT_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        user: { user: 1 },
      });
    });

    it('should handle LOG_OUT_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOG_OUT_SUCCESS,
      })).deepEqual({
        loading: false,
        error: null,
        user: null,
      });
    });
  });
});
