import should from 'should';

describe('the campains lib', () => {
  let campaignsLib;
  let CAMPAIGN;
  let LOG;

  beforeEach(() => {
    campaignsLib = require('../../../server/lib/campaigns');

    CAMPAIGN = {
      _id: '1234',
      name: 'party of Five',
      userId: '5678',
    };

    LOG = [{ time: 12 }];
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

  describe('buildCampaignDetails', () => {
    it('should work when logs exist', () => {
      should(campaignsLib.buildCampaignDetails(CAMPAIGN, LOG)).deepEqual({
        name: 'party of Five',
        _id: '1234',
        time: 12,
      });
    });

    it('should work when no logs exist', () => {
      should(campaignsLib.buildCampaignDetails(CAMPAIGN, [])).deepEqual({
        name: 'party of Five',
        _id: '1234',
        time: 0,
      });
    });
  });
});
