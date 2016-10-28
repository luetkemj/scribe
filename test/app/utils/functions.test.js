import should from 'should';
import * as functions from '../../../app/utils/functions';

describe('utils/functions', () => {
  it('should exist', () => {
    should.exist(functions);
  });

  describe('leadingZero', () => {
    it('should work with numbers 0 - 9', () => {
      const expected = '05';
      const actual = functions.leadingZero(5);

      should(expected).equal(actual);
    });

    it('should work with numbers 10+', () => {
      const expected = '50';
      const actual = functions.leadingZero(50);

      should(expected).equal(actual);
    });

    it('should work with numbers less than 0', () => {
      const expected = '-5';
      const actual = functions.leadingZero(-5);

      should(expected).equal(actual);
    });
  });
});
