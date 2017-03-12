import should from 'should';

import reducer from '../../../app/reducers/events-queue.reducer';
import * as types from '../../../app/constants/action-types';

describe('the events queue reducer', () => {
  let state;

  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have the correct inital state', () => {
    should(reducer(undefined, {})).deepEqual({
      loadingEvents: false,
      loadingEventsError: null,
      creatingEvents: false,
      creatingEventsError: null,
      generatingWeatherEvents: false,
      generatingWeatherEventsError: null,
      events: [],
    });
  });

  describe('in the inital state', () => {
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle LOAD_EVENTS_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.LOAD_EVENTS_INITIATED,
      })).deepEqual({
        loadingEvents: true,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [],
      });
    });

    it('should handle CREATE_EVENTS_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.CREATE_EVENTS_INITIATED,
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: true,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [],
      });
    });

    it('should handle GENERATE_WEATHER_EVENTS_INITIATED correctly', () => {
      should(reducer(state, {
        type: types.GENERATE_WEATHER_EVENTS_INITIATED,
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: true,
        generatingWeatherEventsError: null,
        events: [],
      });
    });

    it('should handle LOAD_EVENTS_ERROR correctly', () => {
      should(reducer(state, {
        type: types.LOAD_EVENTS_ERROR,
        error: 'error',
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: 'error',
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [],
      });
    });

    it('should handle CREATE_EVENTS_ERROR correctly', () => {
      should(reducer(state, {
        type: types.CREATE_EVENTS_ERROR,
        error: 'error',
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: 'error',
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [],
      });
    });

    it('should handle GENERATE_WEATHER_EVENTS_ERROR correctly', () => {
      should(reducer(state, {
        type: types.GENERATE_WEATHER_EVENTS_ERROR,
        error: 'error',
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: 'error',
        events: [],
      });
    });

    it('should handle LOAD_EVENTS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOAD_EVENTS_SUCCESS,
        events: [{ id: 2, time: 2 }, { id: 1, time: 1 }],
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [{ id: 1, time: 1 }, { id: 2, time: 2 }],
      });
    });

    it('should handle CREATE_EVENTS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.CREATE_EVENTS_SUCCESS,
        events: [{ id: 2, time: 2 }, { id: 1, time: 1 }],
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [{ id: 1, time: 1 }, { id: 2, time: 2 }],
      });
    });

    it('should handle GENERATE_WEATHER_EVENTS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.GENERATE_WEATHER_EVENTS_SUCCESS,
        events: [{ id: 2, time: 2 }, { id: 1, time: 1 }],
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [{ id: 1, time: 1 }, { id: 2, time: 2 }],
      });
    });
  });

  describe('When events already exist', () => {
    beforeEach(() => {
      state = reducer({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [{ id: 1, time: 1 }, { id: 3, time: 3 }],
      }, {});
    });

    it('should handle LOAD_EVENTS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.LOAD_EVENTS_SUCCESS,
        events: [{ id: 2, time: 2 }, { id: 4, time: 4 }],
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [{ id: 1, time: 1 }, { id: 2, time: 2 }, { id: 3, time: 3 }, { id: 4, time: 4 }],
      });
    });

    it('should handle CREATE_EVENTS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.CREATE_EVENTS_SUCCESS,
        events: [{ id: 2, time: 2 }, { id: 4, time: 4 }],
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [{ id: 1, time: 1 }, { id: 2, time: 2 }, { id: 3, time: 3 }, { id: 4, time: 4 }],
      });
    });

    it('should handle GENERATE_WEATHER_EVENTS_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.GENERATE_WEATHER_EVENTS_SUCCESS,
        events: [{ id: 2, time: 2 }, { id: 4, time: 4 }],
      })).deepEqual({
        loadingEvents: false,
        loadingEventsError: null,
        creatingEvents: false,
        creatingEventsError: null,
        generatingWeatherEvents: false,
        generatingWeatherEventsError: null,
        events: [{ id: 1, time: 1 }, { id: 2, time: 2 }, { id: 3, time: 3 }, { id: 4, time: 4 }],
      });
    });
  });
});
