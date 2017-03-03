import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  LOADING_ITEMS_INITIATED,
  ITEMS_ALREADY_LOADED,
  LOADING_ITEMS_SUCCESS,
  LOADING_ITEMS_ERROR,
  LOADING_ITEM_INITIATED,
  ITEM_ALREADY_LOADED,
  LOADING_ITEM_SUCCESS,
  LOADING_ITEM_ERROR,
} from '../constants/action-types';

function loadingItemsInitiated() {
  return {
    type: LOADING_ITEMS_INITIATED,
  };
}

function itemsAlreadyLoaded() {
  return {
    type: ITEMS_ALREADY_LOADED,
  };
}

function loadingItemsSuccess(items) {
  return {
    type: LOADING_ITEMS_SUCCESS,
    items,
  };
}

function loadingItemsError() {
  return {
    type: LOADING_ITEMS_ERROR,
  };
}

function loadingItemInitiated() {
  return {
    type: LOADING_ITEM_INITIATED,
  };
}

function itemAlreadyLoaded() {
  return {
    type: ITEM_ALREADY_LOADED,
  };
}

function loadingItemSuccess(item) {
  return {
    type: LOADING_ITEM_SUCCESS,
    item,
  };
}

function loadingItemError() {
  return {
    type: LOADING_ITEM_ERROR,
  };
}

function loadItems(dispatch) {
  dispatch(loadingItemsInitiated());

  const uri = '/api/items?limit=400&skip=0';
  const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
    method: 'GET',
  });

  return fetch(uri, options)
    .then(checkHttpStatus)
    .then(response => response.json())
    .then(items => dispatch(loadingItemsSuccess(items)))
    .catch(error => handleHttpError(dispatch, error, loadingItemsError));
}

function loadItem(id, dispatch) {
  dispatch(loadingItemInitiated());

  const uri = `/api/items/${id}`;
  const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
    method: 'GET',
  });

  return fetch(uri, options)
    .then(checkHttpStatus)
    .then(response => response.json())
    .then(item => dispatch(loadingItemSuccess(item)))
    .catch(error => handleHttpError(dispatch, error, loadingItemError));
}

export function loadItemsIfNeeded() {
  return (dispatch, getState) => {
    const { itemsState } = getState();

    if (itemsState.items.length) {
      return dispatch(itemsAlreadyLoaded());
    }

    return loadItems(dispatch);
  };
}

export function loadItemIfNeeded(id) {
  return (dispatch, getState) => {
    const { itemsState } = getState();

    if (itemsState.item._id === id) {
      return dispatch(itemAlreadyLoaded());
    }

    return loadItem(id, dispatch);
  };
}
