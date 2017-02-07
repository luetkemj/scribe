import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as userActions from '../../../app/actions/user.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('userActions', () => {
  const CREATE_NEW_USER_URL = '/api/users';
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(userActions);
  });

  describe('createNewUser', () => {
    describe('when the status is 200', () => {
      let fetchUrl;
      let fetchOptions;

      beforeEach(() => {
        fetchMock.mock(CREATE_NEW_USER_URL, (url, options) => {
          fetchUrl = url;
          fetchOptions = options;

          return {
            status: 200,
            body: { username: 'yay', password: 'security', email: 'a@b.com' },
          };
        });
      });
      it('should dispatch correctly', (done) => {
        const expectedActions = [
          {
            type: types.CREATE_NEW_USER_INITIATED,
          },
          {
            type: types.CREATE_NEW_USER_SUCCESS,
            user: { username: 'yay', password: 'security', email: 'a@b.com' },
          },
        ];

        store.dispatch(userActions.createNewUser({ username: 'yay', password: 'security', email: 'a@b.com' }))
          .then(() => {
            should(fetchUrl).equal('/api/users');
            should(fetchOptions.method).equal('POST');
            should(fetchOptions.body).equal(JSON.stringify({ username: 'yay', password: 'security', email: 'a@b.com' }));

            should(store.getActions()).deepEqual(expectedActions);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(CREATE_NEW_USER_URL, {
          method: 'POST',
          status: 500,
        });
      });

      it('should dispatch properly', (done) => {
        store.dispatch(userActions.createNewUser({ username: 'yay', password: 'security', email: 'a@b.com' }))
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
