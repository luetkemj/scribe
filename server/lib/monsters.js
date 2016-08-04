import config from '../config';
const logger = require('./logger')();

export function getMonstersUrl(limit, skip) {
  const url = `${config.api.monsters}?limit=${limit}&skip=${skip}`;

  logger.log(`getMonstersUrl: url: ${url}`);
  return url;
}

export function getMonsterUrl(id) {
  const url = `${config.api.monster}?id=${id}`;

  logger.log(`getMonsterUrl: url: ${url}`);
  return url;
}

export function _getAbilityScoreModifier(abilityScore) {
  const mod = Math.floor((abilityScore - 10) / 2);
  return mod;
}

export function buildMonsterUI(monster) {
  const { _id, name, size, type, subtype, alignment, armor_class, hit_points, hit_dice, speed,
  strength, dexterity, constitution, intelligence, wisdom, charisma, damage_vulnerabilities,
  damage_resistances, damage_immunities, condition_immunities, senses, languages, challenge_rating,
  special_abilities, actions } = monster;
  const monsterUI = {
    _id,
    name,
    size,
    type,
    subtype,
    alignment,
    armor_class,
    hit_points,
    hit_dice,
    speed,
    ability_scores: [{
      name: 'strength',
      abrv: 'STR',
      score: strength,
      modifier: _getAbilityScoreModifier(strength),
    }, {
      name: 'dexterity',
      abrv: 'DEX',
      score: dexterity,
      modifier: _getAbilityScoreModifier(dexterity),
    }, {
      name: 'constitution',
      abrv: 'CON',
      score: constitution,
      modifier: _getAbilityScoreModifier(constitution),
    }, {
      name: 'intelligence',
      abrv: 'INT',
      score: intelligence,
      modifier: _getAbilityScoreModifier(intelligence),
    }, {
      name: 'wisdom',
      abrv: 'WIS',
      score: wisdom,
      modifier: _getAbilityScoreModifier(wisdom),
    }, {
      name: 'charisma',
      abrv: 'CHA',
      score: charisma,
      modifier: _getAbilityScoreModifier(charisma),
    }],
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    senses,
    languages,
    challenge_rating,
    special_abilities,
    actions,
  };

  return monsterUI;
}
