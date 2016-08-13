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
        _id: '57ae3d5a1ba26a808a6d4635',
        name: 'Acid',
        weight: {
          value: 25,
          unit: 'gp',
        },
        cost: {
          value: 1,
          unit: 'lb',
        },
        description: 'text',
      };
    });

    it('should work', () => {
      const expected = {
        _id: '57ae3d5a1ba26a808a6d4635',
        name: 'Acid',
        weight: {
          value: 25,
          unit: 'gp',
        },
        cost: {
          value: 1,
          unit: 'lb',
        },
        description: 'text',
      };
      const actual = itemsLib.buildItemUI(ITEM);

      should(expected).deepEqual(actual);
    });
  });
});
