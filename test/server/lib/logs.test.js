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

  describe('getLogsUrl', () => {
    it('should work without args', () => {
      should(logsLib.getLogsUrl())
      .equal('/api/secure/logs?limit=0&skip=0');
    });

    it('should work with args', () => {
      should(logsLib.getLogsUrl(10, 19))
      .equal('/api/secure/logs?limit=10&skip=19');
    });
  });

  describe('getCreateLogUrl', () => {
    it('should work', () => {
      should(logsLib.getCreateLogUrl())
      .equal('/api/secure/logs');
    });
  });

  describe('getLogUrl', () => {
    it('should work', () => {
      should(logsLib.getLogUrl(1))
      .equal('/api/secure/logs/1');
    });
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
});
