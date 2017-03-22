import should from 'should';
import * as functions from '../../../app/utils/functions';

describe('utils/functions', () => {
  it('should exist', () => {
    should.exist(functions);
  });

  describe('buildTimeUI', () => {
    it('should work at night', () => {
      const expected = {
        days: 0,
        hours: '01',
        minutes: '01',
        seconds: '01',
        ms: 3661000,
        rotation: -195.25,
        sky: 'night',
      };
      const actual = functions.buildTimeUI(3661000);

      should(actual).deepEqual(expected);
    });

    it('should work at dawn', () => {
      const expected = {
        days: 0,
        hours: '06',
        minutes: '01',
        seconds: '01',
        ms: 21661000,
        rotation: -270.25,
        sky: 'dawn',
      };
      const actual = functions.buildTimeUI(21661000);

      should(actual).deepEqual(expected);
    });

    it('should work during the day', () => {
      const expected = {
        days: 0,
        hours: '12',
        minutes: '01',
        seconds: '01',
        ms: 43261000,
        rotation: -360.25,
        sky: 'day',
      };
      const actual = functions.buildTimeUI(43261000);

      should(actual).deepEqual(expected);
    });

    it('should work at dusk', () => {
      const expected = {
        days: 0,
        hours: '18',
        minutes: '01',
        seconds: '01',
        ms: 64861000,
        rotation: -450.25,
        sky: 'dusk',
      };
      const actual = functions.buildTimeUI(64861000);

      should(actual).deepEqual(expected);
    });
  });

  describe('phaseOfMoon', () => {
    it('should work day is less than 29 and hours is less than 12', () => {
      should(functions.phaseOfMoon(15, 10)).equal(16);
    });

    it('should work day is less than 29 and hours is more than 12', () => {
      should(functions.phaseOfMoon(15, 14)).equal(17);
    });

    it('should work when given numbers', () => {
      should(functions.phaseOfMoon(30, 13)).equal(4);
    });

    it('should work when given strings', () => {
      should(functions.phaseOfMoon('28', '3')).equal(1);
    });
  });
});
