import { getMonstersUrl, getMonsterUrl } from '../../server/lib/monsters';
import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  LOADING_MONSTERS_INITIATED,
  LOADING_MONSTERS_SUCCESS,
  LOADING_MONSTERS_ERROR,
  LOADING_MONSTER_INITIATED,
  LOADING_MONSTER_SUCCESS,
  LOADING_MONSTER_ERROR,
} from '../constants/action-types';

function loadingMonstersInitiated() {
  return {
    type: LOADING_MONSTERS_INITIATED,
  };
}

function loadingMonstersSuccess(monsters) {
  return {
    type: LOADING_MONSTERS_SUCCESS,
    monsters,
  };
}

function loadingMonstersError() {
  return {
    type: LOADING_MONSTERS_ERROR,
  };
}

function loadingMonsterInitiated() {
  return {
    type: LOADING_MONSTER_INITIATED,
  };
}

function loadingMonsterSuccess(monster) {
  return {
    type: LOADING_MONSTER_SUCCESS,
    monster,
  };
}

function loadingMonsterError() {
  return {
    type: LOADING_MONSTER_ERROR,
  };
}


export function loadMonsters() {
  return (dispatch) => {
    dispatch(loadingMonstersInitiated());

    const uri = getMonstersUrl(400, 0);
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(monsters => dispatch(loadingMonstersSuccess(monsters)))
      .catch(error => handleHttpError(dispatch, error, loadingMonstersError));
  };
}

export function loadMonster(id) {
  return (dispatch) => {
    dispatch(loadingMonsterInitiated());

    const uri = getMonsterUrl(id);
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return fetch(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(monsters => dispatch(loadingMonsterSuccess(monsters)))
      .catch(error => handleHttpError(dispatch, error, loadingMonsterError));
  };
}
