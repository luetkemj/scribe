import fetchMock from 'fetch-mock';
import should from 'should';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as itemActions from '../../../app/actions/items.actions';
import * as types from '../../../app/constants/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('itemActions', () => {
  const GET_ITEMS_URL = '/api/items?limit=400&skip=0';
  const GET_ITEM_URL = '/api/items/1';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(itemActions);
  });

  describe('loadItemsIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEMS_URL, {
          status: 200,
          body: [{ a: 1 }],
        });
      });

      describe('when items exist', () => {
        beforeEach(() => {
          store = mockStore({
            itemsState: {
              items: [{ id: 1 }],
            },
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(itemActions.loadItemsIfNeeded());
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.ITEMS_ALREADY_LOADED);
        });
      });

      describe('when items do not exist', () => {
        beforeEach(() => {
          store = mockStore({
            itemsState: {
              items: [],
            },
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(itemActions.loadItemsIfNeeded())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_ITEMS_INITIATED);
            should(actions[1].type).equal(types.LOADING_ITEMS_SUCCESS);
            should(actions[1].items).deepEqual([{ a: 1 }]);
          })
          .then(done)
          .catch(done);
        });
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          itemsState: {
            items: [],
          },
        });
        fetchMock.mock(GET_ITEMS_URL, 500);
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.loadItemsIfNeeded())
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

  describe('loadItemIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_ITEM_URL, {
          status: 200,
          body: { id: 1 },
        });
      });

      describe('when item exists', () => {
        beforeEach(() => {
          store = mockStore({
            itemsState: {
              item: { _id: 1 },
            },
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(itemActions.loadItemIfNeeded(1));
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.ITEM_ALREADY_LOADED);
        });
      });

      describe('when item does not exist', () => {
        beforeEach(() => {
          store = mockStore({
            itemsState: {
              item: {},
            },
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(itemActions.loadItemIfNeeded(1))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_ITEM_INITIATED);
            should(actions[1].type).equal(types.LOADING_ITEM_SUCCESS);
            should(actions[1].item).deepEqual({ id: 1 });
          })
          .then(done)
          .catch(done);
        });
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          itemsState: {
            item: {},
          },
        });
        fetchMock.mock(GET_ITEM_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(itemActions.loadItemIfNeeded(1))
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
});
