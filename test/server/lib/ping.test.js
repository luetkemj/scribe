import should from 'should';

describe('ping library', () => {
  let pingLib;

  beforeEach(() => {
    pingLib = require('../../../server/lib/ping');
  });

  it('should exist', () => {
    should.exist(pingLib);
  });

  const USER = {
    _id: '1234',
    username: 'luetkemj',
    password: 'password',
    email: 'mail@example.com',
    __v: 0 };

  const CAMPAIGN = {
    _id: '5678',
    name: 'campaign',
    userId: '1234',
    __v: 0 };

  describe('buildPingData', () => {
    it('should work', () => {
      should(pingLib.buildPingData(USER, CAMPAIGN)).deepEqual({
        userId: '1234',
        username: 'luetkemj',
        gravatar: 'https://www.gravatar.com/avatar/7daf6c79d4802916d83f6266e24850af?d=http://i.imgur.com/zMtOZS4.png',
        campaignName: 'campaign',
      });
    });
  });
});
