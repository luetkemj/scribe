import should from 'should';
import config from '../../../server/config';

describe('monsters library', () => {
  let monstersLib;

  beforeEach(() => {
    monstersLib = require('../../../server/lib/monsters');
  });

  it('should exist', () => {
    should.exist(monstersLib);
  });

  describe('getMonstersUrl', () => {
    let API;
    beforeEach(() => {
      API = config.api.monsters;
    });

    it('should work', () => {
      const expected = `${API}?limit=undefined&skip=undefined`;
      const actual = monstersLib.getMonstersUrl();

      should(expected).equal(actual);
    });
  });

  describe('getMonsterUrl', () => {
    let API;
    beforeEach(() => {
      API = config.api.monster;
    });

    it('should work', () => {
      const expected = `${API}?id=20`;
      const actual = monstersLib.getMonsterUrl(20);

      should(expected).equal(actual);
    });
  });

  describe('_getAbilityScoreModifier', () => {
    it('should work', () => {
      const expected = 5;
      const actual = monstersLib._getAbilityScoreModifier(20);

      should(expected).equal(actual);
    });
  });

  describe('buildMonsterUI', () => {
    let MONSTER;

    beforeEach(() => {
      MONSTER = {
        _id: 1,
        name: 'bug',
        size: 'small',
        type: 'insect',
        subtype: 'bug',
        alignment: 'evil',
        armor_class: 10,
        hit_points: 10,
        hit_dice: '1d6',
        speed: '30 ft',
        strength: 0,
        dexterity: 5,
        constitution: 10,
        intelligence: 15,
        wisdom: 20,
        charisma: 12,
        damage_vulnerabilities: 'crushing',
        damage_resistances: 'fall damage',
        damage_immunities: 'radiation',
        condition_immunities: 'fear',
        senses: 'tremor',
        languages: 'insect',
        challenge_rating: 2,
        special_abilities: [{
          name: 'so special',
        }, {
          name: 'so ability',
        }],
        actions: [{
          name: 'so action',
        }, {
          name: 'much do',
        }],
      };
    });

    it('should work', () => {
      const expected = {
        _id: 1,
        name: 'bug',
        size: 'small',
        type: 'insect',
        subtype: 'bug',
        alignment: 'evil',
        armor_class: 10,
        hit_points: 10,
        hit_dice: '1d6',
        speed: '30 ft',
        ability_scores: [{
          name: 'strength',
          abrv: 'STR',
          score: 0,
          modifier: -5,
        }, {
          name: 'dexterity',
          abrv: 'DEX',
          score: 5,
          modifier: -3,
        }, {
          name: 'constitution',
          abrv: 'CON',
          score: 10,
          modifier: 0,
        }, {
          name: 'intelligence',
          abrv: 'INT',
          score: 15,
          modifier: 2,
        }, {
          name: 'wisdom',
          abrv: 'WIS',
          score: 20,
          modifier: 5,
        }, {
          name: 'charisma',
          abrv: 'CHA',
          score: 12,
          modifier: 1,
        }],
        damage_vulnerabilities: 'crushing',
        damage_resistances: 'fall damage',
        damage_immunities: 'radiation',
        condition_immunities: 'fear',
        senses: 'tremor',
        languages: 'insect',
        challenge_rating: 2,
        special_abilities: [{
          name: 'so special',
        }, {
          name: 'so ability',
        }],
        actions: [{
          name: 'so action',
        }, {
          name: 'much do',
        }],
      };
      const actual = monstersLib.buildMonsterUI(MONSTER);

      should(expected).deepEqual(actual);
    });
  });
});
