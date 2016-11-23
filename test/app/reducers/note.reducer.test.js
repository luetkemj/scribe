import reducer from '../../../app/reducers/note.reducer';
import * as types from '../../../app/constants/action-types';
import should from 'should';

describe('the note reducer', () => {
  it('should exist', () => {
    should.exist(reducer);
  });

  it('should have correct initial state', () => {
    should(reducer(undefined, {})).deepEqual({
      error: null,
    });
  });

  describe('in the initial state', () => {
    let state;
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('should handle SAVING_NOTE_INITIATED correctly', () => {
      should(
        reducer(state, {
          type: types.SAVING_NOTE_INITIATED,
        })
      ).deepEqual({
        error: null,
      });
    });

    it('should handle SAVING_NOTE_SUCCESS correctly', () => {
      should(reducer(state, {
        type: types.SAVING_NOTE_SUCCESS,
        note: {
          _id: 1,
          name: 'best note',
        },
      })).deepEqual({
        error: null,
        _id: 1,
        name: 'best note',
      });
    });

    it('should handle SAVING_NOTE_ERROR correctly', () => {
      should(reducer(state, {
        type: types.SAVING_NOTE_ERROR,
        error: 'terrible things!',
      })).deepEqual({
        error: 'terrible things!',
      });
    });
  });
});
