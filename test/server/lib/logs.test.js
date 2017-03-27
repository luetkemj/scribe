import should from 'should';

describe('logs library', () => {
  let logsLib;

  const LOG = {
    extraData: 'should be ignored',
    day: 2,
    time: 100,
    season: 'winter',
    weather: {
      condition: 'raining',
      wind: 'windy',
      temp: 'cold',
    },
    notes: [
      'note 1',
      'note 2',
    ],
  };

  beforeEach(() => {
    logsLib = require('../../../server/lib/logs');
  });

  it('should exist', () => {
    should.exist(logsLib);
  });

  describe('buildLogUI', () => {
    it('should work', () => {
      should(logsLib.buildLogUI(LOG))
      .deepEqual({
        day: 2,
        time: 100,
        season: 'winter',
        weather: {
          condition: 'raining',
          wind: 'windy',
          temp: 'cold',
        },
        notes: [
          'note 1',
          'note 2',
        ],
      });
    });
  });

  describe('buildNewLog', () => {
    it('should work', () => {
      should(logsLib.buildNewLog(LOG, 1234))
      .deepEqual({
        day: 2,
        time: 100,
        season: 'winter',
        weather: {
          condition: 'raining',
          wind: 'windy',
          temp: 'cold',
        },
        notes: [
          'note 1',
          'note 2',
        ],
        campaignId: 1234,
      });
    });
  });
});
