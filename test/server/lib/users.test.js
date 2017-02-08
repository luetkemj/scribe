import should from 'should';

describe('users library', () => {
  let usersLib;

  beforeEach(() => {
    usersLib = require('../../../server/lib/users');
  });

  it('should exist', () => {
    should.exist(usersLib);
  });

  describe('getCreateNewUserUrl', () => {
    it('should work', () => {
      should(usersLib.getCreateNewUserUrl()).equal('/api/users');
    });
  });

  describe('getUserUrl', () => {
    it('should work', () => {
      should(usersLib.getUserUrl(1)).equal('/api/users/1');
    });
  });

  describe('getUserGravatar', () => {
    it('should work', () => {
      const expected = 'https://www.gravatar.com/avatar/5fe8b710f689994a19f829116be2639b?d=http://i.imgur.com/zMtOZS4.png';
      should(usersLib.getUserGravatar(' luetkemj@gmail.com ')).equal(expected);
    });
  });
});
