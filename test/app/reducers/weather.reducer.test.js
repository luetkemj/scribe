import should from 'should';

import reducer from '../../../app/reducers/weather.reducer';
import * as types from '../../../app/constants/action-types';

describe('the weather reducer', () => {
  it('should exist', () => {
    should.exist(reducer);
  });

  describe('in the initial state', () => {
    let state;

    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should have the correct inital state', () => {
      should(state).deepEqual({
        loading: false,
        error: null,
        weather: [],
      });
    });

    it('should handle LOADING_WEATHER_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOADING_WEATHER_INITIATED,
      })).deepEqual({
        loading: true,
        error: null,
        weather: [],
      });
    });

    it('should handle WEATHER_ALREADY_LOADED correctly', () => {
      should(reducer(state, {
        type: types.WEATHER_ALREADY_LOADED,
      })).deepEqual({
        loading: false,
        error: null,
        weather: [],
      });
    });

    it('should handle LOADING_WEATHER_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOADING_WEATHER_SUCCESS,
        weather: [{ w: 1 }],
      })).deepEqual({
        loading: false,
        error: null,
        weather: [{ w: 1 }],
      });
    });

    it('should handle LOADING_WEATHER_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOADING_WEATHER_ERROR,
        error: 'bad!',
      })).deepEqual({
        loading: false,
        error: 'bad!',
        weather: [],
      });
    });
  });
});
