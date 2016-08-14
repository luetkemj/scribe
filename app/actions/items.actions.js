import { getItemsUrl, getItemUrl, getCreateItemUrl } from '../../server/lib/items';
import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

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

function loadingItemsInitiated() {
  return {
    type: LOADING_ITEMS_INITIATED,
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

function savingItemInitiated() {
  return {
    type: SAVING_ITEM_INITIATED,
  };
}

function savingItemSuccess(item) {
  return {
    type: SAVING_ITEM_SUCCESS,
    item,
  };
}

function savingItemError(error) {
  return {
    type: SAVING_ITEM_ERROR,
    error,
  };
}

function creatingItemInitiated() {
  return {
    type: CREATING_ITEM_INITIATED,
  };
}

function creatingItemSuccess() {
  return {
    type: CREATING_ITEM_SUCCESS,
  };
}

function creatingItemError(error) {
  return {
    type: CREATING_ITEM_ERROR,
    error,
  };
}


export function loadItems() {
  return (dispatch) => {
    dispatch(loadingItemsInitiated());

    const uri = getItemsUrl(400, 0);
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(items => dispatch(loadingItemsSuccess(items)))
      .catch((error) => handleHttpError(dispatch, error, loadingItemsError));
  };
}

export function loadItem(id) {
  return (dispatch) => {
    dispatch(loadingItemInitiated());

    const uri = getItemUrl(id);
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(item => dispatch(loadingItemSuccess(item)))
      .catch((error) => handleHttpError(dispatch, error, loadingItemError));
  };
}

function creatingItem(uri, options, dispatch) {
  dispatch(creatingItemInitiated());

  return fetch(uri, options)
   .then(checkHttpStatus)
   .then(() => dispatch(creatingItemSuccess()))
   .catch((error) => handleHttpError(dispatch, error, creatingItemError));
}

export function createItem(item) {
  return dispatch => {
    const uri = getCreateItemUrl();
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'POST',
      body: JSON.stringify({
        item,
      }),
    });
    return creatingItem(uri, options, dispatch);
  };
}

function savingItem(uri, options, dispatch) {
  dispatch(savingItemInitiated());

  return fetch(uri, options)
    .then(checkHttpStatus)
    .then(() => dispatch(savingItemSuccess()))
    .catch((error) => handleHttpError(dispatch, error, savingItemError));
}

export function saveItem(item) {
  return dispatch => {
    const uri = getItemUrl(item._id);
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'PATCH',
      body: JSON.stringify({
        item,
      }),
    });

    return savingItem(uri, options, dispatch);
  };
}
