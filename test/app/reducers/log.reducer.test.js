import reducer from '../../../app/reducers/log.reducer';
import * as types from '../../../app/constants/action-types';
import should from 'should';

describe('the log reducer', () => {
  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({
      loading: false,
      error: null,
    });
  });

  describe('in the initial state', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle LOADING_LOG_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_LOG_INITIATED,
        })
      ).deepEqual({
        loading: true,
        error: null,
      });
    });

    it('should handle LOG_ALREADY_LOADED correctly', () => {
      should(
        reducer(state, {
          type: types.LOG_ALREADY_LOADED,
        })
      ).deepEqual({
        loading: false,
        error: null,
      });
    });

    it('should handle LOADING_LOG_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_LOG_SUCCESS,
          log: {
            _id: 1,
            weather: 'cold',
          },
        })
      ).deepEqual({
        loading: false,
        error: null,
        _id: 1,
        weather: 'cold',
      });
    });

    it('should handle LOADING_LOG_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_LOG_ERROR,
          error: 'terrible things!',
        })
      ).deepEqual({
        loading: false,
        error: 'terrible things!',
      });
    });

    it('should handle UPDATING_LOG_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.UPDATING_LOG_INITIATED,
          error: null,
        })
      ).deepEqual({
        loading: true,
        error: null,
      });
    });

    it('should handle UPDATING_LOG_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.UPDATING_LOG_SUCCESS,
          log: {
            _id: 1,
            name: 'the log',
          },
        })
      ).deepEqual({
        loading: false,
        error: null,
        _id: 1,
        name: 'the log',
      });
    });

    it('should handle UPDATING_LOG_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.UPDATING_LOG_ERROR,
          error: 'terrible things!',
        })
      ).deepEqual({
        loading: false,
        error: 'terrible things!',
      });
    });
  });
});
