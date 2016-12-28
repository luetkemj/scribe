import should from 'should';

describe('The generators weather utils lib', () => {
  let utilsLib;

  beforeEach(() => {
    utilsLib = require('../../../../../server/lib/generators/weather/utils');
  });

  describe('shimmy', () => {
    it('should work', () => {
      const expected = [1, 3, 5, 4, 2];
      const actual = utilsLib.shimmy([5, 4, 3, 2, 1]);

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
      const actual = utilsLib.assignTime(ARRAY, 100);

      should(actual).deepEqual(expected);
    });
  });

  describe('getStormWindow', () => {
    it('should work', () => {
      const expected = {
        start: 500,
        end: 86399500,
      };
      const actual = utilsLib.getStormWindow([{ time: 500 }], { duration: 1000 });

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
      const actual = utilsLib.trackStorm({
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
      const actual = utilsLib.backFill([
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
      const actual = utilsLib.stormOverFlow([
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
      const actual = utilsLib.fillStormGaps([
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
      const actual = utilsLib.topOff([
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
      should(utilsLib.getHeatIndex(80, 40).feels_like).equal(80);
      should(utilsLib.getHeatIndex(90, 40).feels_like).equal(91);
      should(utilsLib.getHeatIndex(100, 40).feels_like).equal(109);
      should(utilsLib.getHeatIndex(110, 40).feels_like).equal(136);
    });
  });

  describe('getWindChill', () => {
    it('should work', () => {
      should(utilsLib.getWindChill(15, 60).feels_like).equal(-11);
      should(utilsLib.getWindChill(5, 60).feels_like).equal(-26);
      should(utilsLib.getWindChill(-5, 60).feels_like).equal(-40);
      should(utilsLib.getWindChill(-15, 60).feels_like).equal(-55);
    });
  });

  describe('feelsLike', () => {
    it('should work', () => {
      const actual = utilsLib.feelsLike([
        {
          temp: 90,
          rh: 40,
          wind: 60,
        },
        {
          temp: 70,
          rh: 40,
          wind: 60,
        },
        {
          temp: 15,
          rh: 40,
          wind: 60,
        },
      ]);
      should.exist(actual[0].heat_index);
      should.not.exist(actual[0].wind_chill);

      should.not.exist(actual[1].heat_index);
      should.not.exist(actual[1].wind_chill);

      should.not.exist(actual[2].heat_index);
      should.exist(actual[2].wind_chill);
    });
  });
});
