import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as eventsQueueActions from '../../../app/actions/events-queue.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('eventsQueueActions', () => {
  const CREATE_EVENT_URL = '/api/secure/events';
  const GET_EVENTS_URL = '/api/secure/events?time=1000';
  const GENERATE_WEATHER_EVENTS_URL = '/api/secure/events/weather';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(eventsQueueActions);
  });

  describe('loadEvents', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_EVENTS_URL, {
          status: 200,
          body: { _id: 1 },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(eventsQueueActions.loadEvents(1000))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOAD_EVENTS_INITIATED);
          should(actions[1].type).equal(types.LOAD_EVENTS_SUCCESS);
          should(actions[1].events).deepEqual({ _id: 1 });
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          eventsState: {
            events: [],
          },
        });
        fetchMock.mock(GET_EVENTS_URL, 500);
      });

      it('should dispatch properly', (done) => {
        store.dispatch(eventsQueueActions.loadEvents(1000))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOAD_EVENTS_INITIATED);
          should(actions[1].type).equal(types.LOAD_EVENTS_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });

  describe('createEvents', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(CREATE_EVENT_URL, {
          method: 'POST',
          status: 200,
          body: [{
            eventType: 'test',
            event: { name: 'testevent' },
            time: 1234,
            campaignId: 'abc123',
          }],
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(eventsQueueActions.createEvents())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATE_EVENTS_INITIATED);
          should(actions[1].type).equal(types.CREATE_EVENTS_SUCCESS);
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(CREATE_EVENT_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(eventsQueueActions.createEvents())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATE_EVENTS_INITIATED);
          should(actions[1].type).equal(types.CREATE_EVENTS_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });

  describe('generateWeatherEvents', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GENERATE_WEATHER_EVENTS_URL, {
          method: 'POST',
          status: 200,
          body: [{ id: 1 }],
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(eventsQueueActions.generateWeatherEvents({
          zone: 'tropical',
          terrain: 'plains',
          season: 'winter',
          month: 'february',
          initialMs: 0,
        }))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.GENERATE_WEATHER_EVENTS_INITIATED);
          should(actions[1].type).equal(types.GENERATE_WEATHER_EVENTS_SUCCESS);
          should(actions[1].events).deepEqual([{ id: 1 }]);
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GENERATE_WEATHER_EVENTS_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(eventsQueueActions.generateWeatherEvents({
          zone: 'tropical',
          terrain: 'plains',
          season: 'winter',
          month: 'february',
          initialMs: 0,
        }))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.GENERATE_WEATHER_EVENTS_INITIATED);
          should(actions[1].type).equal(types.GENERATE_WEATHER_EVENTS_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });
});
