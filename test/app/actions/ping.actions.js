import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as pingActions from '../../../app/actions/ping.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('pingActions', () => {
  const PING_URL = '/api/ping';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(pingActions);
  });

  describe('ping', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(PING_URL, {
          status: 200,
          body: {
            id: 123,
          },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(pingActions.ping())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.PING_SUCCESS);
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(PING_URL, {
          method: 'GET',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(pingActions.ping())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.PING_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });
});
