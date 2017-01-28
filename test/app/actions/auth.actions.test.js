import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from '../../../app/actions/auth.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authActions', () => {
  const LOGIN_URL = '/api/users/kittenface';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(authActions);
  });

  describe('login', () => {
    describe('when status us 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOGIN_URL, {
          status: 200,
          body: {
            username: 'kittenface',
          },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(authActions.logIn('kittenface'))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.LOG_IN_INITIATED);
          should(actions[1].type).equal(types.LOG_IN_SUCCESS);
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status us 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOGIN_URL, {
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(authActions.logIn('kittenface'))
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

  describe('logOut', () => {
    beforeEach(() => {
      store = mockStore();
    });

    it('should dispatch properly', () => {
      store.dispatch(authActions.logOut());
      const actions = store.getActions();
      should(actions.length).equal(1);
      should(actions[0].type).equal(types.LOG_OUT_SUCCESS);
    });
  });

  describe('createNewUser', () => {
    describe('when status us 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOGIN_URL, {
          status: 200,
          body: {
            username: 'kittenface',
          },
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(authActions.createNewUser('kittenface'))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATE_NEW_USER_INITIATED);
          should(actions[1].type).equal(types.CREATE_NEW_USER_SUCCESS);
          should(actions[1].user).deepEqual({ username: 'kittenface' });
        })
        .then(done)
        .catch(done);
      });
    });

    describe('when status us 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(LOGIN_URL, {
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(authActions.createNewUser('kittenface'))
        .then(() => {
          const actions = store.getActions();
          should(actions.length).equal(2);
          should(actions[0].type).equal(types.CREATE_NEW_USER_INITIATED);
          should(actions[1].type).equal(types.CREATE_NEW_USER_ERROR);
        })
        .then(done)
        .catch(done);
      });
    });
  });
});
