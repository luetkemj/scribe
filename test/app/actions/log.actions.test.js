import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as logActions from '../../../app/actions/log.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('logActions', () => {
  const CREATE_LOG_URL = '/api/secure/logs';
  const UPDATE_LOG_URL = '/api/secure/logs/1';
  const DELETE_LOGS_URL = '/api/secure/logs';
  const MOCK_STATE = {
    historyState: {
      logs: [],
    },
    eventsQueueState: {
      events: [],
    },
  };

  const LOG = {
    day: 1,
    time: 1,
    season: 'winter',
    weather: {
      condition: 'snow',
      wind: 'windy',
      temp: 'cold',
    },
    notes: [],
  };

  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(logActions);
  });

  describe('createLog', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore(MOCK_STATE);
        fetchMock.mock(CREATE_LOG_URL, {
          method: 'POST',
          status: 200,
          body: LOG,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.createLog(LOG))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATING_LOG_INITIATED);
          should(actions[1].type).equal(types.CREATING_LOG_SUCCESS);
          should(actions[1].log).deepEqual({
            day: 1,
            time: 1,
            season: 'winter',
            weather: {
              condition: 'snow',
              wind: 'windy',
              temp: 'cold',
            },
            notes: [],
          });
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore(MOCK_STATE);
        fetchMock.mock(CREATE_LOG_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.createLog(LOG))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATING_LOG_INITIATED);
          should(actions[1].type).equal(types.CREATING_LOG_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });

  describe('updateLog', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(UPDATE_LOG_URL, {
          method: 'POST',
          status: 200,
          body: { _id: 1 },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.updateLog({ _id: 1 }))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.UPDATING_LOG_INITIATED);
          should(actions[1].type).equal(types.UPDATING_LOG_SUCCESS);
          should(actions[1].log).deepEqual({ _id: 1 });
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(UPDATE_LOG_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.updateLog({ _id: 1 }))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.UPDATING_LOG_INITIATED);
          should(actions[1].type).equal(types.UPDATING_LOG_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });

  describe('deleteLogs', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(DELETE_LOGS_URL, {
          method: 'PATCH',
          status: 200,
          body: ['1', '2'],
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.deleteLogs(['1', '2']))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.DELETING_LOGS_INITIATED);
          should(actions[1].type).equal(types.DELETING_LOGS_SUCCESS);
          should(actions[1].deletedLogs).deepEqual(['1', '2']);
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(DELETE_LOGS_URL, {
          method: 'PATCH',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.deleteLogs(['1', '2']))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.DELETING_LOGS_INITIATED);
          should(actions[1].type).equal(types.DELETING_LOGS_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });
});
