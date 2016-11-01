import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as monsterActions from '../../../app/actions/monsters.actions.js';
import * as types from '../../../app/constants/action-types';
import should from 'should';

import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('monsterActions', () => {
  const GET_MONSTERS_URL = '/api/monsters?limit=400&skip=0';
  const GET_MONSTER_URL = '/api/monsters/1';
  let store;

  afterEach(() => {
    fetchMock.restore();
  });

  it('should exist', () => {
    should.exist(monsterActions);
  });

  describe('loadMonstersIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        fetchMock.mock(GET_MONSTERS_URL, {
          status: 200,
          body: [{ id: 1 }],
        });
      });

      describe('when monsters exist', () => {
        beforeEach(() => {
          store = mockStore({
            monstersState: {
              monsters: [{ id: 1 }],
            },
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(monsterActions.loadMonstersIfNeeded());
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.MONSTERS_ALREADY_LOADED);
        });
      });

      describe('when monsters do not exist', () => {
        beforeEach(() => {
          store = mockStore({
            monstersState: {
              monsters: [],
            },
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(monsterActions.loadMonstersIfNeeded())
            .then(() => {
              const actions = store.getActions();
              should(actions.length).equal(2);
              should(actions[0].type).equal(types.LOADING_MONSTERS_INITIATED);
              should(actions[1].type).equal(types.LOADING_MONSTERS_SUCCESS);
              should(actions[1].monsters).deepEqual([{ id: 1 }]);
            })
            .then(done)
            .catch(done);
        });
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          monstersState: {
            monsters: [],
          },
        });
        fetchMock.mock(GET_MONSTERS_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(monsterActions.loadMonstersIfNeeded())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_MONSTERS_INITIATED);
            should(actions[1].type).equal(types.LOADING_MONSTERS_ERROR);
          })
          .then(done)
          .catch(done);
      });
    });
  });


  describe('loadMonsterIfNeeded', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        fetchMock.mock(GET_MONSTER_URL, {
          status: 200,
          body: { id: 1 },
        });
      });

      describe('when monster exists', () => {
        beforeEach(() => {
          store = mockStore({
            monstersState: {
              monster: { _id: 1 },
            },
          });
        });

        it('should dispatch properly', () => {
          store.dispatch(monsterActions.loadMonsterIfNeeded(1));
          const actions = store.getActions();
          should(actions.length).equal(1);
          should(actions[0].type).equal(types.MONSTER_ALREADY_LOADED);
        });
      });

      describe('when monster does not exist', () => {
        beforeEach(() => {
          store = mockStore({
            monstersState: {
              monster: {},
            },
          });
        });

        it('should dispatch properly', (done) => {
          store.dispatch(monsterActions.loadMonsterIfNeeded(1))
            .then(() => {
              const actions = store.getActions();
              should(actions.length).equal(2);
              should(actions[0].type).equal(types.LOADING_MONSTER_INITIATED);
              should(actions[1].type).equal(types.LOADING_MONSTER_SUCCESS);
              should(actions[1].monster).deepEqual({ id: 1 });
            })
            .then(done)
            .catch(done);
        });
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore({
          monstersState: {
            monster: {},
          },
        });
        fetchMock.mock(GET_MONSTER_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(monsterActions.loadMonsterIfNeeded(1))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_MONSTER_INITIATED);
            should(actions[1].type).equal(types.LOADING_MONSTER_ERROR);
          })
          .then(done)
          .catch(done);
      });
    });
  });
});
