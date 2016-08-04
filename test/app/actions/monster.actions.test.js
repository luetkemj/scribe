import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as monsterActions from '../../../app/actions/monsters.actions.js';
import * as types from '../../../app/constants/action-types';
import should from 'should';

import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('monsterActions', () => {
  let store;
  const GET_MONSTERS_URL = '/api/monsters?limit=400&skip=0';
  const GET_MONSTER_URL = '/api/monster?id=1';

  it('should exist', () => {
    should.exist(monsterActions);
  });

  describe('loadMonsters', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_MONSTERS_URL, {
          status: 200,
          body: [{ a: 1 }],
        });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(monsterActions.loadMonsters())
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_MONSTERS_INITIATED);
            should(actions[1].type).equal(types.LOADING_MONSTERS_SUCCESS);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_MONSTERS_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(monsterActions.loadMonsters())
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

  describe('loadMonster', () => {
    describe('when status is 200', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_MONSTER_URL, {
          status: 200,
          body: [{ a: 1 }],
        });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(monsterActions.loadMonster(1))
          .then(() => {
            const actions = store.getActions();
            should(actions.length).equal(2);
            should(actions[0].type).equal(types.LOADING_MONSTER_INITIATED);
            should(actions[1].type).equal(types.LOADING_MONSTER_SUCCESS);
          })
          .then(done)
          .catch(done);
      });
    });

    describe('when status is 500', () => {
      beforeEach(() => {
        store = mockStore();
        fetchMock.mock(GET_MONSTER_URL, 500);
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('should dispatch properly', (done) => {
        store.dispatch(monsterActions.loadMonster(1))
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
