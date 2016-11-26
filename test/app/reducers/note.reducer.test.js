import reducer from '../../../app/reducers/note.reducer';
import * as types from '../../../app/constants/action-types';
import should from 'should';

describe('the note reducer', () => {
  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({});
  });

  describe('in the initial state', () => {
    let state;
    let fullState;
    beforeEach(() => {
      state = reducer(undefined, {});
      fullState = reducer(state, { id: 1 });
    });

    it('should handle CREATE_NOTE correctly', () => {
      should(
        reducer(state, {
          type: types.CREATE_NOTE,
          note: { id: 1 },
        })
      ).deepEqual({ id: 1 });
    });

    it('should handle UPDATE_NOTE correctly', () => {
      should(reducer(fullState, {
        type: types.UPDATE_NOTE,
        note: { id: 2 },
      })).deepEqual({ id: 2 });
    });

    it('should handle DELETE_NOTE correctly', () => {
      should(reducer(state, {
        type: types.DELETE_NOTE,
        note: null,
      })).deepEqual({});
    });
  });
});
