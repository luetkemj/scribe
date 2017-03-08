import should from 'should';


describe('The events lib', () => {
  let eventsLib;
  let EVENT;

  beforeEach(() => {
    eventsLib = require('../../../server/lib/events');

    EVENT = {
      eventType: 'test',
      event: {
        name: 'test1',
      },
      time: 1234,
      campaignId: '58bc1d6a62e2b43cb0955361',
      extra: 'this should be ignored',
    };
  });

  it('should exist', () => {
    should.exist(eventsLib);
  });

  describe('buildEvent', () => {
    it('should work', () => {
      should(eventsLib.buildEvent(EVENT)).deepEqual({
        eventType: 'test',
        event: {
          name: 'test1',
        },
        time: 1234,
        campaignId: '58bc1d6a62e2b43cb0955361',
      });
    });
  });
});
