import should from 'should';
import config from '../../../server/config';

describe('items library', () => {
  let itemsLib;

  beforeEach(() => {
    itemsLib = require('../../../server/lib/items');
  });

  it('should exist', () => {
    should.exist(itemsLib);
  });

  describe('getItemsUrl', () => {
    let API;
    beforeEach(() => {
      API = config.api.items;
    });

    it('should work', () => {
      const expected = `${API}?limit=undefined&skip=undefined`;
      const actual = itemsLib.getItemsUrl();

      should(expected).equal(actual);
    });
  });

  describe('getItemUrl', () => {
    let API;
    beforeEach(() => {
      API = config.api.items;
    });

    it('should work', () => {
      const expected = `${API}/20`;
      const actual = itemsLib.getItemUrl(20);

      should(expected).equal(actual);
    });
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
