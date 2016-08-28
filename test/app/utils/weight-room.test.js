import should from 'should';
import * as weightRoom from '../../../app/utils/weight-room';

describe('parser', () => {
  it('should exist', () => {
    should.exist(weightRoom.parser);
  });

  it('should work', () => {
    const expected = [
      { match: '12lb', value: '12', unit: 'LB' },
    ];
    const actual = weightRoom.parser('12lb');

    should(expected).deepEqual(actual);
  });
});
