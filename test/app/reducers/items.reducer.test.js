import should from 'should';

import reducer from '../../../app/reducers/items.reducer';
import * as types from '../../../app/constants/action-types';

describe('items reducer', () => {
  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({
      loadingItems: false,
      loadingItem: false,
      items: [],
      item: {},
      loadingItemsError: null,
      loadingItemError: null,
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
        }),
      ).deepEqual({
        loadingItems: true,
        loadingItem: false,
        items: [],
        item: {},
        loadingItemsError: null,
        loadingItemError: null,
      });
    });

    it('should handle LOADING_ITEMS_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEMS_SUCCESS,
          items: [{ a: 1 }],
        }),
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        items: [{ a: 1 }],
        item: {},
        loadingItemsError: null,
        loadingItemError: null,
      });
    });

    it('should handle LOADING_ITEMS_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEMS_ERROR,
          error: 'KHANNNN!',
        }),
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        items: [],
        item: {},
        loadingItemsError: 'KHANNNN!',
        loadingItemError: null,
      });
    });

    it('should handle LOADING_ITEM_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEM_INITIATED,
        }),
      ).deepEqual({
        loadingItems: false,
        loadingItem: true,
        items: [],
        item: {},
        loadingItemsError: null,
        loadingItemError: null,
      });
    });

    it('should handle LOADING_ITEM_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEM_SUCCESS,
          item: { a: 1 },
        }),
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        items: [],
        item: { a: 1 },
        loadingItemsError: null,
        loadingItemError: null,
      });
    });

    it('should handle LOADING_ITEM_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_ITEM_ERROR,
          error: 'KHANNNN!!',
        }),
      ).deepEqual({
        loadingItems: false,
        loadingItem: false,
        items: [],
        item: {},
        loadingItemsError: null,
        loadingItemError: 'KHANNNN!!',
      });
    });
  });
});
