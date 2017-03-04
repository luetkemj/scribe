import should from 'should';

describe('logs library', () => {
  let logsLib;

  const LOG = {
    _id: '1',
    day: 2,
    time: 100,
    season: 'winter',
    weather: 'cold',
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
        _id: '1',
        day: 2,
        time: 100,
        season: 'winter',
        weather: 'cold',
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
        _id: '1',
        day: 2,
        time: 100,
        season: 'winter',
        weather: 'cold',
        notes: [
          'note 1',
          'note 2',
        ],
        campaignId: 1234,
      });
    });
  });
});
