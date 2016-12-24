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
            cell_duration: 100,
            cell_delay: 100,
            time: 100,
            cell_endTime: 200,
          },
          {
            cell_duration: 200,
            cell_delay: 200,
            time: 300,
            cell_endTime: 500,
          },
        ],
      };
      const actual = genLib.trackStorm({
        cells: [
          {
            cell_duration: 100,
            cell_delay: 100,
          },
          {
            cell_duration: 200,
            cell_delay: 200,
          },
        ],
      }, 100);

      should(actual).deepEqual(expected);
    });
  });

  describe('backFill', () => {
    it('should work', () => {
      const expected = [
        { temp: 1, time: 1, rh: 3 },
        { temp: 2, time: 1, rh: 3 },
        { temp: 3, time: 2, rh: 1 },
      ];
      const actual = genLib.backFill([
        { temp: 1, time: 1, rh: 3 },
        { temp: 2 },
        { temp: 3, time: 2, rh: 1 },
      ], ['time', 'rh']);

      should(actual).deepEqual(expected);
    });
  });

  describe('stormOverFlow', () => {
    it('should work', () => {
      const expected = [
        {
          time: 0,
          cell_duration: 100,
          cell_endTime: 100,
          cell_delay: 100,
          temp: 95,
          cell_precip: 1,
          wind: 1,
          cell_solid: 1,
          cell_hook: 1,
        },
        {
          time: 50,
          cell_duration: 50,
          cell_endTime: 100,
          cell_delay: 100,
          temp: 95,
          cell_precip: 1,
          wind: 1,
          cell_solid: 1,
          cell_hook: 1,
        },
      ];
      const actual = genLib.stormOverFlow([
        {
          time: 0,
          cell_duration: 100,
          cell_endTime: 100,
          cell_delay: 100,
          temp: 95,
          cell_precip: 1,
          wind: 1,
          cell_solid: 1,
          cell_hook: 1,
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
          cell_endTime: 100,
          temp: 94,
          rh: 30,
        },
        {
          time: 101,
          temp: 94,
          rh: 30,
        },
        {
          time: 150,
          cell_endTime: 200,
          temp: 95,
          rh: 31,
        },
      ];
      const actual = genLib.fillStormGaps([
        {
          time: 0,
          cell_endTime: 100,
          temp: 94,
          rh: 30,
        },
        {
          time: 150,
          cell_endTime: 200,
          temp: 95,
          rh: 31,
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
          cell_endTime: 200,
          temp: 95,
          rh: 30,
        },
        {
          time: 201,
          temp: 95,
          rh: 30,
        },
      ];
      const actual = genLib.topOff([
        {
          time: 150,
          cell_endTime: 200,
          temp: 95,
          rh: 30,
        },
      ]);

      should(actual).deepEqual(expected);
    });
  });

  describe('getHeatIndex', () => {
    it('should work', () => {
      const caution = genLib.getHeatIndex(80, 40);
      const extremeCaution = genLib.getHeatIndex(90, 40);
      const danger = genLib.getHeatIndex(100, 40);
      const extremeDanger = genLib.getHeatIndex(110, 40);

      should(caution.number).equal(80);
      should(caution.warning).equal('Caution');

      should(extremeCaution.number).equal(91);
      should(extremeCaution.warning).equal('Extreme Caution');

      should(danger.number).equal(109);
      should(danger.warning).equal('Danger');

      should(extremeDanger.number).equal(136);
      should(extremeDanger.warning).equal('Extreme Danger');

      should(genLib.getHeatIndex(90, 40).number).equal(91);
      should(genLib.getHeatIndex(100, 40).number).equal(109);
      should(genLib.getHeatIndex(110, 40).number).equal(136);
    });
  });
});
