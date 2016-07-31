import React from 'react';

import DefinitionList from
  '../../components/definition-list/definition-list.component';

const actions = [
  {
    name: 'Multiattack',
    desc: 'The balor makes two attacks: one with its longsword and one with its whip.',
  },
  {
    name: 'Longsword',
    desc: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) slashing ' +
    ' damage plus 13 (3d8) lightning damage. If the balor scores a critical hit, it rolls damage ' +
    'dice three times, instead of twice.',
    attack_bonus: 14,
    damage_dice: '3d8 + 3d8',
    damage_bonus: 8,
  },
  {
    name: 'Whip',
    desc: 'Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6 + 8) slashing ' +
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
    'mariliths, or one goristro. A summoned demon appears in an unoccupied space within 60 feet ' +
    'of its summoner, acts as an ally of its summoner, and can\'t summon other demons. It ' +
    'remains for 1 minute, until it or its summoner dies, or until its summoner dismisses it ' +
    'as an action.',
    attack_bonus: 0,
  },
];

export default function ActionsTestContainer() {
  return (
    <div>
      <h1>Definition List</h1>
      <DefinitionList
        definitions={actions}
        dt={'name'}
        dd={'attack_bonus'}
      />

      <h1>Verbose Definition List</h1>
      <DefinitionList
        definitions={actions}
        dt={'name'}
        dd={'desc'}
        verbose
      />
    </div>
  );
}
