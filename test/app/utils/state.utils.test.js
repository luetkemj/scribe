import should from 'should';
import * as stateUtils from '../../../app/utils/state.utils';

describe('state utils', () => {
  it('should exist', () => {
    should.exist(stateUtils);
  });

  describe('generateNewState', () => {
    it('should update state correctly when updates are necessary', () => {
      const state = { a: 1, b: 2, c: 3 };
      const updates = { b: 4 };
      should(stateUtils.generateNewState(state, updates)).deepEqual({
        a: 1,
        b: 4,
        c: 3,
      });
    });

    it('should update state correctly when additions are necessary', () => {
      const state = { a: 1, b: 2, c: 3 };
      const updates = { d: 4 };
      should(stateUtils.generateNewState(state, updates)).deepEqual({
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
    });

    it('should update state correctly when no updates are necessary', () => {
      const state = { a: 1, b: 2, c: 3 };
      const updates = {};
      should(stateUtils.generateNewState(state, updates)).deepEqual({
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
