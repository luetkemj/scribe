import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as historyActions from '../../../app/actions/history.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('historyActions', () => {
  const GET_LOGS_URL = '/api/secure/logs?limit=400&skip=0';
  const GET_EVENTS_URL = '/api/secure/events?time=1000';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(historyActions);
  });

  describe('loadLogsIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_LOGS_URL, {
          status: 200,
          body: [{ id: 1, time: 1000 }],
        }).mock(GET_EVENTS_URL, {
          status: 200,
          body: [{ e: 1 }],
        });
      });

      describe('when logs exist', () => {
        beforeEach(() => {
          store = mockStore({
            historyState: {
              logs: [{ id: 1, time: 1000 }],
            },
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(historyActions.loadLogsIfNeeded());
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOGS_ALREADY_LOADED);
          should(actions[1].type).equal(types.LOAD_EVENTS_INITIATED);
        });
      });

      describe('when logs do not exist', () => {
        beforeEach(() => {
          store = mockStore({
            historyState: {
              logs: [],
            },
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(historyActions.loadLogsIfNeeded())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(3);
            should(actions[0].type).equal(types.LOADING_LOGS_INITIATED);
            should(actions[1].type).equal(types.LOADING_LOGS_SUCCESS);
            should(actions[1].logs).deepEqual([{ id: 1, time: 1000 }]);
            should(actions[2].type).equal(types.LOAD_EVENTS_INITIATED);
          })
          .then(done)
          .catch(done);
        });
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          historyState: {
            logs: [],
          },
        });
        fetchMock.mock(GET_LOGS_URL, 500);
      });

      it('should dispatch properly', (done) => {
        store.dispatch(historyActions.loadLogsIfNeeded())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOADING_LOGS_INITIATED);
          should(actions[1].type).equal(types.LOADING_LOGS_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });
});
