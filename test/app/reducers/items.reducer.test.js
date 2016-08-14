import reducer from '../../../app/reducers/items.reducer';
import * as types from '../../../app/constants/action-types';
import should from 'should';

describe('items reducer', () => {
  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({
      loadingItems: false,
      loadingItem: false,
      savingItem: false,
      creatingItem: false,
      items: [],
      item: {},
      savingItemSuccess: null,
      creatingItemSuccess: null,
      loadingItemsError: null,
      loadingItemError: null,
      savingItemError: null,
      creatingItemError: null,
    });
  });

  describe('in the initial state', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle LOADING_ITEMS_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEMS_INITIATED,
        })
      ).deepEqual({
        loadingItems: true,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle LOADING_ITEMS_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEMS_SUCCESS,
          items: [{ a: 1 }],
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [{ a: 1 }],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle LOADING_ITEMS_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEMS_ERROR,
          error: 'KHANNNN!',
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: 'KHANNNN!',
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle LOADING_ITEM_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEM_INITIATED,
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: true,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle LOADING_ITEM_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEM_SUCCESS,
          item: { a: 1 },
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: { a: 1 },
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle LOADING_ITEM_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEM_ERROR,
          error: 'KHANNNN!!',
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: 'KHANNNN!!',
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle SAVING_ITEM_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.SAVING_ITEM_INITIATED,
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: true,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle SAVING_ITEM_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.SAVING_ITEM_SUCCESS,
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: true,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle SAVING_ITEM_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.SAVING_ITEM_ERROR,
          error: 'KHANNNN!!',
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: 'KHANNNN!!',
        creatingItemError: null,
      });
    });

    it('should handle CREATING_ITEM_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.CREATING_ITEM_INITIATED,
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: true,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle CREATING_ITEM_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.CREATING_ITEM_SUCCESS,
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: true,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: null,
      });
    });

    it('should handle CREATING_ITEM_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.CREATING_ITEM_ERROR,
          error: 'KHANNNN!!',
        })
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        savingItem: false,
        creatingItem: false,
        items: [],
        item: {},
        savingItemSuccess: null,
        creatingItemSuccess: null,
        loadingItemsError: null,
        loadingItemError: null,
        savingItemError: null,
        creatingItemError: 'KHANNNN!!',
      });
    });
  });
});
