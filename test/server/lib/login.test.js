import should from 'should';

describe('login library', () => {
  let loginLib;

  beforeEach(() => {
    loginLib = require('../../../server/lib/login');
  });

  it('should exist', () => {
    should.exist(loginLib);
  });

  describe('getLoginUrl', () => {
    it('should work', () => {
      should(loginLib.getLoginUrl()).equal('/api/login');
    });
  });

  describe('getLogoutUrl', () => {
    it('should work', () => {
      should(loginLib.getLogoutUrl()).equal('/api/logout');
    });
  });
});
