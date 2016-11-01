import {
  LOADING_MONSTERS_INITIATED,
  LOADING_MONSTERS_SUCCESS,
  LOADING_MONSTERS_ERROR,
  LOADING_MONSTER_INITIATED,
  LOADING_MONSTER_SUCCESS,
  LOADING_MONSTER_ERROR,
} from '../constants/action-types';

const initialState = {
  loadingMonsters: false,
  loadingMonster: false,
  monsters: [],
  monster: {},
  error: null,
};

export default function monstersReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_MONSTERS_INITIATED:
      return Object.assign({}, state, {
        loadingMonsters: true,
        monsters: [],
        error: null,
      });
    case LOADING_MONSTERS_SUCCESS:
      return Object.assign({}, state, {
        loadingMonsters: false,
        monsters: action.monsters,
        error: null,
      });
    case LOADING_MONSTERS_ERROR:
      return Object.assign({}, state, {
        loadingMonsters: false,
        monsters: [],
        error: action.error,
      });

    case LOADING_MONSTER_INITIATED:
      return Object.assign({}, state, {
        loadingMonster: true,
        monster: {},
        error: null,
      });
    case LOADING_MONSTER_SUCCESS:
      return Object.assign({}, state, {
        loadingMonster: false,
        monster: action.monster,
        error: null,
      });
    case LOADING_MONSTER_ERROR:
      return Object.assign({}, state, {
        loadingMonster: false,
        monster: {},
        error: action.error,
      });
    default:
      return state;
  }
}
