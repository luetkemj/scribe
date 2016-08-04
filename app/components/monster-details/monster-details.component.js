import React, { PropTypes } from 'react';

import style from './monster-details.component.scss';

import DefinitionList from '../definition-list/definition-list.component';
import AbilityScores from '../ability-scores/ability-scores.component';

export default function MonsterDetails({ data }) {
  let header;
  let type;
  let abilityScores;
  let primaryStats;
  let secondaryStats;
  let specialAbilities;
  let actions;

  const primaryStatsData = [
    {
      name: 'Armor Class',
      stat: data.armor_class,
    }, {
      name: 'Hit Points',
      stat: data.hit_points,
    }, {
      name: 'Speed',
      stat: data.speed,
    },
  ];

  const secondaryStatsData = [
    {
      name: 'Damage Resistances',
      stat: data.damage_resistances,
    }, {
      name: 'Condition Immunities',
      stat: data.condition_immunities,
    }, {
      name: 'Senses',
      stat: data.senses,
    }, {
      name: 'Languages',
      stat: data.languages,
    }, {
      name: 'Challenge',
      stat: data.challenge_rating,
    },
  ];

  if (data.subtype) {
    type = (
      <span>
        {data.type} ({data.subtype}),
      </span>
    );
  } else {
    type = (
      <span>
        {data.type},
      </span>
    );
  }

  if (data.ability_scores) {
    abilityScores = (<AbilityScores ability_scores={data.ability_scores} />);
  }

  if (data.special_abilities) {
    specialAbilities = (
      <DefinitionList
        definitions={data.special_abilities}
        dd={'desc'}
        dt={'name'}
        verbose
      />
    );
  }

  if (data.actions) {
    actions = (
      <DefinitionList
        definitions={data.actions}
        dd={'desc'}
        dt={'name'}
        verbose
      />
    );
  }

  if (data._id) {
    primaryStats = (
      <DefinitionList
        definitions={primaryStatsData}
        dd={'stat'}
        dt={'name'}
      />
    );

    secondaryStats = (
      <DefinitionList
        definitions={secondaryStatsData}
        dd={'stat'}
        dt={'name'}
      />
    );
  }

  return (
    <section className={style.monsterDetails}>
      <article>
        <header>
          <h1 className={style.name}>{data.name}</h1>
          <h2 className={style.sizeTypeAlignment}>
            {data.size} {type} {data.alignment}
          </h2>
        </header>
        {abilityScores}
        {primaryStats}
        {secondaryStats}
        {specialAbilities}
        {actions}
      </article>
    </section>
  );
}

MonsterDetails.propTypes = {
  data: PropTypes.object.isRequired,
};
