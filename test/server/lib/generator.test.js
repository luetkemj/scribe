import should from 'should';

describe('The generator lib', () => {
  let genLib;
  let HOURLY_WEATHER;
  let STORM;
  let TRACKED_STORM;
  let STORM_START_TIME;
  let HOURLY_WEATHER_WITH_STORMS;
  let ORDERED_HOURLY_WEATHER_WITH_STORMS;
  let BACKFILLED_HOURLY_WEATHER_WITH_STORMS;

  beforeEach(() => {
    genLib = require('../../../server/lib/generators');

    HOURLY_WEATHER = [
      {
        temp: 95,
        time: 0,
      },
      {
        temp: 98,
        time: 3600000,
      },
      {
        temp: 100,
        time: 7200000,
      },
      {
        temp: 101,
        time: 10800000,
      },
    ];

    STORM = {
      cells: [
        {
          duration: 2000000,
          effect: {
            precip: 1,
            wind: 1,
            solid: 1,
            hook: 1,
          },
          delay: 100000,
        },
        {
          duration: 2000000,
          effect: {
            precip: 2,
            wind: 2,
            solid: 2,
            hook: 2,
          },
          delay: 100000,
        },
        {
          duration: 2000000,
          effect: {
            precip: 3,
            wind: 3,
            solid: 3,
            hook: 3,
          },
          delay: 100000,
        },
      ],
    };

    TRACKED_STORM = {
      cells: [{
        duration: 2000000,
        effect: { precip: 1, wind: 1, solid: 1, hook: 1 },
        delay: 100000,
        time: 5000,
        endTime: 2005000,
      }, {
        duration: 2000000,
        effect: { precip: 2, wind: 2, solid: 2, hook: 2 },
        delay: 100000,
        time: 2105000,
        endTime: 4105000,
      }, {
        duration: 2000000,
        effect: { precip: 3, wind: 3, solid: 3, hook: 3 },
        delay: 100000,
        time: 4205000,
        endTime: 6205000,
      }],
    };

    STORM_START_TIME = 5000;

    HOURLY_WEATHER_WITH_STORMS = [
      { temp: 95, time: 0 },
      { temp: 98, time: 3600000 },
      { temp: 100, time: 7200000 },
      { temp: 101, time: 10800000 },
      {
        time: 5000,
        cell: {
          duration: 2000000,
          effect: { precip: 1, wind: 1, solid: 1, hook: 1 },
          delay: 100000,
        },
      },
      {
        time: 2105000,
        cell: {
          duration: 2000000,
          effect: { precip: 2, wind: 2, solid: 2, hook: 2 },
          delay: 100000,
        },
      },
      {
        time: 4205000,
        cell: {
          duration: 2000000,
          effect: { precip: 3, wind: 3, solid: 3, hook: 3 },
          delay: 100000,
        },
      },
    ];

    ORDERED_HOURLY_WEATHER_WITH_STORMS = [
      { temp: 95, time: 0 },
      {
        time: 5000,
        cell: {
          duration: 2000000,
          effect: { precip: 1, wind: 1, solid: 1, hook: 1 },
          delay: 100000,
        },
      },
      {
        time: 2105000,
        cell: {
          duration: 2000000,
          effect: { precip: 2, wind: 2, solid: 2, hook: 2 },
          delay: 100000,
        },
      },
      { temp: 98, time: 3600000 },
      {
        time: 4205000,
        cell: {
          duration: 2000000,
          effect: { precip: 3, wind: 3, solid: 3, hook: 3 },
          delay: 100000,
        },
      },
      { temp: 100, time: 7200000 },
      { temp: 101, time: 10800000 },
    ];

    BACKFILLED_HOURLY_WEATHER_WITH_STORMS = [
      { temp: 95, time: 0 },
      {
        time: 5000,
        temp: 95,
        cell: {
          duration: 2000000,
          effect: { precip: 1, wind: 1, solid: 1, hook: 1 },
          delay: 100000,
        },
      },
      {
        time: 2105000,
        temp: 95,
        cell: {
          duration: 2000000,
          effect: { precip: 2, wind: 2, solid: 2, hook: 2 },
          delay: 100000,
        },
      },
      { temp: 98, time: 3600000 },
      {
        time: 4205000,
        temp: 98,
        cell: {
          duration: 2000000,
          effect: { precip: 3, wind: 3, solid: 3, hook: 3 },
          delay: 100000,
        },
      },
      { temp: 100, time: 7200000 },
      { temp: 101, time: 10800000 },
    ];
  });

  describe('shimmy', () => {
    it('should work', () => {
      const expected = [1, 3, 5, 4, 2];
      const actual = genLib.shimmy([5, 4, 3, 2, 1]);

      should(expected).deepEqual(actual);
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

      should(expected).deepEqual(actual);
    });
  });

  describe('getStormWindow', () => {
    it('should work', () => {
      const expected = {
        start: 500,
        end: 86399500,
      };
      const actual = genLib.getStormWindow([{ time: 500 }], { duration: 1000 });

      should(expected).deepEqual(actual);
    });
  });

  describe('trackStorm', () => {
    it('should work', () => {
      const expected = TRACKED_STORM;
      const actual = genLib.trackStorm(STORM, STORM_START_TIME);

      should(expected).deepEqual(actual);
    });
  });

  describe('backFill', () => {
    it('should work', () => {
      const expected = BACKFILLED_HOURLY_WEATHER_WITH_STORMS;
      const actual = genLib.backFill(ORDERED_HOURLY_WEATHER_WITH_STORMS, 'temp');

      should(expected).deepEqual(actual);
    });
  });
});
