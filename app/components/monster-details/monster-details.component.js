import React, { PropTypes } from 'react';

import style from './monster-details.component.scss';

import DefinitionList from '../definition-list/definition-list.component';
import AbilityScores from '../ability-scores/ability-scores.component';

export default function MonsterDetails({ data }) {
  let type;
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

  const primaryStats = [
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

  const secondaryStats = [
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

  return (
    <section className={style.monsterDetails}>
      <article>
        <header>
          <h1 className={style.name}>{data.name}</h1>
          <h2 className={style.sizeTypeAlignment}>
            {data.size} {type} {data.alignment}
          </h2>
        </header>
        <AbilityScores ability_scores={data.ability_scores} />
        <DefinitionList
          definitions={primaryStats}
          dd={'stat'}
          dt={'name'}
        />
        <DefinitionList
          definitions={secondaryStats}
          dd={'stat'}
          dt={'name'}
        />
        <DefinitionList
          definitions={data.special_abilities}
          dd={'desc'}
          dt={'name'}
          verbose
        />
        <DefinitionList
          definitions={data.actions}
          dd={'desc'}
          dt={'name'}
          verbose
        />
      </article>
    </section>
  );
}

MonsterDetails.propTypes = {
  data: PropTypes.object.isRequired,
};
