import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as itemActions from '../../../app/actions/items.actions.js';
import * as types from '../../../app/constants/action-types';
import should from 'should';

import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('itemActions', () => {
  let store;
  const GET_ITEMS_URL = '/api/items?limit=400&skip=0';
  const GET_ITEM_URL = '/api/items/1';
  const GET_CREATE_ITEM_URL = '/api/items';

  it('should exist', () => {
    should.exist(itemActions);
  });

  describe('loadItems', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEMS_URL, {
          status: 200,
          body: [{ a: 1 }],
        });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.loadItems())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_ITEMS_INITIATED);
            should(actions[1].type).equal(types.LOADING_ITEMS_SUCCESS);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEMS_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.loadItems())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_ITEMS_INITIATED);
            should(actions[1].type).equal(types.LOADING_ITEMS_ERROR);
          })
          .then(done)
          .catch(done);
      });
    });
  });

  describe('loadItem', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEM_URL, {
          status: 200,
          body: [{ a: 1 }],
        });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.loadItem(1))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_ITEM_INITIATED);
            should(actions[1].type).equal(types.LOADING_ITEM_SUCCESS);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEM_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.loadItem(1))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_ITEM_INITIATED);
            should(actions[1].type).equal(types.LOADING_ITEM_ERROR);
          })
          .then(done)
          .catch(done);
      });
    });
  });

  describe('createItem', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_CREATE_ITEM_URL, {
          status: 200,
          method: 'POST',
          body: [{ a: 1 }],
        });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.createItem({ name: 'test' }))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.CREATING_ITEM_INITIATED);
            should(actions[1].type).equal(types.CREATING_ITEM_SUCCESS);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_CREATE_ITEM_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.createItem())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.CREATING_ITEM_INITIATED);
            should(actions[1].type).equal(types.CREATING_ITEM_ERROR);
            should(actions[1].error.response.statusText).equal('Internal Server Error');
          })
          .then(done)
          .catch(done);
      });
    });
  });

  describe('saveItem', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEM_URL, 200);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.saveItem({ _id: 1, name: 'test' }))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.SAVING_ITEM_INITIATED);
            should(actions[1].type).equal(types.SAVING_ITEM_SUCCESS);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEM_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.saveItem({ _id: 1, name: 'test' }))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.SAVING_ITEM_INITIATED);
            should(actions[1].type).equal(types.SAVING_ITEM_ERROR);
            should(actions[1].error.response.statusText).equal('Internal Server Error');
          })
          .then(done)
          .catch(done);
      });
    });
  });
});
