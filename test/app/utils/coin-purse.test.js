import should from 'should';
import * as coins from '../../../app/utils/coin-purse';

describe('copperValue', () => {
  it('should exist', () => {
    should.exist(coins.copperValue);
  });

  it('should find the correct copperValue of 2GP', () => {
    const expected = 200;
    const actual = coins.copperValue('2GP');

    should(expected).equal(actual);
  });

  it('should find the correct copperValue of 1CP2SP3EP4GP5PP', () => {
    const expected = 5571;
    const actual = coins.copperValue('1CP2SP3EP4GP5PP');

    should(expected).equal(actual);
  });

  it('should find the correct copperValue of 2gp1SP 3Ep32cP 1pp', () => {
    const expected = 1392;
    const actual = coins.copperValue('2gp1SP 3Ep32cP 1pp');

    should(expected).equal(actual);
  });

  it('should find the correct copperValue in teh phrase "This sword is worth 20gp"', () => {
    const expected = 2000;
    const actual = coins.copperValue('This sword is worth 20gp');

    should(expected).equal(actual);
  });
});

describe('subUnits', () => {
  it('should exist', () => {
    should.exist(coins.subUnits);
  });

  it('should work', () => {
    const expected = {
      CP: 1,
      SP: 1,
      EP: 1,
      GP: 1,
      PP: 1,
    };
    const actual = coins.subUnits(1161);

    should(expected).deepEqual(actual);
  });
});

describe('parser', () => {
  it('should exist', () => {
    should.exist(coins.parser);
  });

  it('should work', () => {
    const expected = [
      { match: '1cp', value: '1', denomination: 'CP' },
      { match: '12SP', value: '12', denomination: 'SP' },
      { match: '123ep', value: '123', denomination: 'EP' },
      { match: '1234GP', value: '1234', denomination: 'GP' },
      { match: '12345PP', value: '12345', denomination: 'PP' },
    ];
    const actual = coins.parser('1cp 12SP 123ep 1234GP 12345PP');

    should(expected).deepEqual(actual);
  });
});
