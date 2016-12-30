import config from '../config';

const logger = require('./logger')();

export function getMonstersUrl(limit, skip) {
  const url = `${config.api.monsters}?limit=${limit}&skip=${skip}`;

  logger.log(`getMonstersUrl: url: ${url}`);
  return url;
}

export function getMonsterUrl(id) {
  const url = `${config.api.monsters}/${id}`;

  logger.log(`getMonstersUrl: url: ${url}`);
  return url;
}

export function getAbilityScoreModifier(abilityScore) {
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
      modifier: getAbilityScoreModifier(strength),
    }, {
      name: 'dexterity',
      abrv: 'DEX',
      score: dexterity,
      modifier: getAbilityScoreModifier(dexterity),
    }, {
      name: 'constitution',
      abrv: 'CON',
      score: constitution,
      modifier: getAbilityScoreModifier(constitution),
    }, {
      name: 'intelligence',
      abrv: 'INT',
      score: intelligence,
      modifier: getAbilityScoreModifier(intelligence),
    }, {
      name: 'wisdom',
      abrv: 'WIS',
      score: wisdom,
      modifier: getAbilityScoreModifier(wisdom),
    }, {
      name: 'charisma',
      abrv: 'CHA',
      score: charisma,
      modifier: getAbilityScoreModifier(charisma),
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
