import reducer from '../../../app/reducers/history.reducer';
import * as types from '../../../app/constants/action-types';
import should from 'should';

describe('the history reducer', () => {
  let state;

  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have the correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({
      loading: false,
      error: null,
      logs: [],
    });
  });

  describe('in the inital state', () => {
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle LOADING_LOGS_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOADING_LOGS_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        logs: [],
      });
    });

    it('should handle LOGS_ALREADY_LOADED correctly', () => {
      should(reducer(state, {
        type: types.LOGS_ALREADY_LOADED,
      })).deepEqual({
        loading: false,
        error: null,
        logs: [],
      });
    });

    it('should handle LOADING_LOGS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOADING_LOGS_SUCCESS,
        logs: [
          { id: 1, notes: [] },
          { id: 2, notes: [] },
        ],
      })).deepEqual({
        loading: false,
        error: null,
        logs: [
          { id: 1, notes: [] },
          { id: 2, notes: [] },
        ],
      });
    });

    it('should handle LOADING_LOGS_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOADING_LOGS_ERROR,
        error: 'bad things!',
      })).deepEqual({
        loading: false,
        error: 'bad things!',
        logs: [],
      });
    });

    it('should handle CREATING_LOG_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.CREATING_LOG_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        logs: [],
      });
    });

    it('should handle CREATING_LOG_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.CREATING_LOG_SUCCESS,
        log: { _id: 1 },
      })).deepEqual({
        loading: false,
        error: null,
        logs: [{ _id: 1 }],
      });
    });

    it('should handle CREATING_LOG_ERROR correctly', () => {
      should(reducer(state, {
        type: types.CREATING_LOG_ERROR,
        error: 'bad things!',
      })).deepEqual({
        loading: false,
        error: 'bad things!',
        logs: [],
      });
    });

    it('should handle DELETING_LOG_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.DELETING_LOG_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        logs: [],
      });
    });

    it('should handle DELETING_LOG_SUCCESS correctly', () => {
      should(reducer({
        loading: false,
        error: null,
        logs: [{ _id: 1 }, { _id: 2 }, { _id: 3 }],
      }, {
        type: types.DELETING_LOG_SUCCESS,
        log: { _id: 2 },
      })).deepEqual({
        loading: false,
        error: null,
        logs: [{ _id: 1 }, { _id: 3 }],
      });
    });

    it('should handle DELETING_LOG_ERROR correctly', () => {
      should(reducer(state, {
        type: types.DELETING_LOG_ERROR,
        error: 'bad things!',
      })).deepEqual({
        loading: false,
        error: 'bad things!',
        logs: [],
      });
    });
  });
});
