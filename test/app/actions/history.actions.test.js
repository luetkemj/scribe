import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as historyActions from '../../../app/actions/history.actions.js';
import * as types from '../../../app/constants/action-types';
import should from 'should';

import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('historyActions', () => {
  const GET_LOGS_URL = '/api/logs?limit=400&skip=0';
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
          body: [{ a: 1 }],
        });
      });

      describe('when logs exist', () => {
        beforeEach(() => {
          store = mockStore({
            historyState: {
              logs: [{ id: 1 }],
            },
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(historyActions.loadLogsIfNeeded());
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.LOGS_ALREADY_LOADED);
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
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_LOGS_INITIATED);
            should(actions[1].type).equal(types.LOADING_LOGS_SUCCESS);
            should(actions[1].logs).deepEqual([{ a: 1 }]);
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
