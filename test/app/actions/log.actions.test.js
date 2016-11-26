import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as logActions from '../../../app/actions/log.actions.js';
import * as types from '../../../app/constants/action-types';
import should from 'should';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('logActions', () => {
  const CREATE_LOG_URL = '/api/logs';
  const GET_LOG_URL = '/api/logs/1';
  const UPDATE_LOG_URL = '/api/logs/1';
  const DELETE_LOG_URL = '/api/logs/1';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(logActions);
  });

  describe('loadLogIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_LOG_URL, {
          status: 200,
          body: { _id: 1 },
        });
      });

      describe('when log exists', () => {
        beforeEach(() => {
          store = mockStore({
            historyState: ({
              logs: [{ _id: 1 }],
            }),
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(logActions.loadLogIfNeeded(1));
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.LOG_ALREADY_LOADED);
        });
      });

      describe('when log does not exist', () => {
        beforeEach(() => {
          store = mockStore({
            historyState: ({
              logs: [{ _id: 2 }],
            }),
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(logActions.loadLogIfNeeded(1))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_LOG_INITIATED);
            should(actions[1].type).equal(types.LOADING_LOG_SUCCESS);
            should(actions[1].log).deepEqual({ _id: 1 });
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
        fetchMock.mock(GET_LOG_URL, 500);
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.loadLogIfNeeded(1))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOADING_LOG_INITIATED);
          should(actions[1].type).equal(types.LOADING_LOG_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });
  describe('createLog', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(CREATE_LOG_URL, {
          method: 'POST',
          status: 200,
          body: { _id: 1 },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.createLog())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATING_LOG_INITIATED);
          should(actions[1].type).equal(types.CREATING_LOG_SUCCESS);
          should(actions[1].log).deepEqual({ _id: 1 });
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(CREATE_LOG_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.createLog())
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

  describe('deleteLog', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(DELETE_LOG_URL, {
          method: 'DELETE',
          status: 200,
          body: { log: null },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(logActions.deleteLog({ _id: 1 }))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.DELETING_LOG_INITIATED);
          should(actions[1].type).equal(types.DELETING_LOG_SUCCESS);
          should(actions[1].log).equal(null);
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
});
