import { getMonstersUrl, getMonsterUrl } from '../../server/lib/monsters';
import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
} from '../utils/http.utils';

import {
  LOADING_MONSTERS_INITIATED,
  MONSTERS_ALREADY_LOADED,
  LOADING_MONSTERS_SUCCESS,
  LOADING_MONSTERS_ERROR,
  LOADING_MONSTER_INITIATED,
  MONSTER_ALREADY_LOADED,
  LOADING_MONSTER_SUCCESS,
  LOADING_MONSTER_ERROR,
} from '../constants/action-types';

function loadingMonstersInitiated() {
  return {
    type: LOADING_MONSTERS_INITIATED,
  };
}

function monstersAlreadyLoaded() {
  return {
    type: MONSTERS_ALREADY_LOADED,
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

function monsterAlreadyLoaded() {
  return {
    type: MONSTER_ALREADY_LOADED,
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


function loadMonsters(dispatch) {
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
}

function loadMonster(id, dispatch) {
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
}

export function loadMonstersIfNeeded() {
  return (dispatch, getState) => {
    const { monstersState } = getState();

    if (monstersState.monsters.length) {
      return dispatch(monstersAlreadyLoaded());
    }

    return loadMonsters(dispatch);
  };
}

export function loadMonsterIfNeeded(id) {
  return (dispatch, getState) => {
    const { monstersState } = getState();

    if (monstersState.monster._id === id) {
      return dispatch(monsterAlreadyLoaded());
    }

    return loadMonster(id, dispatch);
  };
}
