import should from 'should';

import reducer from '../../../app/reducers/monsters.reducer';
import * as types from '../../../app/constants/action-types';

describe('monsters reducer', () => {
  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({
      loadingMonsters: false,
      loadingMonster: false,
      monsters: [],
      monster: {},
      error: null,
    });
  });

  describe('in the initial state', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle LOADING_MONSTERS_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_MONSTERS_INITIATED,
        }),
      ).deepEqual({
        loadingMonsters: true,
        loadingMonster: false,
        monsters: [],
        monster: {},
        error: null,
      });
    });

    it('should handle LOADING_MONSTERS_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_MONSTERS_SUCCESS,
          monsters: [{ a: 1 }],
        }),
      ).deepEqual({
        loadingMonsters: false,
        loadingMonster: false,
        monsters: [{ a: 1 }],
        monster: {},
        error: null,
      });
    });

    it('should handle LOADING_MONSTERS_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_MONSTERS_ERROR,
          error: 'KHANNNN!',
        }),
      ).deepEqual({
        loadingMonsters: false,
        loadingMonster: false,
        monsters: [],
        monster: {},
        error: 'KHANNNN!',
      });
    });

    it('should handle LOADING_MONSTER_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_MONSTER_INITIATED,
        }),
      ).deepEqual({
        loadingMonsters: false,
        loadingMonster: true,
        monsters: [],
        monster: {},
        error: null,
      });
    });

    it('should handle LOADING_MONSTER_SUCCESS correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_MONSTER_SUCCESS,
          monster: { a: 1 },
        }),
      ).deepEqual({
        loadingMonsters: false,
        loadingMonster: false,
        monsters: [],
        monster: { a: 1 },
        error: null,
      });
    });

    it('should handle LOADING_MONSTER_ERROR correctly', () => {
      should(
        reducer(state, {
          type: types.LOADING_MONSTER_ERROR,
          error: 'KHANNNN!!',
        }),
      ).deepEqual({
        loadingMonsters: false,
        loadingMonster: false,
        monsters: [],
        monster: {},
        error: 'KHANNNN!!',
      });
    });
  });
});
