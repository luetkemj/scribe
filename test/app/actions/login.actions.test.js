import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as loginActions from '../../../app/actions/login.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginActions', () => {
  const LOGIN_URL = '/api/login';
  const LOGOUT_URL = '/api/login';
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(loginActions);
  });

  describe('login', () => {
    describe('when the status is 200', () => {
      let fetchUrl;
      let fetchOptions;

      beforeEach(() => {
        fetchMock.mock(LOGIN_URL, (url, options) => {
          fetchUrl = url;
          fetchOptions = options;

          return {
            status: 200,
            body: { token: 123 },
          };
        });
      });
      it('should dispatch correctly', (done) => {
        const expectedActions = [
          {
            type: types.LOG_IN_INITIATED,
          },
          {
            type: types.LOG_IN_SUCCESS,
          },
        ];

        store.dispatch(loginActions.login('yay', 'security'))
          .then(() => {
            should(fetchUrl).equal('/api/login');
            should(fetchOptions.method).equal('POST');
            should(fetchOptions.body).equal(JSON.stringify({ username: 'yay', password: 'security' }));

            should(store.getActions()).deepEqual(expectedActions);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOGIN_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(loginActions.login())
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOG_IN_INITIATED);
          should(actions[1].type).equal(types.LOG_IN_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });

    describe('logout', () => {
      describe('when status is 200', () => {
        beforeEach(() => {
          store = mockStore();
          fetchMock.mock(LOGOUT_URL, {
            method: 'POST',
            status: 200,
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(loginActions.logout())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOG_OUT_INITIATED);
            should(actions[1].type).equal(types.LOG_OUT_SUCCESS);
          })
          .then(done)
          .catch(done);
        });
      });

      describe('when status is 500', () => {
        beforeEach(() => {
          store = mockStore();
          fetchMock.mock(LOGOUT_URL, {
            method: 'POST',
            status: 500,
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(loginActions.logout())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOG_OUT_INITIATED);
            should(actions[1].type).equal(types.LOG_OUT_ERROR);
          })
          .then(done)
          .catch(done);
        });
      });
    });
  });
});
