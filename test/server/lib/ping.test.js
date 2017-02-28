import should from 'should';

describe('ping library', () => {
  let pingLib;

  beforeEach(() => {
    pingLib = require('../../../server/lib/ping');
  });

  it('should exist', () => {
    should.exist(pingLib);
  });

  const PING_DATA = {
    ping: 0,
    campaignName: 'ping',
  };

  const RESULTS = [{
    ping: 0,
  }, {
    name: 'ping',
  }];

  describe('buildPingData', () => {
    it('should work', () => {
      should(pingLib.buildPingData(RESULTS)).deepEqual(PING_DATA);
    });
  });
});
