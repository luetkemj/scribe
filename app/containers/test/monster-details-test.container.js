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
  strength: 8,
  dexterity: 18,
  constitution: 11,
  intelligence: 1,
  wisdom: 10,
  charisma: 3,
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
      desc: 'The swarm can occupy another creature\'s space and vice versa, and the swarm can ' +
      'move through any opening large enough for a Tiny snake. The swarm can\'t regain hit points' +
      ' or gain temporary hit points.',
      name: 'Swarm',
      attack_bonus: 0,
    },
  ],
  actions: [
    {
      damage_dice: '2d6',
      attack_bonus: 6,
      desc: 'Melee Weapon Attack: +6 to hit, reach 0 ft., one creature in the swarm\'s space.' +
        'Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its ' +
        'hit points or fewer. The target must make a DC 10 Constitution saving throw, taking 14 ' +
        '(4d6) poison damage on a failed save, or half as much damage on a successful one.',
      name: 'Bites',
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
