import should from 'should';

describe('the campains lib', () => {
  let campaignsLib;
  let CAMPAIGN;

  beforeEach(() => {
    campaignsLib = require('../../../server/lib/campaigns');

    CAMPAIGN = {
      _id: '1234',
      name: 'party of Five',
      userId: '5678',
    };
  });

  it('should exist', () => {
    should.exist(campaignsLib);
  });

  describe('buildCampaignData', () => {
    it('should work', () => {
      should(campaignsLib.buildCampaignData(CAMPAIGN)).deepEqual({
        name: 'party of Five',
        _id: '1234',
      });
    });
  });
});
