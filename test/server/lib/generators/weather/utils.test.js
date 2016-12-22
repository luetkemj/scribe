import should from 'should';

describe('The generator lib', () => {
  let genLib;

  beforeEach(() => {
    genLib = require('../../../../../server/lib/generators/weather/utils');
  });

  describe('shimmy', () => {
    it('should work', () => {
      const expected = [1, 3, 5, 4, 2];
      const actual = genLib.shimmy([5, 4, 3, 2, 1]);

      should(actual).deepEqual(expected);
    });
  });

  describe('assignTime', () => {
    let ARRAY;
    beforeEach(() => {
      ARRAY = [{
        one: 'two',
        three: 'four',
      }, {
        five: 'six',
        seven: 'eight',
      }];
    });
    it('should work', () => {
      const expected = [{
        one: 'two',
        three: 'four',
        time: 100,
      }, {
        five: 'six',
        seven: 'eight',
        time: 3600100,
      }];
      const actual = genLib.assignTime(ARRAY, 100);

      should(actual).deepEqual(expected);
    });
  });

  describe('getStormWindow', () => {
    it('should work', () => {
      const expected = {
        start: 500,
        end: 86399500,
      };
      const actual = genLib.getStormWindow([{ time: 500 }], { duration: 1000 });

      should(actual).deepEqual(expected);
    });
  });

  describe('trackStorm', () => {
    it('should work', () => {
      const expected = {
        cells: [
          {
            duration: 100,
            delay: 100,
            time: 100,
            endTime: 200,
          },
          {
            duration: 200,
            delay: 200,
            time: 300,
            endTime: 500,
          },
        ],
      };
      const actual = genLib.trackStorm({
        cells: [
          {
            duration: 100,
            delay: 100,
          },
          {
            duration: 200,
            delay: 200,
          },
        ],
      }, 100);

      should(actual).deepEqual(expected);
    });
  });

  describe('backFill', () => {
    it('should work', () => {
      const expected = [
        { temp: 1, time: 1 },
        { temp: 2, time: 1 },
        { temp: 3, time: 2 },
      ];
      const actual = genLib.backFill([
        { temp: 1, time: 1 },
        { temp: 2 },
        { temp: 3, time: 2 },
      ], 'time');

      should(actual).deepEqual(expected);
    });
  });

  describe('stormOverFlow', () => {
    it('should work', () => {
      const expected = [
        {
          time: 0,
          duration: 100,
          endTime: 100,
          delay: 100,
          temp: 95,
          precip: 1,
          wind: 1,
          solid: 1,
          hook: 1,
        },
        {
          time: 50,
          duration: 50,
          endTime: 100,
          delay: 100,
          temp: 95,
          precip: 1,
          wind: 1,
          solid: 1,
          hook: 1,
        },
      ];
      const actual = genLib.stormOverFlow([
        {
          time: 0,
          duration: 100,
          endTime: 100,
          delay: 100,
          temp: 95,
          precip: 1,
          wind: 1,
          solid: 1,
          hook: 1,
        },
        { temp: 98, time: 50 },
      ]);

      should(actual).deepEqual(expected);
    });
  });

  describe('fillStormGaps', () => {
    it('should work', () => {
      const expected = [
        {
          time: 0,
          endTime: 100,
          temp: 95,
        },
        {
          time: 101,
          temp: 95,
          filler: true,
        },
        {
          time: 150,
          endTime: 200,
          temp: 95,
        },
      ];
      const actual = genLib.fillStormGaps([
        {
          time: 0,
          endTime: 100,
          temp: 95,
        },
        {
          time: 150,
          endTime: 200,
          temp: 95,
        },
      ]);
      should(actual).deepEqual(expected);
    });
  });

  describe('topOff', () => {
    it('should work', () => {
      const expected = [
        {
          time: 150,
          endTime: 200,
          temp: 95,
        },
        {
          time: 201,
          temp: 95,
          topOff: true,
        },
      ];
      const actual = genLib.topOff([
        {
          time: 150,
          endTime: 200,
          temp: 95,
        },
      ]);

      should(actual).deepEqual(expected);
    });
  });
});
