import should from 'should';

describe('items library', () => {
  let itemsLib;

  beforeEach(() => {
    itemsLib = require('../../../server/lib/items');
  });

  it('should exist', () => {
    should.exist(itemsLib);
  });

  describe('buildItemUI', () => {
    let ITEM;

    beforeEach(() => {
      ITEM = {
        _id: '1',
        name: 'Acid',
        description: 'text',
      };
    });

    it('should work', () => {
      const expected = {
        _id: '1',
        name: 'Acid',
        description: 'text',
      };
      const actual = itemsLib.buildItemUI(ITEM);

      should(expected).deepEqual(actual);
    });
  });

  describe('numberfy', () => {
    const ITEMS = {
      length: '2',
      value: '3',
    };

    it('should work', () => {
      const expected = {
        length: 2,
        value: 3,
      };

      const actual = itemsLib.numberfy(ITEMS, ['length', 'value']);

      should(actual).deepEqual(expected);
    });
  });
});
