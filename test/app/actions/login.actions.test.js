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
  const LOGOUT_URL = '/api/logout';
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
            body: { user: 123 },
          };
        });
      });
      it('should dispatch correctly', (done) => {
        store.dispatch(loginActions.login({ username: 'yay', password: 'security', email: 'a@b.com' }))
          .then(() => {
            const actions = store.getActions();
            should(fetchUrl).equal('/api/login');
            should(fetchOptions.method).equal('POST');
            should(fetchOptions.body).equal(JSON.stringify({ email: 'a@b.com', password: 'security' }));
            should(actions[0].type).equal(types.LOG_IN_INITIATED);
            should(actions[1].type).equal(types.LOG_IN_SUCCESS);
            should(actions[1].user).deepEqual({ user: 123 });
            should(actions[2].payload.args[0]).equal('/campaign');
            should(actions[2].payload.method).equal('push');
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 401', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOGIN_URL, {
          method: 'POST',
          status: 401,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(loginActions.login({ username: 'yay', password: 'security', email: 'a@b.com' }))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOG_IN_INITIATED);
          should(actions[1].type).equal(types.LOG_IN_ERROR);
          // @todo: make dispatch proper error
          // should(actions[1].error).equal('Incorrect email or password.');
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
        store.dispatch(loginActions.login({ username: 'yay', password: 'security', email: 'a@b.com' }))
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
          should(actions.length).equal(3);
          should(actions[0].type).equal(types.LOG_OUT_INITIATED);
          should(actions[1].type).equal(types.LOG_OUT_SUCCESS);
          should(actions[2].payload.method).equal('push');
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
