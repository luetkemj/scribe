import {
  LOADING_ITEMS_INITIATED,
  LOADING_ITEMS_SUCCESS,
  LOADING_ITEMS_ERROR,
  LOADING_ITEM_INITIATED,
  LOADING_ITEM_SUCCESS,
  LOADING_ITEM_ERROR,
} from '../constants/action-types';

const initialState = {
  loadingItems: false,
  loadingItem: false,
  items: [],
  item: {},
  loadingItemsError: null,
  loadingItemError: null,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ITEMS_INITIATED:
      return Object.assign({}, state, {
        loadingItems: true,
        items: [],
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
        item: {},
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
    default:
      return state;
  }
}
