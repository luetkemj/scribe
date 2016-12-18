import should from 'should';

describe('The generator lib', () => {
  let genLib;

  beforeEach(() => {
    genLib = require('../../../server/lib/generators');
  });

  describe('shimmy', () => {
    it('should work', () => {
      const expected = [1, 3, 5, 4, 2];
      const actual = genLib.shimmy([5, 4, 3, 2, 1]);

      should(expected).deepEqual(actual);
    });
  });
});
