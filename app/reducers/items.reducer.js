import { sortedIndex } from 'lodash';

import {
  LOADING_ITEMS_INITIATED,
  LOADING_ITEMS_SUCCESS,
  LOADING_ITEMS_ERROR,
  LOADING_ITEM_INITIATED,
  LOADING_ITEM_SUCCESS,
  LOADING_ITEM_ERROR,
  SAVING_ITEM_INITIATED,
  SAVING_ITEM_SUCCESS,
  SAVING_ITEM_ERROR,
  CREATING_ITEM_INITIATED,
  CREATING_ITEM_SUCCESS,
  CREATING_ITEM_ERROR,
} from '../constants/action-types';

const initialState = {
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
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ITEMS_INITIATED:
      return Object.assign({}, state, {
        loadingItems: true,
        loadingItemsError: null,
      });
    case LOADING_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        loadingItems: false,
        items: action.items,
        loadingItemsError: null,
      });
    case LOADING_ITEMS_ERROR:
      return Object.assign({}, state, {
        loadingItems: false,
        items: [],
        loadingItemsError: action.error,
      });
    case LOADING_ITEM_INITIATED:
      return Object.assign({}, state, {
        loadingItem: true,
        loadingItemError: null,
      });
    case LOADING_ITEM_SUCCESS:
      return Object.assign({}, state, {
        loadingItem: false,
        item: action.item,
        loadingItemError: null,
      });
    case LOADING_ITEM_ERROR:
      return Object.assign({}, state, {
        loadingItem: false,
        item: {},
        loadingItemError: action.error,
      });
    case SAVING_ITEM_INITIATED:
      return Object.assign({}, state, {
        savingItem: true,
        savingItemSuccess: null,
        savingItemError: null,
      });
    case SAVING_ITEM_SUCCESS:
      return Object.assign({}, state, {
        savingItem: false,
        savingItemSuccess: true,
        savingItemError: null,
      });
    case SAVING_ITEM_ERROR:
      return Object.assign({}, state, {
        savingItem: false,
        savingItemSuccess: null,
        savingItemError: action.error,
      });
    case CREATING_ITEM_INITIATED:
      return Object.assign({}, state, {
        creatingItem: true,
        creatingItemSuccess: null,
        creatingItemError: null,
      });
    case CREATING_ITEM_SUCCESS: {
      const index = sortedIndex(state.items, action.item.name);
      state.items.splice(index, 0, action.item);
      return Object.assign({}, state, {
        creatingItem: false,
        creatingItemSuccess: true,
        creatingItemError: null,
        items: state.items,
      });
    }
    case CREATING_ITEM_ERROR:
      return Object.assign({}, state, {
        creatingItem: false,
        creatingItemSuccess: null,
        creatingItemError: action.error,
      });
    default:
      return state;
  }
}
