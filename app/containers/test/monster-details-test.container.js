import React from 'react';

import MonsterDetails from '../../components/monster-details/monster-details.component';

const data = {
  _id: '57861c8b9cef18942eb01f68',
  name: 'Swarm of Poisonous Snakes',
  size: 'Medium',
  type: 'swarm of Tiny beasts',
  subtype: '',
  alignment: 'unaligned',
  armor_class: 14,
  hit_points: 36,
  hit_dice: '8d8',
  speed: '30 ft., swim 30 ft.',
  ability_scores: [
    {
      name: 'strength',
      abrv: 'STR',
      score: 3,
      modifier: -4,
    },
    {
      name: 'dexterity',
      abrv: 'DEX',
      score: 8,
      modifier: -1,
    },
    {
      name: 'constitution',
      abrv: 'CON',
      score: 11,
      modifier: 0,
    },
    {
      name: 'intelligence',
      abrv: 'INT',
      score: 10,
      modifier: 0,
    },
    {
      name: 'wisdom',
      abrv: 'WIS',
      score: 10,
      modifier: 0,
    },
    {
      name: 'charisma',
      abrv: 'CHA',
      score: 6,
      modifier: -2,
    },
  ],
  damage_vulnerabilities: '',
  damage_resistances: 'bludgeoning, piercing, slashing',
  damage_immunities: '',
  condition_immunities: 'charmed, frightened, grappled, paralyzed, petrified, prone, restrained,' +
  ' stunned',
  senses: 'blindsight 10 ft., passive Perception 10',
  languages: '',
  challenge_rating: '2',
  special_abilities: [
    {
      name: 'Multiattack',
      desc: 'The balor makes two attacks: one with its longsword and one with its whip.',
      attack_bonus: 0,
    },
  ],
  actions: [
    {
      name: 'Multiattack',
      desc: 'The balor makes two attacks: one with its longsword and one with its whip.',
      attack_bonus: 0,
    },
    {
      name: 'Longsword',
      desc: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8)' +
      ' damage plus 13 (3d8) lightning damage. If the balor scores a critical hit, it rolls ' +
      'dice three times, instead of twice.',
      attack_bonus: 14,
      damage_dice: '3d8 + 3d8',
      damage_bonus: 8,
    },
    {
      name: 'Whip',
      desc: 'Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6 + 8) ' +
      'damage plus 10 (3d6) fire damage, and the target must succeed on a DC 20 Strength saving ' +
      'throw or be pulled up to 25 feet toward the balor.',
      attack_bonus: 14,
      damage_dice: '2d6 + 3d6',
      damage_bonus: 8,
    },
    {
      name: 'Teleport',
      desc: 'The balor magically teleports, along with any equipment it is wearing or carrying, ' +
      'up to 120 feet to an unoccupied space it can see.',
      attack_bonus: 0,
    },
    {
      name: 'Variant: Summon Demon (1/Day)',
      desc: 'The demon chooses what to summon and attempts a magical summoning. A balor has a 50 ' +
      'percent chance of summoning 1d8 vrocks, 1d6 hezrous, 1d4 glabrezus, 1d3 nalfeshnees, 1d2 ' +
      'mariliths, or one goristro. A summoned demon appears in an unoccupied space withi 60 feet ' +
      'of its summoner, acts as an ally of its summoner, and can\'t summon other demons. It ' +
      'remains for 1 minute, until it or its summoner dies, or until its summoner dismisses it ' +
      'as an action.',
      attack_bonus: 0,
    },
  ],
};

export default function MonsterDetailsTestContainer() {
  return (
    <div>
      <h1>Monster Details</h1>
      <MonsterDetails
        data={data}
      />
    </div>
  );
}
