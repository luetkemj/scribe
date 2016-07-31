import React from 'react';

import AbilityScores from
  '../../components/ability-scores/ability-scores.component';

const abilityScores = [
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
];

export default function AbilityScoresTestContainer() {
  return (
    <AbilityScores ability_scores={abilityScores} />
  );
}
